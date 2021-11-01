import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		name: 'Home',
		component: Home
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
