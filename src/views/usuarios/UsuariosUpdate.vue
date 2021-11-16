<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Editar Usuário</h1>
    </div>
   <div class="row">
        <form>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" v-model="usuario.nome" class="form-control" id="nome" >
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="usuario.email" class="form-control" id="email">
            </div>
            <div class="mb-3">
                <label for="tipo" class="form-label">Tipo</label>
                <select name="tipo" id="tipo" v-model="usuario.roles" class="form-control">
                    <option value="" selected="selected">Selecione</option>
                    <option value="professor">Professor</option>
                    <option value="secretaria">Secretaria</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ativo" class="form-label">Ativo</label>
                <select name="ativo" id="ativo" v-model="usuario.ativo" class="form-control">
                    <option value="1" selected="selected">Sim</option>
                    <option value="0">Não</option>
                </select>
            </div>
            <button type="button" @click="salvar()" @keyup.enter="salvar()" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default{
    name: "UsuariosUpdate",
    components: {
    },
    data() {
        return {
            usuario:{},
            errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'usuario/getErro',
            usuarioLoad: 'usuario/getUsuario',
		}),
	},
    methods:{
        async salvar(){
            this.usuario.roles = [this.usuario.roles]
            
            await this.$store.dispatch('usuario/update', {
                formulario: {...this.usuario},
				url: process.env.VUE_APP_API_URL + "usuarios/" + this.$route.params.usuarioId,
				token: this.$cookies.get("access_token"),
			});

            if(this.erro && this.erro.send && this.erro.success == 1){				
				this.usuario = {}
                this.$router.push({ name: 'usuarios_list' })
			} else if(this.erro && this.erro.send && this.erro.success != 1){
				this.$refs.erro.showAlert = true;
				this.$refs.erro.message = this.erro.message;
			}
        }
    },
    mounted() {
		this.$nextTick(async function () {
            await this.$store.dispatch('usuario/read', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "usuarios/" + this.$route.params.usuarioId,
				cookie: this.$cookies.get("access_token"),
			});

            this.usuario.nome = this.usuarioLoad.nome
            this.usuario.email = this.usuarioLoad.email
            this.usuario.roles = this.usuarioLoad.roles[0] ?? ''
            this.usuario.ativo = this.usuarioLoad.ativo
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