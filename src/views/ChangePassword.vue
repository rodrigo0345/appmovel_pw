<template>
    <div class="settings">
      <img src="@/assets/back.png" alt="Back" class="back-button" @click="goBackToLogin">
  
      <h3>Change Password</h3>
      <img src="@/assets/usericon.png" alt="User Icon" class="usericon">
      <div class="body">
        <div class="input-container">
            <input type="About" placeholder="Palavra-Passe atual" class="about-input">
            </div>
            <div class="input-container content-container">
              <input type="Content" placeholder="Nova Palavra-Passe" class="content-input">
            </div>
      </div>
      <button class="submit-button">Submit</button>
      <footer class="row d-flex justify-content-center footer bg-white">
        <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('homepage_copy')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
            </svg>
            <p class="footer_text">Home</p>
        </div>
        <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('orders')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mailbox2-flag" viewBox="0 0 16 16">
            <path d="M10.5 8.5V3.707l.854-.853A.5.5 0 0 0 11.5 2.5v-2A.5.5 0 0 0 11 0H9.5a.5.5 0 0 0-.5.5v8z"/>
            <path d="M4 3h4v1H6.646A4 4 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3V3a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4m.585 4.157C4.836 7.264 5 7.334 5 7a1 1 0 0 0-2 0c0 .334.164.264.415.157C3.58 7.087 3.782 7 4 7s.42.086.585.157"/>
          </svg>
          <p class="footer_text">Orders</p>
        </div>
        <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('qrcode')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-qr-code" viewBox="0 0 16 16">
              <path d="M2 2h2v2H2z"/>
              <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z"/>
              <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z"/>
              <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z"/>
              <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z"/>
            </svg>
            <p class="footer_text">Qr Code</p>
        </div>
        <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('gallery')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
            </svg>
            <p class="footer_text">Gallery</p>
        </div>
        <div class="col col-md-auto d-flex flex-column align-items-center button-icon" @click="navigateToPage('settings')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
              <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
            </svg>
            <p class="footer_text">Settings</p>
        </div>
      </footer>
      <!-- Conteúdo da página de configurações -->
    </div>
  </template>
  
  <script>
  export default {
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
  
  .footer-button {
    /* Estilos para os botões do footer */
    height: 1rem; /* Altura das imagens */
    width: 1rem; /* Largura das imagens */
    cursor: pointer; /* Altera o cursor ao passar o mouse sobre as imagens */
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
    margin-left: 100px; /* Ajuste conforme necessário */
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
    width:320px;
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
    width: 320px;
  }
  
  .footer {
    margin-top: 20px; /* Ajuste conforme necessário */
    margin-left: -25px;
  }
  </style>
  