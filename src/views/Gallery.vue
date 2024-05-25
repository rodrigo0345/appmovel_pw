<template>
  <div>
    <img src="@/assets/back.png" alt="Imagem Back" class="h-8 w-8" @click="goBackToLogin">
    <h3 class="settings">Gallery</h3>
    <button class="upload-button" @click="openFileUpload">Upload</button>
    <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload">
    <div class="dropdown">
      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Select Initiative
      </a>
      <ul class="dropdown-menu ms-4">
        <li v-for="initiative in result" :key="initiative.initiative.id">
          <a class="dropdown-item" href="#" @click="selectInitiative(initiative.initiative.id)">
            {{ initiative.suggestion.eventName }}
          </a>
        </li>
      </ul>
    </div>
    <div class="uploaded-photos" v-if="selectedInitiative">
      <div v-for="photo in photosByInitiative[selectedInitiative]" :key="photo.id" class="photo-wrapper">
        <img :src="photo.url" class="uploaded-photo" @click="showPhoto(photo)">
        <div class="date-indicator">{{ formatDate(photo.date) }}</div>
        <button class="delete-button" @click="deletePhoto(photo, selectedInitiative)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="dropdown">
      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown link
      </a>
    
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from '../components/Footer.vue';
import InitiativeService from '../../../LocalStorage/services/InitiativeService'; // Ajuste o caminho conforme necessário
import SuggestionService from '../../../LocalStorage/services/SuggestionService';

const initiativeService = new InitiativeService();
const suggestionService = new SuggestionService();

export default {
  components: {
    AppFooter
  },
  data() {
    return {
      photosByInitiative: {},
      selectedInitiative: null,
      initiatives: [] 
    };
  },
  setup: ()=> {
    const initiatives = initiativeService.getAllInitiatives({})
    const result = initiatives.map((initiative)=>{

      const suggestion = suggestionService.getAllSuggestions({
      id: initiative.sugestionId
    })[0]
    return {
      initiative,
      suggestion
    }
    })

    console.log({result})

    return {
      result
    }
  },

  methods: {
    goBackToLogin() {
      this.$router.push({ name: 'homepage_copy' });
    },
    openFileUpload() {
      if (!this.selectedInitiative) {
        alert('Please select an initiative first');
        return;
      }
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const photo = {
          id: Math.random().toString(36).substring(7),
          url: URL.createObjectURL(file),
          date: new Date()
        };
        if (!this.photosByInitiative[this.selectedInitiative]) {
          this.photosByInitiative[this.selectedInitiative] = [];
        }
        this.photosByInitiative[this.selectedInitiative].push(photo);
      }
    },
    selectInitiative(initiativeId) {
      this.selectedInitiative = initiativeId;
    },
    deletePhoto(photo, initiativeId) {
      const index = this.photosByInitiative[initiativeId].findIndex(p => p.id === photo.id);
      if (index !== -1) {
        this.photosByInitiative[initiativeId].splice(index, 1);
      }
    },
    showPhoto(photo) {
      // Lógica para exibir a foto em um modal ou outra forma de visualização
      console.log('Exibir foto:', photo);
    },
    formatDate(date) {
      const options = { day: 'numeric', month: 'short' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  },
}
</script>

<style scoped>
.settings {
  margin-left: 20px;
  margin-top: 10px;
}

.back {
  height: 20px;
  width: 20px;
  margin-left: 10px;
  margin-top: 20px;
}

.upload-button {
  background-color: #0EA5E9;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  margin-top: -40px;
}

.uploaded-photos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.photo-wrapper {
  position: relative;
  margin: 10px;
}

.uploaded-photo {
  max-width: 120px;
  max-height: 120px;
  cursor: pointer;
  border-radius: 8px;
}

.date-indicator {
  margin-top: 5px;
  background-color: #000;
  color: #fff;
  font-size: 10px;
  padding: 2px;
  border-radius: 4px;
  width: 40px;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.delete-button svg {
  width: 20px;
  height: 20px;
  fill: red;
}

footer {
  margin-left: 0px;
}
</style>
