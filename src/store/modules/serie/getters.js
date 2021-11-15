const getters = {
    getSeries: state => {
        if(!state.series) {
            return [];
        }
        const series = {...state.series};
        return Object.values(series);
    },
    getSerie: (state) => {
        if(!state.serie) {
            return {};
        }
        return state.serie;
    },
};
export default getters;
