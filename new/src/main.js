import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import userStore from './stores/userStore'


import '@fortawesome/fontawesome-svg-core/styles.css';



library.add(fas, far, fab);


import io from 'socket.io-client';


const socket = io(process.env.VUE_APP_API_URL, {
  withCredentials: true
});


socket.on('connect', () => {
  console.log('WebSocket connected successfully! Socket ID:', socket.id);
});

socket.on('notjwt', (message) => {
  console.log("wsfailed", message); 

});

socket.on('jwt', (msg) => {
    console.log("wsok", message)
})


socket.on('disconnect', () => {
  console.log('WebSocket disconnected!');
});

const app = createApp(App);
app.config.devtools = true;  
app.config.productionTip = false;  




app.use(router);
app.use(userStore)

app.component('font-awesome-icon', FontAwesomeIcon);

app.config.globalProperties.$socket = socket;

app.mount('#app');