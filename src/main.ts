import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaFlag, RiZhihuFill } from 'oh-vue-icons/icons'
import { BiPinMap } from 'oh-vue-icons/icons'
import { BiCalendar } from 'oh-vue-icons/icons'
import { BiArrowDownShort } from 'oh-vue-icons/icons'
import { RiHome2Line } from 'oh-vue-icons/icons'
import { MdMailoutlineOutlined } from 'oh-vue-icons/icons'
import { BiQrCodeScan } from 'oh-vue-icons/icons'
import { BiCamera } from 'oh-vue-icons/icons'
import { MdSettingsOutlined } from 'oh-vue-icons/icons'

addIcons(
  FaFlag,
  RiZhihuFill,
  BiArrowDownShort,
  BiPinMap,
  BiCalendar,
  RiHome2Line,
  MdMailoutlineOutlined,
  BiQrCodeScan,
  BiCamera,
  MdSettingsOutlined
)

const app = createApp(App)

app.use(router)

app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)

app.component('v-icon', OhVueIcon)

app.mount('#app')
