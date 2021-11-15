<template>
  <Header/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar />

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">       
        <router-view></router-view>
      </main>
    </div>
  </div>
    
  
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar,
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
      const token = app.$cookies.get('access_token')
      
      if (!token) {
        app.$router.push({name: 'Login'})
      }else{
        app.$router.push({name: 'turmas_list'})
      }
    })
  }
}
</script>
<style>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>