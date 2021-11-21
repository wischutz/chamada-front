<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Editar Turma</h1>
    </div>
    <div class="row">
        <form>
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" v-model="turma.nome" class="form-control" id="nome" >
            </div>
            <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <input type="text" v-model="turma.descricao" class="form-control" id="descricao">
            </div>
            <div class="mb-3">
                <label for="serie" class="form-label">Série</label>
                <select name="serie" id="serie" v-model="turma.serie" class="form-control">
                    <option value="">Selecione</option>
                    <option v-for="(item, index) in series" :key="index" :value="item.id">Grau: {{ item.grau }} || Ano: {{ item.ano }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="professor" class="form-label">Professor</label>
                <select name="professor" id="professor" v-model="turma.professor" class="form-control">
                    <option value="">Selecione</option>
                    <option v-for="(item, index) in professores" :key="index" :value="item.id">{{ item.nome }}</option>
                </select>
            </div>
             <div class="mb-3">
                <label for="aluno" class="form-label">Vincular Aluno</label>
                <select name="aluno" id="aluno" v-model="aluno" class="form-control">
                    <option value="">Selecione</option>
                    <option v-for="(item, index) in alunos" :key="index" :value="item.id">{{ item.nome }}</option>
                </select>
                <button type="button" @click="vinculaAluno()" @keyup.enter="vinculaAluno()" class="btn btn-info">Vincular</button>
            </div>
            <hr>
            <div class="mb-3">
                <h4 class="h4">Alunos Vinculados</h4>
                <p v-if="turma.turmaAluno.length <= 0">Nenhum Aluno Vinculado</p>
                <div class="table-responsive" v-else>
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in turma.turmaAluno" :key="index">
                                <td>{{ item.aluno }}</td>
                                <td>{{ item.situacao }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button type="button" @click="salvar()" @keyup.enter="salvar()" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default{
    name: "TurmasUpdate",
    components: {
    },
    data() {
        return {
            turma:{
                turmaAluno: []
            },
            errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'turma/getErro',
            series: 'serie/getSeries',
            professores: 'usuario/getUsuarios',
            turmaLoad: 'turma/getTurma',
            alunos: 'aluno/getAlunos'
		}),
	},
    methods:{
        async salvar(){
            delete this.turma.turmaAluno
            
            await this.$store.dispatch('turma/update', {
                formulario: {...this.turma},
				url: process.env.VUE_APP_API_URL + "turmas/" + this.$route.params.turmaId,
				token: this.$cookies.get("access_token"),
			});

            if(this.erro && this.erro.send && this.erro.success == 1){				
				this.turma = {}
                this.$router.push({ name: 'turmas_list' })
			} else if(this.erro && this.erro.send && this.erro.success != 1){
				this.$refs.erro.showAlert = true;
				this.$refs.erro.message = this.erro.message;
			}
        },
        async vinculaAluno(){
            console.log('function')
            const turmaAluno = {
                aluno: this.aluno,
                turma: this.$route.params.turmaId,
                situacao: process.env.VUE_APP_SITUACAO_MATRICULADO
            }

            await this.$store.dispatch('turmaAluno/create', {
                formulario: {...turmaAluno},
				url: process.env.VUE_APP_API_URL + "turma-alunos/",
				token: this.$cookies.get("access_token"),
			});

            this.carregaTurma()
        },
        async carregaTurma(){
            await this.$store.dispatch('turma/read', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "turmas/" + this.$route.params.turmaId,
				cookie: this.$cookies.get("access_token"),
			});

            this.turma.nome = this.turmaLoad.nome
            this.turma.descricao = this.turmaLoad.descricao
            this.turma.serie = this.turmaLoad.serie.id
            this.turma.professor = this.turmaLoad.professor.id
            this.turma.turmaAluno = this.turmaLoad.turmaAluno
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

            await this.$store.dispatch('usuario/getUsuarios', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "usuarios",
				cookie: this.$cookies.get("access_token"),
			});

             await this.$store.dispatch('aluno/getAlunos', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "alunos",
				cookie: this.$cookies.get("access_token"),
			});

            this.carregaTurma()
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