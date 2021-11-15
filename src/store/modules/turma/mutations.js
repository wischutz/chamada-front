
const mutations = {
    setTurmas (state, turmas) {
        state.turmas = turmas;
    },
    setList (state, turmas) {
        state.list = turmas;
    },
    setTurma (state, turma) {
        state.turma = turma;
    },
    setFormulario (state, turma) {
        state.formulario = turma;
    },
    setErro (state, erro) {
        state.erro = {...erro};
    },
};

export default mutations;
  