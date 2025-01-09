import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/stores/users'


const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*', // Любой путь, включая "/"
    redirect: '/users', // Перенаправить на "/users"
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
    beforeEnter: async(to, from, next) => {
      const usersStore = useUsersStore();
      if (!usersStore.users.length) {
        await usersStore.loadUsers(); // Загружаем пользователей, если их нет в сторе
      }
  
      const userId = Number(to.params.id);
      const userExists = usersStore.users.some(user => user.id === userId);

      if (!userExists) {
        next('/users'); // Перенаправить на список пользователей
      } else {
        next(); // Продолжить переход
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
