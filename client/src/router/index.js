import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/home/index.vue") },
  {
    path: "/login",
    component: () => import("../views/user/Login.vue"),
    meta: { hideLayout: true },
  },
  {
    path: "/register",
    component: () => import("../views/user/Register.vue"),
    meta: { hideLayout: true },
  },
  { path: "/hotels", component: () => import("../views/hotels/index.vue") },
  {
    path: "/payment",
    component: () => import("../views/order/PaymentView.vue"),
    meta: { hideLayout: true },
  },
  // 订单列表
  {
    path: "/order-list",
    component: () => import("../views/order/OrderList.vue"),
    meta: { hideLayout: true },
  },
  {
    path: "/ad-display",
    component: () => import("../views/home/AdvertiseView.vue"),
  },
  // 支付
  {
    path: "/order/pay-success",
    component: () => import("../views/order/PaySuccess.vue"),
    meta: { hideLayout: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // 如果没有 token 且目标不是登录页，强制跳转到登录页
  if (!token && to.path !== "/login" && to.path !== "/register") {
    next("/login");
  } else {
    next();
  }
});

export default router;
