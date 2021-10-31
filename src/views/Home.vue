<template>
    <h1>Teste Home Page</h1>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {    
    
  },
  //beforeRouteEnter(to, from, next) {
    //   next(app => {
    //     const token = app.$cookies.get('access_token')
        
    //     if (!token) {
    //       //console.log(token)
    //     } else {
    //       app.$router.push({name: 'Home'})
    //     }
    //   })
  //}
}
</script>
