import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import PreviewPage from "@/pages/PreviewPage.vue";
import PreviewRestaurantPage from "@/pages/PreviewRestaurantPage.vue";
import PreviewMenuPage from "@/pages/PreviewMenuPage.vue";
import PreviewReviewsPage from "@/pages/PreviewReviewsPage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import PlaceMenuPage from "@/pages/PlaceMenuPage.vue";
import PlaceOrderPage from "@/pages/PlaceOrderPage.vue";
import PlaceDeliveryOrderPage from "@/pages/PlaceDeliveryOrderPage.vue";
import PlaceHistoryPage from "@/pages/PlaceHistoryPage.vue";
import PreviewTipsPage from "@/pages/PreviewTipsPage.vue";
import PreviewTipsForFoodPage from "@/pages/PreviewTipsForFoodPage.vue";
import PreviewTipsForCleannessPage from "@/pages/PreviewTipsForCleannessPage.vue";
import PreviewTipsForServicePage from "@/pages/PreviewTipsForServicePage.vue";
import PreviewTipsForWaiterPage from "@/pages/PreviewTipsForWaiterPage.vue";
import EditRestaurantPage from "@/pages/EditRestaurantPage.vue";

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
    path: '/preview/:restaurantId(\\d+)/reviews',
    name: 'preview-reviews',
    component: PreviewReviewsPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)/tips',
    name: 'preview-tips',
    component: PreviewTipsPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)/tips/waiter/:waiterId(\\d+)?',
    name: 'preview-tips-for-waiter',
    component: PreviewTipsForWaiterPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)/tips/service',
    name: 'preview-tips-for-service',
    component: PreviewTipsForServicePage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)/tips/food',
    name: 'preview-tips-for-food',
    component: PreviewTipsForFoodPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)/tips/cleanness',
    name: 'preview-tips-for-cleanness',
    component: PreviewTipsForCleannessPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/preview/:restaurantId(\\d+)?/menu/:menuId(\\d+)?',
    name: 'preview-menu',
    component: PreviewMenuPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?',
    name: 'home',
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?/edit',
    name: 'edit-restaurant',
    component: EditRestaurantPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?/history',
    name: 'place-history',
    component: PlaceHistoryPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?/menu/:menuId(\\d+)?',
    name: 'place-menu',
    component: PlaceMenuPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?/order/:banquetId(\\d+)?',
    name: 'place-order',
    component: PlaceOrderPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?/order/:banquetId(\\d+)/menu/:menuId(\\d+)?',
    name: 'place-order-menu',
    component: PlaceMenuPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/place/:restaurantId(\\d+)?/delivery/order/:orderId(\\d+)?',
    name: 'place-delivery-order',
    component: PlaceDeliveryOrderPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
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
