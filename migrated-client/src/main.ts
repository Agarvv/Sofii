import { createApp } from 'vue';  
import App from './App.vue';       
import { createPinia } from 'pinia'; 
import router from './router/index';    
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient(); 

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin, { queryClient })
  .mount('#app');