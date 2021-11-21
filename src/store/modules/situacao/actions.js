import apiSituacao from "@/api/situacao";
const actions = {
    async getSituacoes ({ commit }, payload) {
        const situacao = await apiSituacao.get(payload);
        commit('setSituacoes', situacao.data.map(function(obj){
            return {
                id: obj.id,
                nome: obj.nome
            }
        }));
    },
    async read ({ commit }, payload) {
        const situacao = await apiSituacao.read(payload);
        commit('setSituacao', situacao.data);
    },
};
export default actions;
