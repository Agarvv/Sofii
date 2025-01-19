import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient(); 

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin, { queryClient })
  .mount('#app');