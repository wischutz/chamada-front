const getters = {
    getAccessToken: state => {
        if(!state.accessToken) {
            return '';
        }
        const token = state.accessToken;
        return token;
    },
};
export default getters;
