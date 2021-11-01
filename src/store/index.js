import { createStore } from 'vuex'
import geral from '@/store/modules/geral'

const store = createStore({
    modules:{
        geral,
    },
})

export default store