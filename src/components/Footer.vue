<template>
    <footer class="row d-flex justify-content-center footer bg-white z-50 m-0 p-3">
      <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('homepage_copy')">
          <v-icon name="ri-home-2-line"></v-icon>
          <p class="text-black m-0">Home</p>
      </div>
      <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('orders')">
          <v-icon name="md-mailoutline-outlined"></v-icon>
        <p class="text-black m-0">Orders</p>
      </div>
      <div class="relative col-md-auto col-md-auto d-flex flex-column align-items-center button-icon flex-1 w-[40px]" @click="navigateToPage('qrcode')">
          <div class="h-[60px] aspect-square absolute bg-blue-400 rounded-full flex flex-col items-center justify-center -top-[60%] shadow-md ">
            <v-icon name="bi-qr-code-scan" scale="1.5" class="text-white"></v-icon>
          </div>
      </div>
      <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('gallery')">
          <v-icon name="bi-camera"></v-icon>
          <p class="text-black m-0">Gallery</p>
      </div>
      <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('settings')">
          <v-icon name="md-settings-outlined"></v-icon>
          <p class="text-black m-0">Settings</p>
      </div>
    </footer>
</template>

<script lang="ts">
// @ts-ignore
import InitiativeService from '../../../LocalStorage/services/InitiativeService';
import type InitiativeModel from '../../../LocalStorage/models/InitiativeModel';
import { ref } from 'vue';

export default {
  methods: {
    goBackToLogin() {
      // @ts-ignore
      this.$router.push({ name: 'home' });
    },
    // @ts-ignore
    navigateToPage(pageName) {
      // Redireciona para a página correspondente ao nome da página
      // @ts-ignore
      this.$router.push({ name: pageName });
    }
  },
  name: 'AppFooter'
}
</script>
