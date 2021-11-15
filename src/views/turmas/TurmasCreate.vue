<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Nova Turma</h1>
    </div>
    <div class="row">
        <form>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" v-model="nome" class="form-control" id="nome" >
            </div>
            <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <input type="text" v-model="descricao" class="form-control" id="descricao">
            </div>
            <div class="mb-3">
                <label for="serie" class="form-label">Série</label>
                <select name="serie" id="serie" v-model="serie" class="form-control">
                    <option value="">Selecione</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="professor" class="form-label">Professor</label>
                <select name="professor" id="professor" v-model="professor" class="form-control">
                    <option value="">Selecione</option>
                </select>
            </div>
            <button type="button" @click="salvar()" @keyup.enter="salvar()" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default{
    name: "TurmasCreate",
    components: {
    },
    data() {
        return {
        errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'turma/getErro',
		}),
	},
    methods:{
       
    },
    mounted() {
		this.$nextTick(async function () {
			await this.$store.dispatch('turma/getTurmas', {
				data: {
					limit: 200,
					page:1
				},
				url: process.env.VUE_APP_API_URL + "turmas",
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