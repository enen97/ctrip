import { createRouter, createWebHistory } from 'vue-router'

const routers = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: 'list', component: () => import('../views/List.vue') },
    { path: 'detail/:id', component: () => import('../views/Detail.vue') },
    { path: 'admin', component: () => import('../views/Detail'), meta: { requiresAuth: true } }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局守卫
router.beforeEach((toString, from, next) => {
    if (toString.meta.requiresAuth && !localStorage.getItem('token')) {
        next('/login')
    } else {
        next()
    }
})

export default router