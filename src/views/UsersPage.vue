<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const usersStore = useUsersStore()
const router = useRouter()

// Переменная для хранения поискового запроса от пользователя.
const searchQuery = ref<string>('')

// Вычисляемый список пользователей, соответствующих поисковому запросу.
// Фильтруем пользователей из `usersStore.users`, проверяя, содержится ли значение
// поискового запроса в имени пользователя (регистр символов игнорируется).
const foundUsers = computed(() => {
  return usersStore.users.filter(user => {
    return user.name?.toLowerCase().includes(searchQuery.value?.toLowerCase())
  })
})

// Загружаем список пользователей из хранилища при монтировании компонента.
onMounted(() => {
  usersStore.loadUsers()
})

// Функция для очистки текущего значения поискового запроса.
// Устанавливаем значение `searchQuery` в пустую строку.
function clearSearchQuery() {
  searchQuery.value = ''
}
</script>

<template>
  <section class="container input-section">
    <TextInput
      v-model="searchQuery"
      label="Search users"
      icon="mdi-account"
      @clear="clearSearchQuery"
    />
  </section>
  <section class="container user-list">
    <v-list
      lines="three"
      v-if="foundUsers.length"
      class="list"
    >
      <UserListItem
        v-for="user in foundUsers"
        :key="user.id"
        :title="`name: ${user.name}`"
        :subtitle="`email: ${user.email}`"
        :avatar="user.avatar ? user.avatar : 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'"
        isLink
        @click="router.push(`/users/${user.id}`)"
      />
    </v-list>
    <v-alert
      v-else
      text="Users not found"
      type="info"
      variant="tonal"
    ></v-alert>
  </section>
</template>

<style scoped>
.input-section {
  margin-top: 20px;
  margin-bottom: 20px;
}

.user-list {
  margin-bottom: 20px;
}

:deep(.v-list) {
  padding: 0;
  max-height: calc(100vh - 120px) !important;
  overflow-y: auto;
  height: 100%;
}

:deep(.v-list::-webkit-scrollbar) {
  width: 0;
}
</style>