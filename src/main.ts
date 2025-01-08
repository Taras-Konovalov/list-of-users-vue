import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import router from './router'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import TextInput from '@/components/ui/TextInput.vue'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)
app.component('TextInput', TextInput)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
