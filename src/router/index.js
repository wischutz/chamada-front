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
			{
				path: 'turmas/:turmaId',
				name: "turmas_update",
				component: () => import('@/views/turmas/TurmasUpdate.vue')
			},
			{
				path: 'usuarios',
				name: "usuarios_list",
				component: () => import('@/views/usuarios/UsuariosList.vue')
			},
			{
				path: 'usuarios/nova',
				name: "usuarios_create",
				component: () => import('@/views/usuarios/UsuariosCreate.vue')
			},
			{
				path: 'usuarios/:usuarioId',
				name: "usuarios_update",
				component: () => import('@/views/usuarios/UsuariosUpdate.vue')
			},
			{
				path: 'alunos',
				name: "alunos_list",
				component: () => import('@/views/alunos/AlunosList.vue')
			},
			{
				path: 'alunos/nova',
				name: "alunos_create",
				component: () => import('@/views/alunos/AlunosCreate.vue')
			},
			{
				path: 'alunos/:alunoId',
				name: "alunos_update",
				component: () => import('@/views/alunos/AlunosUpdate.vue')
			},
			{
				path: 'diarios',
				name: "chamadas_list",
				component: () => import('@/views/chamadas/ChamadasList.vue')
			},
			{
				path: 'diarios/:turmaId',
				name: "chamadas_create",
				component: () => import('@/views/chamadas/ChamadasCreate.vue')
			}
		]
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
