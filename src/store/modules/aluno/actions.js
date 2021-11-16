import apiAluno from "@/api/aluno";
const actions = {
    async getAlunos ({ commit }, payload) {
        const alunos = await apiAluno.get(payload);
        commit('setAlunos', alunos.data.map(function(obj){
            return {
                id: obj.id,
                nome: obj.nome,
                dataNascimento: new Date(obj.dataNascimento).toLocaleDateString('pt-BR'),
                serieGrau: obj.serie.grau,
                serieAno: obj.serie.ano,
            }
        }));
    },
    async read ({ commit }, payload) {
        const aluno = await apiAluno.read(payload);
        commit('setAluno', aluno.data);
        commit('setFormulario', aluno.data);
    },
    async update({ commit }, payload) {
        const aluno = await apiAluno.update(payload);
        if(aluno.success == 1 && aluno.data instanceof Object &&  aluno.data.id) {
            commit('setAluno', aluno.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: aluno.success, message: aluno.data.message});
        }
    },
    async create({ commit }, payload) {
        const aluno = await apiAluno.create(payload);
        if(aluno.success == 1 && aluno.data instanceof Object &&  aluno.data.id) {
            commit('setAluno', aluno.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: aluno.success, message: aluno.data.message});
        }
    },
    async setErro({ commit }, payload) {
        commit('setErro', payload);
    },
    async setFormulario({ commit }, payload) {
        commit('setFormulario', payload);
    }
};
export default actions;
