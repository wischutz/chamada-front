<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Diário de Classe</h1>
    </div>
    <div class="row">
        <h5 class="h5">{{ turma.nome }} | Grau {{ turma.serie.grau }} || Ano {{ turma.serie.ano }}</h5>
        <h5 class="h5">{{ turma.professor }}</h5>
        <hr>
        <form>
            <h4 class="h4">Novo Lançamento</h4>
            <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" v-model="data" class="form-control" id="data">
            </div>
            <!--<div class="mb-3">
                <label for="periodos" class="form-label">Quantidade de Períodos</label>
                <select name="periodos" id="periodos" v-model="periodos" class="form-control">
                    <option value="1" selected="selected">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>-->
            <button type="button" @click="salvar()" @keyup.enter="salvar()" class="btn btn-primary">Criar</button>
        </form>
        <hr>
        <div class="mb-3">
            <h4 class="h4">Alunos</h4>
            <p v-if="turma.turmaAluno.length <= 0">Nenhum Aluno Vinculado</p>
            <div class="table-responsive" v-else>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th v-for="(item, index) in turma.aula" :key="index"> {{ new Date(item.data + " 00:00:00").toLocaleString('pt-BR').split(' ')[0] }}</th>
                            <th>Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in turma.turmaAluno" :key="index">
                            <td>{{ item.aluno }}</td>
                            <td v-for="(aula, indexAula) in item.aula" :key="indexAula"> 
                                <select @change="registra(item.id, aula.id, $event)">
                                    <option value="" :selected="(item.chamadas == null)? 'true' : 'false'">-</option>
                                    <option 
                                        v-for="(tipo, indexTipo) in tiposPresenca" 
                                        :key="indexTipo" 
                                        :value="tipo.id" 
                                        :selected="(item.chamadas)? getChamada(item.chamadas, aula.id) == tipo.id : 'false'"
                                    >
                                        {{ tipo.sigla }}
                                    </option>
                                </select>
                            </td>                           
                            <td>{{ item.situacao }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default{
    name: "ChamadasCreate",
    components: {
    },
    data() {
        return {
            turma:{
                serie:{
                    ano: 1,
                    grau: 1
                },
                turmaAluno:[]

            },
            errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'turma/getErro',
            series: 'serie/getSeries',
            professores: 'usuario/getUsuarios',
            tiposPresenca: 'tipoPresenca/getTiposPresenca',
            turmaLoad: 'turma/getTurma'
		}),
	},
    methods:{
        async salvar(){
            const aula = {
                turma: this.$route.params.turmaId,
                data: this.data,
                periodos: 1
            }
            await this.$store.dispatch('turma/createAula', {
                formulario: {...aula},
				url: process.env.VUE_APP_API_URL + "turmas/" + this.$route.params.turmaId + "/aula",
				token: this.$cookies.get("access_token"),
			});

            if(this.erro && this.erro.send && this.erro.success == 1){
                this.carregaTurma()
			} else if(this.erro && this.erro.send && this.erro.success != 1){
				this.$refs.erro.showAlert = true;
				this.$refs.erro.message = this.erro.message;
			}
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
            this.turma.professor = this.turmaLoad.professor.nome
            this.turma.turmaAluno = this.turmaLoad.turmaAluno
            this.turma.aula = this.turmaLoad.aula
        },
        async registra(turmaAluno, aula, e){
            // console.log(turmaAluno)
            // console.log(aula)
            // console.log(e.target.value)

            const chamada = {
                periodo: 1,
                turmaAluno: turmaAluno,
                tipoPresenca: e.target.value,
                aula: aula
            }

            await this.$store.dispatch('chamada/create', {
                formulario: {...chamada},
				url: process.env.VUE_APP_API_URL + "chamadas/",
				token: this.$cookies.get("access_token"),
			});

            this.carregaTurma()
        },
        getChamada(chamadas, aulaId){
            const chamada = chamadas.filter(function(chamada){
                return chamada.aula == aulaId
            })

            if(chamada.length < 1){
                return null
            }
            
            chamada.reverse()
            return chamada[0].tipoPresenca.id ?? null
        }
    },
    mounted() {
		this.$nextTick(async function () {
            await this.$store.dispatch('tipoPresenca/getTiposPresenca', {
				data: {
				},
				url: process.env.VUE_APP_API_URL + "tipo-presenca",
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