
const mutations = {
    setTurmaAlunos (state, turmaAlunos) {
        state.turmaAlunos = turmaAlunos;
    },
    setList (state, turmaAlunos) {
        state.list = turmaAlunos;
    },
    setTurmaAluno (state, turmaAluno) {
        state.turmaAluno = turmaAluno;
    },
    setFormulario (state, turmaAluno) {
        state.formulario = turmaAluno;
    },
    setErro (state, erro) {
        state.erro = {...erro};
    },
};

export default mutations;
  