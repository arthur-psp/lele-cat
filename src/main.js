import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { vuetify } from './plugins/vuetify'
import { configDi } from './di/index.js'

const app = createApp(App)

configDi(app)

app.use(router)
.use(vuetify)
.mount('#app')