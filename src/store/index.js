import { createStore } from 'vuex'
import geral from '@/store/modules/geral'
import turma from '@/store/modules/turma'

const store = createStore({
    modules:{
        geral,
        turma,
    },
})

export default store