const getters = {
    getList: state => {
        if(!state.list) {
            return [];
        }
        const list = {...state.list};
        return Object.values(list);
    },
    getTurmas: state => {
        if(!state.turmas) {
            return [];
        }
        const turmas = {...state.turmas};
        return Object.values(turmas);
    },
    getErro: (state) => {
        if(!state.erro) {
            return {};
        }
        return state.erro;
    },
    getTurma: (state) => {
        if(!state.turma) {
            return {};
        }
        return state.turma;
    },
    getFormulario: (state) => {
        if(!state.formulario) {
            return {};
        }
        return state.formulario;
    }
};
export default getters;
