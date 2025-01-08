<script setup lang="ts">

defineProps<{
  modelValue: string
  label: string
  icon?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', text: string):void
}>()

function onInput(value: string | number | null): void {
  emits('update:modelValue', value as string)
};

</script>

<template>
  <v-text-field
    :model-value="modelValue"
    hide-details
    :label="label"
    clearable
    variant="solo-filled"
    @update:modelValue="onInput"
  >
  <template v-if="icon" #prepend-inner>
    <v-icon size="30">mdi-account</v-icon>
  </template>
  </v-text-field>
</template>

<style scoped>

</style>