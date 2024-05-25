<template>
<body class="bg-zinc-100" style="position: relative; min-height: 100vh; height:auto;">
    <!-- Conteúdo da página -->
    <header class="h-96 flex flex-col justify-end p-4 relative after:h-full after:w-full after:bg-black/50 after:backdrop-blur-[1px] after:absolute after:right-0 after:top-0" style="background-image: url('src/assets/pizza.jpg'); background-position: center center; background-size: cover;">
      <h1 class="text-white text-4xl font-normal z-30">Welcome Aboard!</h1>
      <p class="text-zinc-200 text-normal font-normal z-30 max-w-[70%]">
        With GoHelp, planning your Iniciatives has never been easier.
        </p>
    </header>

    <main class="px-4 flex flex-col pb-[4em] pt-4">
      <section class="flex justify-between items-end pt-4">
        <h2 class="text-3xl font-medium m-0 p-0">Your Initiatives</h2>
        <p class="p-0 m-0 text-blue-400 flex items-center">
          Most Recent
          <v-icon name="bi-arrow-down-short"></v-icon>
        </p>
      </section>
      <section class="py-4 flex flex-col gap-3">
        <div class="shadow-md px-4 py-3 rounded-lg bg-white flex flex-col gap-1 relative overflow-hidden focus:bg-white/80 transition-all" v-for="initiative in initiatives" :key="initiative.initiative.id"
        @click="navigateToPage('initiative', initiative.initiative.id)">
          <p class="text-zinc-600 m-0 text-zinc-500 z-10">{{ initiative.initiative.eventType }}</p>
          <h3 class="text-3xl font-medium text-black z-10">{{ initiative.suggestion.eventName }}
            <span class="text-lg" v-if="user.email === initiative.suggestion.email">
              (Owner)
            </span>
          </h3>
          <div class="flex gap-4 text-zinc-500 z-10">
            <div>
              <v-icon name="bi-pin-map" scale="0.8"></v-icon>
              {{ initiative.initiative.local }}
            </div>
            <div>
              <v-icon name="bi-calendar" scale="0.8"></v-icon>
              {{formatDistanceToNow(new Date(initiative.initiative.date), { addSuffix: true })}}
            </div>
          </div>
          <div :class="'w-full aspect-square bg-blue-400 top-[60%] rounded-full absolute left-[50%] ' + (initiative.initiative.eventType === 'food_safety'? ' bg-green-400': ' bg-red-400') "></div>
          <v-icon name="bi-arrow-down-short" class="absolute top-[50%] right-10 rotate-[270deg] -translate-y-1/2" scale="1.6"></v-icon>
        </div>

        <section class="flex justify-between items-end w-full pt-4">
          <h2 class="text-3xl font-medium m-0 p-0">Past Initiatives</h2>
          <p class="p-0 m-0 text-blue-400 flex items-center">
            See More
          </p>
        </section>

        <div class="shadow-sm px-4 py-3 rounded-lg flex flex-col gap-1 relative overflow-hidden bg-zinc-200/60" v-for="initiative in pastInitiatives" :key="initiative.initiative.id">
          <p class="text-zinc-600 m-0 text-zinc-500 z-10">{{ initiative.initiative.eventType }}</p>
          <h3 class="text-3xl font-medium text-black z-10">{{ initiative.suggestion.eventName }}
            <span class="text-lg" v-if="user.email === initiative.suggestion.email">
              (Owner)
            </span>
          </h3>
          <div class="flex gap-4 text-zinc-500 z-10">
            <div>
              <v-icon name="bi-pin-map" scale="0.8"></v-icon>
              {{ initiative.initiative.local }}
            </div>
            <div>
              <v-icon name="bi-calendar" scale="0.8"></v-icon>
              {{formatDistanceToNow(new Date(initiative.initiative.date), { addSuffix: true })}}
            </div>
          </div>
          <div :class="'w-full aspect-square bg-blue-400 top-[60%] rounded-full absolute left-[50%] ' + (initiative.initiative.eventType === 'food_safety'? ' bg-green-400/40': ' bg-red-400/40') "></div>
          <v-icon name="bi-arrow-down-short" class="absolute top-[50%] right-10 rotate-[270deg] -translate-y-1/2" scale="1.6"></v-icon>
        </div>
      </section>
    </main>

    <AppFooter />
  </body>
</template>

<script lang="ts">
// @ts-ignore
import InitiativeService from '../../../LocalStorage/services/InitiativeService';
import type InitiativeModel from '../../../LocalStorage/models/InitiativeModel';
import { ref } from 'vue';
// @ts-ignore
import SuggestionService from '../../../LocalStorage/services/SuggestionService';
import type SuggestionModel from '../../../LocalStorage/models/SugestionModel'
import type {UserModel} from '../../../LocalStorage/models/UserModel';
import AppFooter from '../components/Footer.vue';
import {formatDistanceToNow} from 'date-fns';

const initiativeService = new InitiativeService();
const suggestionService = new SuggestionService();
type CombinedModel = InitiativeModel & SuggestionModel;

function fakeInitiative() {
  const randNumber = Math.floor(Math.random() * 1000);
  const randDate = new Date(); // This will initialize a new date object with the current date and time.

  let owner = 'test@gmail.com'
  // Adding a year to the current date
  if(randNumber % 5 === 0 || randNumber % 3 === 0){
    randDate.setFullYear(randDate.getFullYear() + 1);
    owner = 'admin@gmail.com'
  }

  const create = initiativeService.createInitiative({
    createdOn: new Date(),
    sugestionId: suggestionService.createSuggestion({
      eventName: 'Teste' + randNumber,
      description: 'Teste',
      status: 'Approved',
      createdOn: new Date(),
      budget: 1000,
      date: randDate,
      email: owner,
      eventType: 'food_safety',
      isApproved: true,
      id: 0,
      isDeleted: false,
      local: 'Barcelos',
      numParticipants: 100,
      rejectedReason: '',
    }).id,
    date: randDate,
    duration: 10,
    id: 0,
    isDeleted: false,
    local: 'Barcelos',
    eventType: 'food_safety',
    maxParticipants: 100,
    minParticipants: 10,
    status: 'approved',
  })
}

export default {
  setup() {
    const initiatives = ref<({
      initiative: InitiativeModel,
      suggestion: SuggestionModel
    })[]>([]);
    let suggestions = suggestionService.getAllSuggestions({
      status: 'Approved',
    });
    if(suggestions.length === 0){
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(() => fakeInitiative());
      suggestions = suggestionService.getAllSuggestions({
        status: 'Approved',
      });
    }
    initiatives.value = suggestions.map((suggestion: SuggestionModel) => {
      const result = initiativeService.getAllInitiatives({
        sugestionId: suggestion.id
      })?.[0];
      if(!result){
        return undefined;
      }
      return {
        initiative: result,
        suggestion
      };
    }).filter(value => value !== undefined) as ({
      initiative: InitiativeModel,
      suggestion: SuggestionModel
    })[];

    let lUser = document.cookie.split(';').find((cookie) => cookie.includes('user'))?.split('=')[1];
    const user: UserModel = JSON.parse(lUser ?? "");

    const pastInitiatives = initiatives.value.filter((initiative) => {
      return new Date(initiative.initiative.date) < new Date();
    });
    const futureInitiatives = initiatives.value.filter((initiative) => {
      return new Date(initiative.initiative.date) >= new Date();
    }).slice(0, 5);
    return {
      initiatives: futureInitiatives,
      user,
      pastInitiatives
    }
  },
  methods: {
    goBackToLogin() {
      // @ts-ignore
      this.$router.push({ name: 'home' });
    },
    // @ts-ignore
    navigateToPage(pageName, id?: number) {
      // Redireciona para a página correspondente ao nome da página
      if(!id){
        // @ts-ignore
        return this.$router.push({ name: pageName });
      }

      // @ts-ignore
      return this.$router.push({ name: pageName, params: { id } });
    },
    formatDistanceToNow
  },
  components: {
    AppFooter
  }
}
</script>
