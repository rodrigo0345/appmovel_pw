<template>
  <div>
    <img src="@/assets/back.png" alt="Back" class="h-8 w-8" @click="goBackToLogin">
    <h3 class="settings">Settings</h3>
    <img :src="userPhotoUrl" alt="User Icon" class="usericon">
    <div class="body settings">
      <h5>Profile</h5>
      <hr class="profile">
      <div class="user-info">
        <p><strong>Nome de Usuário:</strong> {{ userName }}</p>
        <p><strong>E-mail:</strong> {{ userEmail }}</p>
        <p><strong>Role:</strong> {{ userRole }}</p>
      </div>
      <h5>Other Settings</h5>
      <hr class="profile">
      <div class="button-container">
        <button class="white-button" @click="navigateToPage('support')">Support</button>
        <button class="white-button" @click="navigateToPage('changepassword')">Change password</button>
        <button class="red-button" @click="logout">Log Out</button> <!-- Botão de log-out com estilo vermelho -->
      </div>
    </div>
    <AppFooter></AppFooter>
    <!-- Conteúdo da página de configurações -->
  </div>
</template>

<script>
import AppFooter from '../components/Footer.vue';

export default {
  components: {
    AppFooter
  },
  data() {
    return {
      userName: '',
      userEmail: '',
      userRole: '', // Nova propriedade para armazenar o papel do usuário
      userPhotoUrl: '' // Propriedade existente para a URL da foto do usuário
    };
  },
  created() {
    const userDataString = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user='));
    if (userDataString) {
      const userData = JSON.parse(userDataString.split('=')[1]);
      this.userName = userData.name;
      this.userEmail = userData.email;
      this.userRole = userData.role; // Definindo o papel do usuário
      this.userPhotoUrl = userData.photoUrl; // Definindo a URL da foto do usuário
    }
  },
  methods: {
    goBackToLogin() {
      this.$router.push({ name: 'homepage_copy' });
    },
    navigateToPage(pageName) {
      // Redireciona para a página correspondente ao nome da página
      this.$router.push({ name: pageName });
    },
    logout() {  
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped>
/* Estilos para a página de configurações */

input {
  padding: 10px; /* Reduzindo o padding dos inputs */
  border: none;
  border-radius: 20px; /* Reduzindo o raio da borda dos inputs */
  background-color: rgb(223, 223, 223);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  outline: none;
}

.white-button {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 15px; /* Aumentei o raio das bordas */
  padding: 8px 16px;
  margin-right: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-bottom: 10px;
  width: 320px;
  height: 45px;
}

.white-button:hover {
  background-color: #f5f5f5;
}

.button-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.user-info {
  background-color: #f2f2f2; /* Fundo cinza */
  border-radius: 15px; /* Bordas curvas */
  padding: 10px 15px; /* Espaçamento interno */
  margin-bottom: 5px; /* Reduzindo a margem vertical */
  margin-left: -10px;
}

.user-info p {
  margin: 5px 0; /* Reduzindo a margem vertical */
  font-size: 0.9rem;
}

.profile {
  margin-left: -30px;
}

.settings {
  margin-left: 25px;
  position: relative; /* Para posicionar corretamente os elementos absolutos */
}

.back-button {
  width: 20px; /* Defina o tamanho adequado para o botão */
  height: 20px; /* Defina o tamanho adequado para o botão */ 
  cursor: pointer;
  margin-bottom: 10px;
}

.usericon {
  width: 125px; /* Defina o tamanho adequado para o botão */
  height: 125px; /* Defina o tamanho adequado para o botão */
  position: absolute;
  margin-left: 125px; /* Ajuste conforme necessário */
}

.body {
  margin-top: 150px;
  margin-left: 25px; /* Adicionando margem à esquerda */
}

.red-button {
  background-color: #dd0303;
  border: 1px solid #dd0303;
  border-radius: 15px; /* Aumentei o raio das bordas */
  padding: 8px 16px;
  margin-right: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-bottom: 10px;
  width: 320px;
  height: 45px;
}

.red-button:hover {
  background-color: #cc0000; /* Cor mais escura ao passar o mouse */
}
</style>
