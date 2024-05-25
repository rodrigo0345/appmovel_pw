<template>
  <div>
    <img src="@/assets/back.png" alt="Back" class="back-button" @click="goBackToLogin">

    <h3 class="settings">Settings</h3>
    <img src="@/assets/usericon.png" alt="User Icon" class="usericon">
    <div class="body settings">
      <div class="input-container">
        <input type="About" placeholder="About" class="about-input">
      </div>
      <div class="input-container content-container mt-3">
        <input type="Content" placeholder="Content" class="content-input">
      </div>
    </div>
    <button class="submit-button ms-4">Submit</button>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from '../components/Footer.vue';

export default {
  components: {
    AppFooter
  },
  methods: {
    goBackToLogin() {
      this.$router.push({ name: 'settings' });
    },
    navigateToPage(pageName) {
      // Redireciona para a página correspondente ao nome da página
      this.$router.push({ name: pageName });
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

.settings {
  margin-left: 25px;
  margin-top: 25px;
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
}

.submit-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0EA5E9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 320px;
}

.input-container {
  margin-top: 10px; /* Adicionando espaço entre os containers */
  margin-left: 0px; /* Adicionando um espaço à esquerda para alinhar verticalmente */
  margin-right: 100px;
}

.about-input {
  width: 320px; /* Largura para o campo "About" */
}

.content-input {
  height: 250px;
  width: 320px;
}
</style>
