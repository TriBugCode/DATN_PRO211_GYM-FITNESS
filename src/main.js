import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

AOS.init({
  duration: 800,
  once: true,
})

app.mount('#app')
