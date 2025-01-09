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
import UserListItem from '@/components/UserListItem.vue'
import UserCard from './components/UserCard.vue'

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
app.use(createPinia())
app.component('TextInput', TextInput)
app.component('UserListItem', UserListItem)
app.component('UserCard', UserCard)
app.use(router)
app.use(vuetify)
app.mount('#app')
