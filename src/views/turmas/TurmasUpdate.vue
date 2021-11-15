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
                    <option v-for="(item, index) in series" :key="index" :value="item.id">Ano: {{ item.ano }} || Série: {{ item.grau }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="professor" class="form-label">Professor</label>
                <select name="professor" id="professor" v-model="turma.professor" class="form-control">
                    <option value="">Selecione</option>
                    <option v-for="(item, index) in professores" :key="index" :value="item.id" :selected="(item.nome == turma.professor)">{{ item.nome }}</option>
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
            turma:{},
            errors: []
        }
    },
    computed: {
		...mapGetters({
			erro: 'turma/getErro',
            series: 'serie/getSeries',
            professores: 'usuario/getUsuarios',
            turmaLoad: 'turma/getTurma',
		}),
	},
    methods:{
        async salvar(){
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

            // document.getElementById("serie").value = this.turma.serie.id
            // document.getElementById("professor").value = this.turma.professor.id
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