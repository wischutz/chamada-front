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
		component: Home,
		children: [
			{
				path: 'turmas',
				name: "turmas_list",
				component: () => import('@/views/turmas/TurmasList.vue')
			},
			{
				path: 'turmas/nova',
				name: "turmas_create",
				component: () => import('@/views/turmas/TurmasCreate.vue')
			},
		]
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
