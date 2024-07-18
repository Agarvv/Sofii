import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import PostPage from './components/PostPage.vue';
import CreatePost from './components/CreatePost.vue';
import ChatPage from './components/ChatPage.vue';
import SearchPage from './components/SearchPage.vue';
import ProfilePage from './components/ProfilePage.vue';
import SavedPage from './components/SavedPage.vue';

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/register', component: RegisterComponent },
    { path: '/login', component: LoginComponent },
    { path: '/post/:id', component: PostPage, meta: { requiresAuth: true } },
    { path: '/create', component: CreatePost },
    { path: '/chat', component: ChatPage, meta: { requiresAuth: true } },
    { path: '/search/:query', component: SearchPage, meta: { requiresAuth: true } },
    { path: '/user/:id', component: ProfilePage, meta: { requiresAuth: true } },
    { path: '/saved', component: SavedPage, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const response = await fetch('http://localhost:3000/api/sofi/check_token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                next(); // Permitir la navegación
                
            } else {
                next('/login'); // Redirigir al login si la autenticación falla
            }
        } catch (e) {
            console.log('Error.', e);
            next('/login'); // Redirigir al login en caso de error
        }
    } else {
        next(); // Permitir la navegación si no se requiere autenticación
    }
});

export default router;