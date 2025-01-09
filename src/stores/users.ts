import { defineStore } from 'pinia'
import type { IUser } from './models'
import axios from 'axios'
import { API } from '@/enum/api'

interface IStoreState {
  users: IUser[]
}

export const useUsersStore = defineStore('users', {
  state: (): IStoreState => {
    return {
      users: [],
    }
  },
  getters: {
    // Получения всех пользователей
    getUsers(state) {
      return state.users
    },
    // Поиска пользователя по его ID
    getUserByUserId(): (userId: number) => IUser | null {
      return (userId: number) => {
        return this.users.find(user => user.id === userId) || null
      }
    },
  },
  actions: {
    // Получеине пользователей из API
    async loadUsers(): Promise<void> {
      try {
        const response = await axios.get<IUser[]>(API.BASE_URL)

        if (response && response.status === 200) {
          this.setUsers(response.data)
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    },
    // Установки новых пользователей в состояние
    setUsers(users: IUser[]) {
      this.users = users
    },
  },
})
