import { createStore } from 'vuex'

const store = createStore({
    modules:{

    },
    state () {
        return{
            access_token: ''
        }
    },
    mutations: {
		authenticate (state, token) {
			state.access_token = token
      }
    }
})

export default store