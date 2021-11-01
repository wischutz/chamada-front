
const mutations = {
    setAccessToken(state, token){
        state.accessToken = token
    },
    setErro (state, erro) {
        state.erro = {...erro};
    }
};

export default mutations;
  