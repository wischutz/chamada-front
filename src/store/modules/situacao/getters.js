const getters = {
    getSituacoes: state => {
        if(!state.situacoes) {
            return [];
        }
        const situacoes = {...state.situacoes};
        return Object.values(situacoes);
    },
    getSituacao: (state) => {
        if(!state.situacao) {
            return {};
        }
        return state.situacao;
    },
};
export default getters;
