import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    component: RegisterView
  }, 
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: HomeView
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
