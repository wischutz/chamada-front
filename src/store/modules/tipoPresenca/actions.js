import apiTipoPresenca from "@/api/tipoPresenca";
const actions = {
    async getTiposPresenca ({ commit }, payload) {
        const tiposPresenca = await apiTipoPresenca.get(payload);
        commit('setTiposPresenca', tiposPresenca.data.map(function(obj){
            return {
                id: obj.id,
                nome: obj.nome,
                sigla: obj.sigla
            }
        }));
    },
    async read ({ commit }, payload) {
        const tipoPresenca = await apiTipoPresenca.read(payload);
        commit('setTipoPresenca', tipoPresenca.data);
    },
};
export default actions;
