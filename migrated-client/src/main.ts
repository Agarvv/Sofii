import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin, createQueryClient } from '@tanstack/vue-query'


const queryClient = createQueryClient()

createApp(App)
  .use(router)                      
  .use(createPinia())               
  .use(VueQueryPlugin, { queryClient }) 
  .mount('#app')