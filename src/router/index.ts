import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/users', // Перенаправляет с "/" на "/users"
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/UsersPage.vue'),
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('@/views/UserPage.vue'),
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
