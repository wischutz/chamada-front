
const mutations = {
    setAlunos (state, alunos) {
        state.alunos = alunos;
    },
    setAluno (state, aluno) {
        state.aluno = aluno;
    },
    setFormulario (state, aluno) {
        state.formulario = aluno;
    },
    setErro (state, erro) {
        state.erro = {...erro};
    },
};

export default mutations;
  