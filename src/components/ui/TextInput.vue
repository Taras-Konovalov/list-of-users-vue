<script setup lang="ts">

// Определяем пропсы с их типами и значениями по умолчанию, используя `withDefaults`.
// `modelValue` — текущее значение поля ввода.
// `label` — метка для поля ввода.
// `icon` — иконка внутри поля ввода.
// `isClearable` — по умолчанию `true`, указывает, можно ли очистить поле.
withDefaults(defineProps<{
  modelValue: string
  label: string
  icon?: string
  isClearable?: boolean
}>(), {
  isClearable: true
})


// Определяем события, которые компонент может выбрасывать.
// - `update:modelValue` — выбрасывается при изменении значения в поле ввода, передает новое значение как строку.
// - `clear` — выбрасывается при нажатии на кнопку очистки поля.
const emits = defineEmits<{
  (e: 'update:modelValue', text: string):void,
  (e: 'clear'): void
}>()


// Функция для обработки изменений в поле ввода и выброса события `update:modelValue`.
// Значение приводится к строке, так как `modelValue` ожидает строку.
function onInput(value: string | number | null): void {
  emits('update:modelValue', value as string)
};

</script>

<template>
  <v-text-field
    :model-value="modelValue"
    hide-details
    :label="label"
    :clearable="isClearable"
    variant="solo-filled"
    @update:modelValue="onInput"
    @click:clear="isClearable ? emits('clear') : null"
  >
  <template v-if="icon" #prepend-inner>
    <v-icon size="30">mdi-account</v-icon>
  </template>
  </v-text-field>
</template>

<style scoped>

</style>