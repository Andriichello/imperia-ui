import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import PreviewPage from "@/pages/PreviewPage.vue";
import PreviewRestaurantPage from "@/pages/PreviewRestaurantPage.vue";
import PreviewMenuPage from "@/pages/PreviewMenuPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/preview',
    name: 'preview',
    component: PreviewPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)',
    name: 'preview-restaurant',
    component: PreviewRestaurantPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)?/menu/:menuId(\\d+)',
    name: 'preview-menu',
    component: PreviewMenuPage,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
