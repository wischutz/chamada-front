import apiChamada from "@/api/chamada";
const actions = {
    async getChamadas ({ commit }, payload) {
        const chamadas = await apiChamada.get(payload);
        commit('setChamadas', chamadas.data.map(function(obj){
            return {
                id: obj.id,
                tipoPresenca: obj.tipoPresenca,
                periodo: obj.periodo,
                turma: obj.turma,
                aluno: obj.aluno,
                situacao: obj.situacao,
                data: obj.data
            }
        }));
    },
    async getList ({ commit }, payload) {
        const chamadas = await apiChamada.get(payload);
        if(chamadas.success == 1 && chamadas.data instanceof Object) {
            commit('setList', chamadas.data);
        }
    },
    async read ({ commit }, payload) {
        const chamada = await apiChamada.read(payload);
        commit('setChamada', chamada.data);
        commit('setFormulario', chamada.data);
    },
    async update({ commit }, payload) {
        const chamada = await apiChamada.update(payload);
        if(chamada.success == 1 && chamada.data instanceof Object &&  chamada.data.id) {
            commit('setChamada', chamada.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: chamada.success, message: chamada.data.message});
        }
    },
    async create({ commit }, payload) {
        const chamada = await apiChamada.create(payload);
        if(chamada.success == 1 && chamada.data instanceof Object &&  chamada.data.id) {
            commit('setChamada', chamada.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: chamada.success, message: chamada.data.message});
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
