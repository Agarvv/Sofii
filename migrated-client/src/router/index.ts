import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SendResetPasswordView from '@/views/auth/SendResetPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import CreateView from '@/views/create/CreateView.vue'
import PostDetails from '@/views/post-details/PostDetails.vue'
import axios from 'axios'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    component: RegisterView,
    name: "register"
  }, 
  {
    path: '/login',
    component: LoginView,
    name: "login"
  },
  {
    path: '/send-reset-password',
    component: SendResetPasswordView,
    name: "sendResetPassword"
  }, 
  {
    path: '/reset-password/:email/:token',
    component: ResetPasswordView,
    name: "resetPassword"
  },  
  {
      path: '/',
        component: HomeView,
        name: "home",
  },
  {
      path: '/post/:id',
      component: PostDetails,
      name: "postDetails"
  },
  {
    path: '/create',
    component: CreateView,
    name: "create"
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await axios.get('https://sofii-vsly.onrender.com/api/sofii/auth/check', {
        withCredentials: true 
    }); 
    
    console.log('authenticated response', response)
    
    console.log("authenticated condition", response.status == 200)
    return response.status == 200; 
    
  } catch (error) {
    return false;  
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const authenticated = await isAuthenticated();  

    if (!authenticated) {
      next({ name: 'login' });
    } else {
      next(); 
    }
  } else {
    next();  
  }
});

export default router