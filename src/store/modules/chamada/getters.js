const getters = {
    getList: state => {
        if(!state.list) {
            return [];
        }
        const list = {...state.list};
        return Object.values(list);
    },
    getChamadas: state => {
        if(!state.chamadas) {
            return [];
        }
        const chamadas = {...state.chamadas};
        return Object.values(chamadas);
    },
    getErro: (state) => {
        if(!state.erro) {
            return {};
        }
        return state.erro;
    },
    getChamada: (state) => {
        if(!state.chamada) {
            return {};
        }
        return state.chamada;
    },
    getFormulario: (state) => {
        if(!state.formulario) {
            return {};
        }
        return state.formulario;
    }
};
export default getters;
