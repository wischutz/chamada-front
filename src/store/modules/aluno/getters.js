const getters = {
    getAlunos: state => {
        if(!state.alunos) {
            return [];
        }
        const alunos = {...state.alunos};
        return Object.values(alunos);
    },
    getErro: (state) => {
        if(!state.erro) {
            return {};
        }
        return state.erro;
    },
    getAluno: (state) => {
        if(!state.aluno) {
            return {};
        }
        return state.aluno;
    },
    getFormulario: (state) => {
        if(!state.formulario) {
            return {};
        }
        return state.formulario;
    }
};
export default getters;
