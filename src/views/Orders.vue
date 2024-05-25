<template>
  <div class="">
    <img src="@/assets/back.png" alt="Imagem Back" class="h-8 w-8" @click="goBackToLogin">
    <main class="p-4">
      <h3 class="text-3xl">Your Orders</h3>
      <div class="flex justify-between">
        <p>User: {{ loggedUser.name }}</p>
        <p @click="toggleOrder" class="cursor-pointer text-blue-400">
          Order: {{ order === 'asc' ? 'Most Recent' : 'Oldest' }}
        </p>
      </div>
      <hr />
    </main>
    <div v-for="order in orders" :key="order.id">
      <div class="flex flex-row justify-between p-4 items-center">
        <div>
          <p>Order ID: {{ order.order.id }}</p>
          <p class="m-0 text-xl">{{ order.order.name }}</p>
          <p class="text-zinc-500">{{ format(order.order.deliveryDate) }}</p>
          <p :class="'m-0 p-2 w-fit mt-2 text-white font-semibold rounded-md ' +
            (order.order.status == 'completed' ? 'bg-green-400' : 'bg-yellow-400')
            ">
            {{ order.order.status }}
          </p>
        </div>
        <div>
          <button @click="navigateToPage('orderDetails', order.order.id, order.initiativeId)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
            View Order
          </button>
        </div>
      </div>
      <hr />
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts">
import AppFooter from '../components/Footer.vue'
import UserService from '../../../LocalStorage/services/UserService'
import { UserModel } from '../../../LocalStorage/models/UserModel'
import OrdersService from '../../../LocalStorage/services/OrderService'
import OrderModel from '../../../LocalStorage/models/OrderModel'
import { useRouter } from 'vue-router'
import FoodService from '../../../LocalStorage/services/FoodService'
import InitiativeService from '../../../LocalStorage/services/InitiativeService'
import { ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'

const userService = new UserService()
const orderService = new OrdersService()
const foodService = new FoodService()
const initiativeService = new InitiativeService()

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export default {
  setup: () => {
    const order = ref<string>('asc')
    const orders = ref<any[]>([])
    const router = useRouter()

    let userCookie = getCookie('user')
    if (!userCookie) {
      router.push({ name: 'homepage_copy' })
    }
    const user = JSON.parse(userCookie) as UserModel

    const loggedUser = userService.findUser({
      id: user.id
    })

    if (!loggedUser) {
      router.push({ name: 'homepage_copy' })
    }

    const initiatives = initiativeService.getAllInitiatives({})

    function loadOrders() {
      orders.value = initiatives
        .map((initiative) => initiativeService.getOrders(initiative.id))
        .flat()
        .sort((a, b) => {
          if (order.value === 'asc') {
            return new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime()
          } else {
            return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
          }
        })
        .map((order) => {
          return {
            order: order,
            initiativeId: order.initiativeId
          }
        })
    }

    function toggleOrder() {
      order.value = order.value === 'asc' ? 'desc' : 'asc'
      loadOrders()
    }

    loadOrders()

    return {
      loggedUser,
      orders,
      order,
      toggleOrder
    }
  },
  methods: {
    goBackToLogin() {
      this.$router.push({ name: 'homepage_copy' })
    },
    navigateToPage(pageName: string, id?: number, initiativeId?: number) {
      if (!id) {
        return this.$router.push({ name: pageName })
      }

      return this.$router.push({ name: pageName, params: { id }, query: { initiativeId } })
    },
    format(date: string) {
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    }
  },
  components: {
    AppFooter
  }
}
</script>
