import apiTurma from "@/api/turma";
const actions = {
    async getTurmas ({ commit }, payload) {
        const turmas = await apiTurma.get(payload);
        commit('setTurmas', turmas.data.map(function(obj){
            return {
                id: obj.id,
                professor: obj.professor.nome,
                serieGrau: obj.serie.grau,
                serieAno: obj.serie.ano,
                nome: obj.nome,
            }
        }));
    },
    async getList ({ commit }, payload) {
        const turmas = await apiTurma.get(payload);
        if(turmas.success == 1 && turmas.data instanceof Object) {
            commit('setList', turmas.data);
        }
    },
    async read ({ commit }, payload) {
        const turma = await apiTurma.read(payload);
        commit('setTurma', turma.data);
        commit('setFormulario', turma.data);
    },
    async update({ commit }, payload) {
        const turma = await apiTurma.update(payload);
        if(turma.success == 1 && turma.data instanceof Object &&  turma.data.id) {
            commit('setTurma', turma.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: turma.success, message: turma.data.message});
        }
    },
    async create({ commit }, payload) {
        const turma = await apiTurma.create(payload);
        if(turma.success == 1 && turma.data instanceof Object &&  turma.data.id) {
            commit('setTurma', turma.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: turma.success, message: turma.data.message});
        }
    },
    async createAula({ commit }, payload) {
        const aula = await apiTurma.create(payload);
        if(aula.success == 1 && aula.data instanceof Object &&  aula.data.id) {
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: aula.success, message: aula.data.message});
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
