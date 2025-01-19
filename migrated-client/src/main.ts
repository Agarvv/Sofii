import { VueQueryPlugin } from '@tanstack/vue-query';

// const queryClient = new QueryClient(); 

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin)
  .mount('#app');