import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js'

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importar los estilos de Font Awesome
import '@fortawesome/fontawesome-svg-core/styles.css';
import userMixin from './mixins/userMixin'

// Añadir los iconos a la librería
library.add(fas, far, fab);

const app = createApp(App);
app.use(router)
app.mixin(userMixin)
// Registrar el componente de Font Awesome globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');