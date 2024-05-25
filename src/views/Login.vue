<template>
  <div class="home">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo da GoHelp" class="logo">
    </div>

    <div class="login-container">
      <h1 class="login">Login</h1>
      <h4 class="SignIn">Sign In to your account</h4>
      <div class="input-container">
        <input type="email" placeholder="Email" class="email-input" id="email">
      </div>
      <div class="input-container">
        <input type="password" placeholder="Password" class="password-input" id="password">
      </div>
      <button class="login-button" @click="loginClicked">Login</button>
      <span class="forgot-password" @click="forgotPasswordClicked">Forgot your password?</span>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
// @ts-ignore
import UserService from '../../../LocalStorage/services/UserService';
import 'vue3-toastify/dist/index.css';

const userService = new UserService();

export default {
  methods: {
    forgotPasswordClicked() {
      console.log('Forgot password clicado!');
    },
    signInClicked() {
      console.log('Sign in clicado!');
    },
    loginClicked() {
      // create the admin acc if doesn't exist
      if(!userService.findUser({ email: 'admin', password: 'admin' })) {
        userService.createUser({
          email: 'admin',
          password: 'admin',
          isDeleted: false,
          name: 'Admin',
          role: 'admin',
          photoUrl: 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
        });
      }

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const userFound = userService.findUser({
        email: email,
        password: password
      })

      if(!userFound) {
        toast('Invalid email or password', {
          type: 'error',
          duration: 3000
        });
        return;
      }

      // save on cookies the logged in user
      document.cookie = `user=${JSON.stringify(userFound)}`

      this.$router.push({ name: 'homepage_copy' });
    }
  }
}
</script>

<style scoped>
/* Estilos para a página de login */

.home {
  text-align: left;
}

.dont-have-account {
  margin-bottom: 10px;
  margin-left: 20px;
  font-size: 0.9rem;
  color: black;
}

.sign-in-text, .forgot-password {
  color: #007bff;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: underline;
}

.sign-in-text:hover, .forgot-password:hover {
  color: #0056b3;
}

.logo-container {
  margin-top: 50px;
  margin-left: 135px;
}

.login-container {
  margin-top: 70px;
  margin-left: 45px;
}

h1, h4, .input-container {
  margin-left: 20px;
  margin-right: 100px;
}

h1 {
  font-size: 1.5rem;
  color: #000000;
}

h4 {
  font-size: 1rem;
  color: #A9A9A9;
}

.login {
  font-weight: bold;
}

.logo {
  width: 120px;
  height: auto;
}

.input-container {
  margin-top: 20px;
}

input {
  width: 250px;
  padding: 10px;
  border: none;
  border-radius: 10px; /* Bordas mais arredondadas */
  background-color: #e9e9e9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  outline: none;
}

input::placeholder {
  color: #A9A9A9;
}

.login-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px; /* Bordas mais arredondadas */
  padding: 10px 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
