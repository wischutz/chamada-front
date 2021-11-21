<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Editar Aluno</h1>
    </div>
    <div class="row">
        <form>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" v-model="aluno.nome" class="form-control" id="nome" >
            </div>
            <div class="mb-3">
                <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                <input type="date" v-model="aluno.dataNascimento" class="form-control" id="dataNascimento">
            </div>
            <div class="mb-3">
                <label for="serie" class="form-label">Série</label>
                <select name="serie" id="serie" v-model="aluno.serie" class="form-control">
                    <option value="" selected="selected">Selecione</option>
                    <option v-for="(item, index) in series" :key="index" :value="item.id">Grau: {{ item.grau }} || Ano: {{ item.ano }}</option>
                </select>
            </div>
            <button type="button" @click="salvar()" @keyup.enter="salvar()" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default{
    name: "AlunosUpdate",
    components: {
    },
    data() {
        return {
            aluno:{},
            errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'aluno/getErro',
            series: 'serie/getSeries',
            alunoLoad: 'aluno/getAluno',
		}),
	},
    methods:{
        async salvar(){
            await this.$store.dispatch('aluno/update', {
                formulario: {...this.aluno},
				url: process.env.VUE_APP_API_URL + "alunos/" + this.$route.params.alunoId,
				token: this.$cookies.get("access_token"),
			});

            if(this.erro && this.erro.send && this.erro.success == 1){				
				this.aluno = {}
                this.$router.push({ name: 'alunos_list' })
			} else if(this.erro && this.erro.send && this.erro.success != 1){
				this.$refs.erro.showAlert = true;
				this.$refs.erro.message = this.erro.message;
			}
        }
    },
    mounted() {
		this.$nextTick(async function () {
			await this.$store.dispatch('serie/getSeries', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "series",
				cookie: this.$cookies.get("access_token"),
			});

            await this.$store.dispatch('aluno/read', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "alunos/" + this.$route.params.alunoId,
				cookie: this.$cookies.get("access_token"),
			});

            this.aluno.nome = this.alunoLoad.nome
            this.aluno.dataNascimento =this.alunoLoad.dataNascimento.split('T')[0]
            this.aluno.serie = this.alunoLoad.serie.id

            console.log(this.aluno.dataNascimento)
            console.log(this.alunoLoad.dataNascimento)

            document.getElementById('dataNascimento').value = this.aluno.dataNascimento
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