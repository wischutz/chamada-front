import apiUsuario from "@/api/usuario";
const actions = {
    async getUsuarios ({ commit }, payload) {
        const usuarios = await apiUsuario.get(payload);
        commit('setUsuarios', usuarios.data.map(function(obj){
            return {
                id: obj.id,
                nome: obj.nome,
                email: obj.email,
                ativo: obj.ativo
            }
        }));
    },
    async read ({ commit }, payload) {
        const usuario = await apiUsuario.read(payload);
        commit('setUsuario', usuario.data);
        commit('setFormulario', usuario.data);
    },
    async update({ commit }, payload) {
        const usuario = await apiUsuario.update(payload);
        if(usuario.success == 1 && usuario.data instanceof Object &&  usuario.data.id) {
            commit('setUsuario', usuario.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: usuario.success, message: usuario.data.message});
        }
    },
    async create({ commit }, payload) {
        const usuario = await apiUsuario.create(payload);
        if(usuario.success == 1 && usuario.data instanceof Object &&  usuario.data.id) {
            commit('setUsuario', usuario.data);
            commit('setErro', {send: true, success: 1, message: ""});
        } else {
            commit('setErro', {send: true, success: usuario.success, message: usuario.data.message});
        }
    },
    async setErro({ commit }, payload) {
        commit('setErro', payload);
    },
    async setFormulario({ commit }, payload) {
        commit('setFormulario', payload);
    }
};
export default actions;
