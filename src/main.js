import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueCookies from 'vue3-cookies'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
app.use(router)
app.use(store)
app.use(
    VueCookies, 
    {
        expireTimes: "1d",
        path: "/",
        domain: "",
        secure: false,
        sameSite: "None"
    }
)
app.mount('#app')