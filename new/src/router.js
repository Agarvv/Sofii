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
import profileDetails from './components/profileDetails.vue'
import VideosPage from './components/VideosPage.vue'
import SingleVideoPage from './components/SingleVideoPage'
import ChatBox from './components/ChatBox'
import NotificationsComponent from './components/NotificationsComponent'
import FriendsPage from './components/FriendsPage'
import EnterEmailResetPassword from './components/EnterEmailResetPassword'
import ResetPassword from './components/ResetPassword'

const routes = [
    { path: '/', component: HelloWorld, meta: { requiresAuth: true } },
    { path: '/register', component: RegisterComponent }, // No requiere auth
    { path: '/login', component: LoginComponent }, // No requiere auth
    { path: '/post/:id', component: PostPage, meta: { requiresAuth: true } },
    { path: '/create', component: CreatePost, meta: { requiresAuth: true } },
    { path: '/chats', component: ChatPage, meta: { requiresAuth: true } },
    { path: '/chat/:receiver_id', component: ChatBox, meta: { requiresAuth: true } }, 
    { path: '/search/:query', component: SearchPage, meta: { requiresAuth: true } },
    { path: '/user/:id', component: ProfilePage, meta: { requiresAuth: true } },
    { path: '/userDetails', component: profileDetails, meta: { requiresAuth: true } },
    { path: '/saved', component: SavedPage, meta: { requiresAuth: true } },
    { path: '/watch', component: VideosPage, meta: { requiresAuth: true } },
    { path: '/watch/:video_id', component: SingleVideoPage, meta: { requiresAuth: true } },
    { path: '/notifications', component: NotificationsComponent, meta: { requiresAuth: true } },
    { path: '/friends', component: FriendsPage, meta: { requiresAuth: true } },
    { path: '/get_reset_url', component: EnterEmailResetPassword },
    { path: '/reset_password/:reset_token/:email', component: ResetPassword },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/check_token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                next(); 
            } else {
              console.log('repsones not ok')
              router.push('/login')
            }
        } catch (e) {
            console.log('Error.', e);
         
        }
    } else {
        next(); // Permitir la navegación si no se requiere autenticación
    }
});

export default router;