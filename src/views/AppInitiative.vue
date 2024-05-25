<template>
  <header class="py-4 px-4 flex justify-between items-end">
    <div>
      <p class="m-0 text-zinc-500">Initiatives</p>
      <h1 class="text-3xl m-0">{{ initiative.suggestion.eventName }}</h1>
    </div>

    <div>
      <h3 class="m-0 text-lg">
        Status:
        {{ new Date(initiative.initiative.date) < new Date() ? 'Past Initiative' : 'Active' }} </h3>
    </div>
  </header>
  <main class="px-4 grid grid-cols-6 gap-2 pb-12">
    <div class="relative bg-white p-4 shadow-sm rounded-md col-span-3 row-span-1 overflow-hidden">
      <p class="m-0 text-zinc-400">Max. Budget</p>
      <p class="text-3xl m-0 relative">
        {{ Number(initiative.suggestion.budget).toFixed(2)
        }}<span class="text-xl text-zinc-500">€</span>
      </p>
    </div>
    <div
      class="bg-white p-4 shadow-sm rounded-md col-span-3 row-span-2 overflow-hidden flex flex-col gap-4 justify-between relative">
      <div>
        <p class="m-0 text-zinc-400">Staff Cost</p>
        <p class="text-3xl m-0">
          {{ Number(staffCost).toFixed(2) }}<span class="text-xl text-zinc-500">€</span>
        </p>
      </div>
      <div class="z-20">
        <p class="m-0 text-zinc-400">Material Cost</p>
        <p class="text-3xl m-0 z-20">
          {{ Number(materialCost).toFixed(2) }}<span class="text-xl text-zinc-500">€</span>
        </p>
      </div>
      <div :class="'w-full aspect-square bg-blue-400 top-[60%] rounded-full absolute left-[50%] ' +
        (initiative.initiative.eventType === 'food_safety' ? ' bg-green-400' : ' bg-red-400')
        "></div>
    </div>
    <div class="bg-white p-4 shadow-sm relative rounded-md col-span-3 row-span-1 overflow-hidden">
      <div class="relative w-fit flex items-center gap-2">
        <div class="aspect-square h-4 bg-green-400 top-1 -right-5 rounded-full animate-pulse"></div>
        <p class="m-0 text-zinc-400">Cost</p>
      </div>
      <p class="text-3xl m-0">
        {{ Number(cost).toFixed(2) }}<span class="text-xl text-zinc-500">€</span>
      </p>
    </div>
    <div
      class="bg-blue-400 p-4 shadow-sm rounded-md col-span-3 row-span-2 overflow-hidden flex flex-col gap-4 justify-between relative">
      <div>
        <p class="m-0 text-zinc-100">Food Risk</p>
        <p class="text-3xl m-0 text-white">
          {{ Number(risk).toFixed(2) }}<span class="text-xl text-blue-50">/5.0</span>
        </p>
      </div>
      <div>
        <p class="m-0 text-zinc-100">Staff Risk</p>
        <p class="text-3xl m-0 text-white">
          {{ Number(risk).toFixed(2) }}<span class="text-xl text-zinc-50">/5.0</span>
        </p>
      </div>
    </div>
    <div class="col-span-3 row-span-2 p-4 flex items-end flex-col justify-center">
      <img src="@/assets/onboarding.svg" alt="air support" />
    </div>
    <div id="map" class="col-span-6 row-span-6 h-96 w-full rounded-md shadow-md" style="z-index: 0">
      {{ initMap(initiative.initiative.local) }}
    </div>
    <section class="col-span-6 py-4">
      <h3>Orders</h3>
      <section class="flex flex-col gap-3">
        <div v-for="order in orders" :key="order.id" class="flex justify-between bg-white rounded-md shadow-sm p-3">
          <div class="flex flex-col gap-2 cursor-pointer" @click="navigateToOrder(order.id, initiative.initiative.id)">
            <h2 class="m-0 text-2xl">{{ order.name }}</h2>
            <p class="m-0 text-lg">
              Price:
              {{ order.price }}
              <span class="text-sm text-zinc-400">€</span>
            </p>
            <p class="text-zinc-500 m-0">
              {{ formatDistanceToNow(new Date(order.deliveryDate), { addSuffix: true }) }}
            </p>
          </div>
          <div :class="(order.status === 'pending' ? 'bg-orange-300' : 'bg-green-400') +
            ' p-2 rounded-md h-fit m-0 font-normal text-white'
            ">
            {{ order.status }}
          </div>
        </div>
      </section>
    </section>
    <section class="col-span-6 py-4">
      <h3>Available Food</h3>
      <section class="flex flex-col gap-3">
        <div v-for="food in availableFoods" :key="food.id"
          class="flex justify-between bg-white rounded-md shadow-sm p-3">
          <div class="flex flex-col gap-2">
            <h2 class="m-0 text-2xl">{{ food.name }}</h2>
            <p class="m-0 text-lg">
              Price:
              {{ food.price }}
              <span class="text-sm text-zinc-400">€</span>
            </p>
            <p class="m-0">
              Risk:
              {{ food.risk }}
              <span class="text-sm text-zinc-400">/5.0</span>
            </p>
          </div>
        </div>
      </section>
    </section>
    <section class="col-span-6 py-4">
      <h3>Available Material</h3>
      <section class="flex flex-col gap-3">
        <div v-for="material in materials" :key="material.id"
          class="flex justify-between bg-white rounded-md shadow-sm p-3">
          <div class="flex flex-col gap-2">
            <h2 class="m-0 text-2xl">{{ material.name }}</h2>
            <p class="m-0 text-lg">
              Price:
              {{ material.price }}
              <span class="text-sm text-zinc-400">€</span>
            </p>
            <p class="m-0">
              Quantity:
              {{ material.quantity }}
            </p>
          </div>
        </div>
      </section>
    </section>
    <section class="col-span-6 py-4">
      <h3>Workers</h3>
      <section class="flex flex-col gap-3">
        <div v-for="worker in workers" :key="worker.worker.id"
          class="flex justify-between bg-white rounded-md shadow-sm p-3 ">
          <div class="flex flex-col gap-2">
            <h2 class="m-0 text-2xl">{{ worker.worker.name }}</h2>
            <p class="m-0 text-lg">
              Job Title:
              {{ worker.job?.name }}
            </p>
            <p class="m-0">Cost: {{ worker.job?.costPerHour }}€ per hour</p>
          </div>
          <p>{{ worker.isPresent ? 'Present' : 'Not Present' }}</p>
        </div>
      </section>
    </section>
  </main>
  <AppFooter></AppFooter>
</template>

<script lang="ts">
import AppFooter from '../components/Footer.vue'
import InitiativeService from '../../../LocalStorage/services/InitiativeService'
import SuggestionsService from '../../../LocalStorage/services/SuggestionService'
import type InitiativeModel from '../../../LocalStorage/models/InitiativeModel'
import type SuggestionModel from '../../../LocalStorage/models/SugestionModel'
import { useRoute } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type OrderModel from '../../../LocalStorage/models/OrderModel'
import type FoodModel from '../../../LocalStorage/models/FoodModel'
import FoodService from '../../../LocalStorage/services/FoodService'
import type MaterialModel from '../../../LocalStorage/models/MaterialModel'
import { UserModel } from '../../../LocalStorage/models/UserModel'
import WorkingInModel from '../../../LocalStorage/models/WorkingInModel'
import UserService from '../../../LocalStorage/services/UserService'
import OrdersService from '../../../LocalStorage/services/OrderService'
import { formatDistanceToNow } from 'date-fns'

const initiatives = new InitiativeService()
const suggestions = new SuggestionsService()
const foodService = new FoodService()
const userService = new UserService()
const ordersService = new OrdersService()

async function fetchCoordinates(address: string) {
  const apiKey = '0b17db55a81c451e82bebe2b0c86f4f0' // Replace with your actual API key
  const urlEncodedAddress = encodeURIComponent(address)
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${urlEncodedAddress}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry // Returns the first result's coordinates
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return null
  }
}

function generateFakeOrders(orders: OrderModel[], initiative: InitiativeModel) {
  if (orders.length !== 0) return

  // create a new order
  const order: OrderModel = {
    deliveryDate: new Date(),
    id: 0,
    isDeleted: false,
    name: 'Order 1',
    price: 10.0,
    status: 'pending',
    initiativeId: initiative.id
  }
  // create a new order
  const sorder: OrderModel = {
    deliveryDate: new Date(),
    id: 0,
    isDeleted: false,
    name: 'Order 2',
    price: 30.0,
    status: 'pending',
    initiativeId: initiative.id
  }
  // get some food
  let queryFoods = foodService.allFood({})
  if (queryFoods.length === 0) {
    // create some food
    const foods: FoodModel[] = [
      {
        id: 0,
        name: 'Pizza',
        price: 5.0,
        isDeleted: false,
        risk: 3.5
      },
      {
        id: 1,
        name: 'Coke',
        price: 2.0,
        isDeleted: false,
        risk: 2.5
      }
    ]
    foods.forEach((food) => foodService.createFood(food))
    queryFoods = foodService.allFood({})
  }
  const foods: { foodId: number; quantity: number }[] = [
    {
      foodId: foodService.findFood({ name: 'Pizza' })?.id ?? 0,
      quantity: 2
    },
    {
      foodId: foodService.findFood({ name: 'Coke' })?.id ?? 0,
      quantity: 3
    }
  ]
  ordersService.makeOrder(order, foods)
  ordersService.makeOrder(sorder, foods)
}

function generateFakeMaterial(materials: MaterialModel[], initiative: InitiativeModel): void {
  if (materials.length !== 0) return
  // create a new material
  const material: MaterialModel = {
    id: 0,
    name: 'Material 1',
    price: 10.0,
    isDeleted: false,
    quantity: 2,
    initiativeId: initiative.id
  }
  // create a new material
  const smaterial: MaterialModel = {
    id: 0,
    name: 'Material 2',
    price: 30.0,
    quantity: 2,
    isDeleted: false,
    initiativeId: initiative.id
  }
  initiatives.addMaterial(material)
  initiatives.addMaterial(smaterial)
}

function generateFakeWorkers(workers: UserModel[], initiative: InitiativeModel): void {
  if (workers.length !== 0) return
  // create a new worker
  const randomEmailNumber = Math.floor(Math.random() * 1000)
  const worker: UserModel = {
    id: 0,
    email: 'rodig@gmail.com' + randomEmailNumber,
    isDeleted: false,
    name: 'Rodrigo',
    password: '123456',
    role: 'worker',
    jobId: 0,
    photoUrl: 'https://randomuser.me/api/portraits'
  }
  try {
    const user = userService.createUser(worker)
    const job = userService.createUserJob({
      id: 0,
      name: 'Cozinheiro',
      isDeleted: false,
      costPerHour: 10.0
    })
    userService.addJobToUser(user.id, job.id)
    initiatives.addWorker(initiative.id, user.id)
  } catch (e) {
    console.log(e)
  }
}

export default {
  components: {
    AppFooter
  },
  data() {
    return {
      initiativeId: null
    }
  },
  created() {
    // Accessing the route parameter 'id'
    // and storing it in the local data property 'initiativeId'
    // @ts-ignore
    this.initiativeId = this.$route.params.id
  },
  watch: {
    // Watch for changes in the route parameter 'id'
    '$route.params.id'(newId) {
      this.initiativeId = newId
    }
  },
  setup() {
    // @ts-ignore
    const route = useRoute()
    const initiativeId = route.params.id
    const initiative = initiatives.getAllInitiatives({
      // @ts-ignore
      id: initiativeId
    })[0]
    const suggestion = suggestions.getAllSuggestions({
      id: initiative.sugestionId
    })[0]
    const result: {
      initiative: InitiativeModel
      suggestion: SuggestionModel
    } = {
      initiative,
      suggestion
    }
    const orders = initiatives.getOrders(initiative.id)
    generateFakeOrders(orders, initiative)

    const food = orders.map((order) => initiatives.getFoodFromOrder(order.id))
    const cost = initiatives.getCalculatedCost(initiative.id)
    const risk = initiatives.getRiskLevel(initiative.id)
    const availableFoods = initiatives.getAvailableFood(initiative.id)
    const materials = initiatives.getUsedMaterials(initiative.id)
    generateFakeMaterial(materials, initiative)
    const materialCost = initiatives.getMaterialCost(initiative.id)
    const workers = initiatives.getWorkers(initiative.id)
    generateFakeWorkers(workers, initiative)
    const resultWorkers = workers.map((worker) => {
      return {
        worker,
        job: userService.getUserJob(worker.jobId),
        isPresent: initiatives.isWorkerPresent(initiative.id, worker.id)
      }
    })
    const staffCost = initiatives.getStaffCost(initiative.id)

    return {
      initiative: result,
      cost,
      orders,
      food,
      risk,
      availableFoods,
      materials,
      materialCost,
      workers: resultWorkers,
      userService,
      staffCost
    }
  },
  methods: {
    initMap(local: string) {
      // wait 0.4 seconds for the map to be rendered
      setTimeout(async () => {
        const coords = await fetchCoordinates(local)
        console.log({ coords })

        const map = L.map('map').setView([coords.lat, coords.lng], 17)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map)

        // Add a marker to the map
        L.marker([coords.lat, coords.lng]).addTo(map).bindPopup('Initiative Location.')
      }, 400)
    },
    formatDistanceToNow,
    navigateToOrder(id: number, initiativeId: number) {
      this.$router.push({ name: 'orderDetails', params: { id }, query: { initiativeId }});
    }
  },
  beforeMount() {
    // @ts-ignore
  },
  onUpdated() {
    this.initMap(this.initiative.initiative.local)
  }
}
</script>

<style scoped>
/* #map {
    -webkit-filter: grayscale(100%) brightness(90%);
    filter: grayscale(100%) brightness(90%);
} */
</style>
