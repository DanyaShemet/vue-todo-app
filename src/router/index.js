import { createRouter, createWebHashHistory } from 'vue-router'
import Create from "@/views/Create";

const routes = [
    {
        path: '/',
        component: Create
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('../views/List.vue')
    },
    {
        path: '/task/:id',
        name: 'task',
        component: () => import('../views/Task.vue')
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
