import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/home/index.vue") },
  { path: "/hotels", component: () => import("../views/hotels/index.vue") },
  { path: "/ad-display", component: () => import("../views/home/AdvertiseView.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
