<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Alunos</h1>         
        <button type="button" class="btn btn-primary" @click="this.cadastraAluno()">
            <i class="fas fa-plus-square"></i>
            Cadastrar
        </button>
    </div>
    
    <div class="table-responsive">
        <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Grau</th>
                <th>Ano</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in list" :key="index" @click="this.editaAluno(item.id)" style="cursor:pointer">
                <td>{{ item.nome }}</td>
                <td>{{ item.dataNascimento }}</td>
                <td>{{ item.serieGrau }}</td>
                <td>{{ item.serieAno }}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default{
    name: "AlunosList",
    components: {
    },
    data() {
        return {
        errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'aluno/getErro',
			list: 'aluno/getAlunos'
		}),
	},
    methods:{
        cadastraAluno: function(){
            this.$router.push({ name: 'alunos_create' })
        },
        editaAluno: function(id){
            this.$router.push({ name: 'alunos_update', params:{ alunoId: id }})
        }
    },
    mounted() {
		this.$nextTick(async function () {
			await this.$store.dispatch('aluno/getAlunos', {
				data: {
					limit: 200,
					page:1
				},
				url: process.env.VUE_APP_API_URL + "alunos",
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