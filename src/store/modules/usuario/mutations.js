
const mutations = {
    setUsuarios (state, usuarios) {
        state.usuarios = usuarios;
    },
    setUsuario (state, usuario) {
        state.usuario = usuario;
    },
    setFormulario (state, usuario) {
        state.formulario = usuario;
    },
    setErro (state, erro) {
        state.erro = {...erro};
    },
};

export default mutations;
  