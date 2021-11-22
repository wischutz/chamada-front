const getters = {
    getTiposPresenca: state => {
        if(!state.tiposPresenca) {
            return [];
        }
        const tiposPresenca = {...state.tiposPresenca};
        return Object.values(tiposPresenca);
    },
    getTipoPresenca: (state) => {
        if(!state.tipoPresenca) {
            return {};
        }
        return state.tipoPresenca;
    },
};
export default getters;
