import { createStore } from 'vuex'
import geral from '@/store/modules/geral'
import turma from '@/store/modules/turma'
import serie from '@/store/modules/serie'
import usuario from '@/store/modules/usuario'
import aluno from '@/store/modules/aluno'

const store = createStore({
    modules:{
        geral,
        turma,
        serie,
        usuario,
        aluno,
    },
})

export default store