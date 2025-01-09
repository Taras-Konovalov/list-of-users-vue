<script setup lang="ts">

// Определяем пропсы с их типами и значениями по умолчанию, используя `withDefaults`.
// `title` — заголовок элемента списка.
// `subtitle` — подзаголовок элемента списка.
// `avatar` — URL или путь к аватарке.
// `isLink` — по умолчанию `false`, указывает, является ли элемент ссылкой.
withDefaults(defineProps<{
  title: string
  subtitle: string
  avatar: string
  isLink?: boolean
}>(), {
  isLink: false
})

</script>

<template>
  <v-list-item
    :title="title"
    :subtitle="subtitle"
    :prepend-avatar="avatar"
    elevation="1"
    :link="isLink"
  >
  </v-list-item>
</template>

<style scoped>
:deep(.v-list-item) {
  width: 100%;
}
</style>