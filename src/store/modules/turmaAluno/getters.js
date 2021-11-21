const getters = {
    getList: state => {
        if(!state.list) {
            return [];
        }
        const list = {...state.list};
        return Object.values(list);
    },
    getTurmaAlunos: state => {
        if(!state.turmaAlunos) {
            return [];
        }
        const turmaAlunos = {...state.turmaAlunos};
        return Object.values(turmaAlunos);
    },
    getErro: (state) => {
        if(!state.erro) {
            return {};
        }
        return state.erro;
    },
    getTurmaAluno: (state) => {
        if(!state.turmaAluno) {
            return {};
        }
        return state.turmaAluno;
    },
    getFormulario: (state) => {
        if(!state.formulario) {
            return {};
        }
        return state.formulario;
    }
};
export default getters;
