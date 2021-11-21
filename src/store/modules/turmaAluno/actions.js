import apiTurmaAluno from "@/api/turmaAluno";
const actions = {
    async getTurmaAlunos ({ commit }, payload) {
        const turmaAlunos = await apiTurmaAluno.get(payload);
        commit('setTurmaAlunos', turmaAlunos.data.map(function(obj){
            return {
                id: obj.id,
                aluno: obj.aluno,
                turma: obj.turma,
                situacao: obj.situacao,
            }
        }));
    },
    async getList ({ commit }, payload) {
        const turmaAlunos = await apiTurmaAluno.get(payload);
        if(turmaAlunos.success == 1 && turmaAlunos.data instanceof Object) {
            commit('setList', turmaAlunos.data);
        }
    },
    async read ({ commit }, payload) {
        const turmaAluno = await apiTurmaAluno.read(payload);
        commit('setTurmaAluno', turmaAluno.data);
        commit('setFormulario', turmaAluno.data);
    },
    async update({ commit }, payload) {
        const turmaAluno = await apiTurmaAluno.update(payload);
        if(turmaAluno.success == 1 && turmaAluno.data instanceof Object &&  turmaAluno.data.id) {
            commit('setTurmaAluno', turmaAluno.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: turmaAluno.success, message: turmaAluno.data.message});
        }
    },
    async create({ commit }, payload) {
        const turmaAluno = await apiTurmaAluno.create(payload);
        if(turmaAluno.success == 1 && turmaAluno.data instanceof Object &&  turmaAluno.data.id) {
            commit('setTurmaAluno', turmaAluno.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: turmaAluno.success, message: turmaAluno.data.message});
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
