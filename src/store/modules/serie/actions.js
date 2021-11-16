import apiSerie from "@/api/turma";
const actions = {
    async getSeries ({ commit }, payload) {
        const series = await apiSerie.get(payload);
        commit('setSeries', series.data.map(function(obj){
            return {
                id: obj.id,
                alunos: obj.alunos,
                ano: obj.ano,
                grau: obj.grau,
            }
        }));
    },
    async read ({ commit }, payload) {
        const serie = await apiSerie.read(payload);
        commit('setSerie', serie.data);
    },
};
export default actions;
