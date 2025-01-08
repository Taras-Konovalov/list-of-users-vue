<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const usersStore = useUsersStore()
const router = useRouter()

const searchQuery = ref<string>('')

const foundUsers = computed(() => {
  return usersStore.users.filter(user => {
    return user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

onMounted(() => {
  usersStore.loadUsers()
})
</script>

<template>
  <section class="container input-section">
    <TextInput
      v-model="searchQuery"
      label="Search users"
      icon="mdi-account"
    />
  </section>
  <section class="container user-list">
    <v-list
      lines="three"
      v-if="foundUsers.length"
      class="list"
    >
      <v-list-item
        v-for="user in foundUsers"
        :key="user.id"
        :title="`Name: ${user.name}`"
        :subtitle="`email: ${user.email}`"
        :prepend-avatar="user.avatar ? user.avatar : 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'"
        elevation="1"
        link
        @click="router.push(`/users/${user.id}`)"
      >
      </v-list-item>
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