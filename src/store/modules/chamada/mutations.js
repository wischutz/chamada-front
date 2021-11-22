
const mutations = {
    setChamadas (state, chamadas) {
        state.chamadas = chamadas;
    },
    setList (state, chamadas) {
        state.list = chamadas;
    },
    setChamada (state, chamada) {
        state.chamada = chamada;
    },
    setFormulario (state, chamada) {
        state.formulario = chamada;
    },
    setErro (state, erro) {
        state.erro = {...erro};
    },
};

export default mutations;
  