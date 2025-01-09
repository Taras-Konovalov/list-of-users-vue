<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import type { IUser } from '@/stores/models'
import { DEFAULT_USER_AVATAR } from '@/enum/user'

const route = useRoute()
const usersStore = useUsersStore()

// Текущий пользователь, найденный по ID из параметров route
const user = ref<IUser | null>(usersStore.getUserByUserId(Number(route.params.id)))

// Функция для форматирования номера телефона, удаляет пробелы и все после них
function formattedPhone(phone: string) {
  return phone.replace(/\s.*/, '')
}
</script>

<template>
  <v-card
    style="max-width: 500px;"
    variant="elevated"
  >
    <template #prepend>
      <v-avatar size="50">
        <v-img
          alt="User avatar"
          :src="user.avatar ? user?.avatar : DEFAULT_USER_AVATAR"
        ></v-img>
      </v-avatar>
    </template>
    <template #title>
      {{ user?.name }}
    </template>
    <v-card-text>
      <div v-if="user?.email" class="card-info-item">
        <v-icon size="25">mdi mdi-at</v-icon>
        <a :href="`mailto:${user?.email}`">{{ user?.email }}</a>
      </div>
      <v-divider></v-divider>
      <div v-if="user?.address" class="card-info-item">
        <span>
          {{
            `Address: ${user?.address.street}, ${user?.address.suite}, ${user?.address.city}` 
          }}
        </span>
      </div>
      <v-divider></v-divider>
      <div v-if="user?.address.zipcode" class="card-info-item">
        <span>
          {{
            `ZipCode: ${user?.address.zipcode}` 
          }}
        </span>
      </div>
      <v-divider></v-divider>
      <div 
        v-if="user?.address.geo.lat && user?.address.geo.lng"
        class="card-info-item"
      >
        <v-icon size="25">mdi mdi-map-marker</v-icon>
        <a 
          :href="`https://www.google.com/maps?q=${user?.address.geo.lat},${user?.address.geo.lng}`"
          target="_blank"
        >
          Location
        </a>
      </div>
      <v-divider></v-divider>
      <div v-if="user?.phone" class="card-info-item">
        <v-icon size="25">mdi mdi-phone</v-icon>
        <a 
          :href="`tel:${formattedPhone(user?.phone)}`"
        >
          {{ formattedPhone(user?.phone) }}
        </a>
      </div>
      <v-divider></v-divider>
      <div v-if="user?.website" class="card-info-item">
        <v-icon size="25">mdi mdi-web</v-icon>
        <a 
          :href="user?.website"
          target="_blank"
        >
          {{ user?.website }}
        </a>
      </div>
      <v-divider></v-divider>
      <div v-if="user?.company.name" class="card-info-item">
        <v-icon size="25">mdi mdi-domain</v-icon>
        <span>{{ user?.company.name }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
:deep(.v-card-title) {
  font-size: 32px;
  font-weight: 600;
}

:deep(.v-card-text) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-info-item a {
  text-decoration: none;
  font-size: 16px;
  color: #2139B6;
  font-weight: 600;
}

.card-info-item span {
  font-size: 16px;
  font-weight: 600;
}

.card-info-item a:hover {
  text-decoration: underline;
}
</style>