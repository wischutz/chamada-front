const getters = {
    getUsuarios: state => {
        if(!state.usuarios) {
            return [];
        }
        const usuarios = {...state.usuarios};
        return Object.values(usuarios);
    },
    getErro: (state) => {
        if(!state.erro) {
            return {};
        }
        return state.erro;
    },
    getUsuario: (state) => {
        if(!state.usuario) {
            return {};
        }
        return state.usuario;
    },
    getFormulario: (state) => {
        if(!state.formulario) {
            return {};
        }
        return state.formulario;
    }
};
export default getters;
