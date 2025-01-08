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
    getUsers(state) {
      return state.users
    },
  },
  actions: {
    async loadUsers(): Promise<void> {
      try {
        const response = await axios.get<IUser[]>(API.BASE_URL)

        if (response.status === 200) {
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
    setUsers(users: IUser[]) {
      this.users = users
    }
  }
})
