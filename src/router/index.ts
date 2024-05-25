import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Homepage from '@/views/HomePage.vue'
import Homepage_copy from '@/views/HomePage_copy.vue'
import Settings from '@/views/Settings.vue' // Importe a página Settings.vue
import Gallery from '@/views/Gallery.vue'
import Orders from '@/views/Orders.vue'
import Qrcode from '@/views/Qrcode.vue'
import Support from '@/views/Support.vue'
import Changepassword from '@/views/ChangePassword.vue'
import AppInitiative from '@/views/AppInitiative.vue'
import OrderDetails from '@/views/OrderDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/homepage_copy',
      name: 'homepage_copy',
      component: Homepage_copy
    },
    {
      path: '/settings', // Defina o caminho para a página de configurações
      name: 'settings', // Defina o nome da rota como 'settings'
      component: Settings // Defina o componente como Settings.vue
    },
    {
      path: '/gallery', // Defina o caminho para a página de configurações
      name: 'gallery', // Defina o nome da rota como 'settings'
      component: Gallery // Defina o componente como Settings.vue
    },
    {
      path: '/orders', // Defina o caminho para a página de configurações
      name: 'orders', // Defina o nome da rota como 'settings'
      component: Orders // Defina o componente como Settings.vue
    },
    {
      path: '/orderDetails/:id', // Defina o caminho para a página de configurações
      name: 'orderDetails', // Defina o nome da rota como 'settings'
      component: OrderDetails// Defina o componente como Settings.vue
    },
    {
      path: '/qrcode', // Defina o caminho para a página de configurações
      name: 'qrcode', // Defina o nome da rota como 'settings'
      component: Qrcode // Defina o componente como Settings.vue
    },
    {
      path: '/support', // Defina o caminho para a página de configurações
      name: 'support', // Defina o nome da rota como 'settings'
      component: Support // Defina o componente como Settings.vue
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: Changepassword
    },
    {
      path: '/initiative/:id',
      name: 'initiative',
      component: AppInitiative
    }
  ]
})

export default router
