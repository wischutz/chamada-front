<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Usuários</h1>         
        <button type="button" class="btn btn-primary" @click="this.cadastrarUsuario()">
            <i class="fas fa-plus-square"></i>
            Cadastrar
        </button>
    </div>
    
    <div class="table-responsive">
        <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Ativo</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in list" :key="index" @click="this.editarUsuario(item.id)" style="cursor:pointer">
                <td>{{ item.nome }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.ativo }}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default{
    name: "UsuariosList",
    components: {
    },
    data() {
        return {
        errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'usuario/getErro',
			list: 'usuario/getUsuarios'
		}),
	},
    methods:{
        cadastrarUsuario: function(){
            this.$router.push({ name: 'usuarios_create' })
        },
        editarUsuario: function(id){
            this.$router.push({ name: 'usuarios_update', params:{ usuarioId: id }})
        }
    },
    mounted() {
		this.$nextTick(async function () {
			await this.$store.dispatch('usuario/getUsuarios', {
				data: {
					limit: 200,
					page:1
				},
				url: process.env.VUE_APP_API_URL + "usuarios",
				cookie: this.$cookies.get("access_token"),
			});
        })
	},
    beforeRouteEnter(to, from, next) {
        next(app => {
            const token = app.$cookies.get('access_token')
            
            if (!token) {
                app.$router.push({name: 'Login'})
            }
        })
  }
}

</script>