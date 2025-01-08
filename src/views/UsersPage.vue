<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const searchQuery = ref<string>('')

onMounted( async () => {
  const data = await axios.get('https://jsonplaceholder.typicode.com/users')

  console.log(data)
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
</template>

<style scoped>
.input-section {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>