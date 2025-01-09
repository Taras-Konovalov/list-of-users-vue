<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <section class="container card-section">
    <v-btn @click="router.push('/users')">
      <template #prepend>
        <v-icon size="30">mdi mdi-chevron-left</v-icon>
      </template>
    </v-btn>
    <UserCard />
  </section>
</template>

<style scoped>
.card-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.v-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  min-width: 0;
  position: absolute;
  left: 20px;
  top: 20px;
}

:deep(.v-btn__prepend) {
  margin-inline: 0;
}
</style>