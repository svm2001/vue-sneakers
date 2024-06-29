import './assets/main.css'

import { createApp } from 'vue'
import {createRouter, createWebHistory,} from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from "@/pages/Home.vue";
import Favorites from "@/pages/Favorites.vue";
import Account from "@/pages/Account.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/account', name: 'Account', component: Account },
]

const router = createRouter({
    history: createWebHistory(), routes
})

const app = createApp(App)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
