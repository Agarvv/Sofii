import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SendResetPasswordView from '@/views/auth/SendResetPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'


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
    component: MainLayout,
    children: [
      {
        path: '/',
        component: HomeView,
        name: "home"
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
