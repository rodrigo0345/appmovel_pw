<template>
  <img src="@/assets/back.png" alt="Imagem Back" class="back-button h-8 w-8" @click="goBack" />
  <div class="p-4">
    <h1>Order Details</h1>

    <div class="flex justify-between">
      <p>Event: {{initiativeDetails?.suggestion.eventName}}</p>
      <a :href="/initiative/ + initiativeDetails?.initiative.id">Event Details</a>
    </div>

    <div class="flex flex-col py-4">
      <p class="m-0">Order ID: {{ orderDetails.id }}</p>
      <p class="m-0 py-2">Delivery Date: {{ formatDistanceToNow(new Date(orderDetails.deliveryDate), {suffix: true})}}</p>
      <p class="m-0">
        Order Total: {{ Number(orderDetails.price).toFixed(2) }}
        <span class="text-zinc-400 text-sm">€</span>
      </p>
      <p :class="'m-0 p-2 w-fit mt-2 text-white font-semibold rounded-md ' + (orderDetails.status == 'completed'? 'bg-green-400': 'bg-yellow-400') ">{{ orderDetails.status }}</p>
    </div>

    <h2 class="text-2xl m-0">Food In Order</h2>
    <hr />
    <div v-for="order in foodDetails" :key="order.id">
      <div class="flex flex-col py-2">
        <h2 class="m-0 text-2xl">{{ order.food.name }}</h2>
        <p class="m-0">
          Risk: {{ Number(order.food.risk).toFixed(2) }}
          <span class="text-zinc-400 text-sm">/5.0</span>
        </p>
        <p class="m-0">
          Price: {{ order.food.price }}
          <span class="text-zinc-400 text-sm">€</span>
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import InitiativeService from '../../../LocalStorage/services/InitiativeService'
import FoodService from '../../../LocalStorage/services/FoodService'
import { useRouter } from 'vue-router'
import SuggestionService from '../../../LocalStorage/services/SuggestionService'
import {formatDistanceToNow} from 'date-fns'

const initiativeService = new InitiativeService()
const foodService = new FoodService()
const suggestionService = new SuggestionService()
export default {
  data() {
    return {
      orderDetails: [],
      foodDetails: [],
      id: null,
    }
  },
  setup: () => {
      const router = useRouter()

      const initiativeId = Number(router.currentRoute.value.query.initiativeId)

      const initiative = initiativeService.getAllInitiatives({
        id: Number(initiativeId)
      })[0]


      const suggestion = suggestionService.getAllSuggestions({
        id: initiative.sugestionId
      })[0]

      const initiativeDetails = {
        suggestion,
        initiative
      } 

    return {
      initiativeDetails
    }
  },
  methods: {
    async fetchOrderDetails() {
      const router = useRouter()

      const initiativeId = Number(router.currentRoute.value.query.initiativeId)
      const orderId = Number(this.id)

      if (!this.id) {
        router.push({ name: 'orders' })
      }

      if (!this.id) {
        router.push({ name: 'Orders' })
      }
      const order = initiativeService.getOrder(orderId, initiativeId)
      if (!order) {
        router.push({ name: 'orders' })
      }
      const foodInOrder = initiativeService.getFoodFromOrder(order.id)

      this.foodDetails = foodInOrder.map((food) => {
        const foodDetails = foodService.findFood({
          id: food.id
        })
        return {
          food: {
            ...food,
            ...foodDetails
          }
        }
      })

      this.orderDetails = order
    },
    formatDistanceToNow,
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.id = this.$route.params.id
    this.fetchOrderDetails()
  }
}
</script>
