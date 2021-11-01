<template>
    <h1>Teste Home Page</h1>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      errors: []
    }
  },
  computed: {
		...mapState({
			geral: state => state.geral,
		}),
    ...mapGetters({
      accessToken: 'geral/getAccessToken'
		}),
  },
  methods: {    
    
  },
  mounted() {
		this.$nextTick(async function () {
    })
  },
   beforeRouteEnter(to, from, next) {
      next(app => {
        const token = app.$store.state.geral.accessToken
        
        if (!token) {
          app.$router.push({name: 'Login'})
        }
      })
  }
}
</script>
