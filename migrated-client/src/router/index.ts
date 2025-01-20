import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'

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
