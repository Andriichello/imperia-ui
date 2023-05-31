import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HistoryView from '../views/HistoryView.vue'
import ProfileView from '../views/ProfileView.vue'
import MarketplaceView from '../views/MarketplaceView.vue'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/marketplace/:id?',
    name: 'marketplace',
    component: MarketplaceView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
