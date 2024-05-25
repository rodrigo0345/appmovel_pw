<template>
  <div class="p-4">
    <h1 class="Titulo">QR Code Scanner</h1>
    <div class="header d-flex justify-content-center mb-3">
      <button class="btn btn-primary me-2 tamanho" :class="{'active': showQrCode}" @click="toggleSection('show')">Generate QR</button>
      <button class="btn btn-secondary tamanho" :class="{'active': !showQrCode}" @click="toggleSection('read')">Scan QR</button>
    </div>
    <div v-if="showQrCode" class="qr-code-container">
      <div v-if="qrCodeData" class="qr-code">
        <qrcode-vue :text="qrCodeData" :options="qrCodeOptions" />
      </div>
      <div v-else class="no-data-message">No data to generate QR code.</div>
    </div>
    <div v-else class="qr-code-reader">
      <video ref="video" class="square-video ms-0 mt-2" width="300" height="300"></video>
      <canvas ref="canvas" style="display:none;"></canvas>
      <p v-if="qrCodeResult" class="scanned-link">Scanned Link: <a :href="qrCodeResult" target="_blank">{{ qrCodeResult }}</a></p>

    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import AppFooter from '../components/Footer.vue'
import jsQR from 'jsqr'

export default {
  components: {
    QrcodeVue,
    AppFooter
  },
  data() {
    return {
      showQrCode: true,
      qrCodeData: 'Example QR Code Data',
      qrCodeOptions: {
        size: 1000
      },
      qrCodeResult: null,
      videoStream: null
    }
  },
  methods: {
    toggleSection(section) {
      this.showQrCode = (section === 'show');
      if (section === 'read') {
        this.startCamera();
      } else {
        this.stopCamera();
      }
    },
    startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoStream = stream;
          this.$refs.video.srcObject = stream;
          this.$refs.video.play();
          this.scanQRCode();
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
        });
    },
    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    },
    scanQRCode() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      const interval = setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });
          if (code) {
            this.qrCodeResult = code.data;
            clearInterval(interval);
          }
        }
      }, 100);
    }
  }
}

</script>

<style scoped>
.qrcodetit {
  padding: 20px;
}

.Titulo {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

button.active {
  background-color: #0EA5E9;
  color: white;
}

button:hover {
  background-color: #e0e0e0;
}

.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(9, 0, 92, 0.1); /* Adicionei a cor do sombreamento */
}

.qr-code {
  max-width: 80%; /* Define a largura máxima do código QR */
  max-height: 80%; /* Define a altura máxima do código QR */
}

.qr-code-reader {
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Ajuste para centralizar mais para baixo */
  height: 280px; /* Ajuste a altura para que haja um espaço entre o leitor de QR e o footer */
}

.square-video {
  width: 300px;
  height: 250px; /* Reduzi a altura da câmera */
}

.Footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Ajuste o espaço superior para centralizar o footer */
}

</style>
