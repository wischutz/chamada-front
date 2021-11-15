<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/turmas">Diário Eletrônico</router-link>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
            <a class="nav-link px-3" @click="logout()" style="cursor:pointer">Logout</a>
            </div>
        </div>
    </header>
</template>
<script>
export default {
  name: 'Header',
  components: {
  }, 
  methods: {
		async logout() {
			await this.$router.push({name: 'Login'})
			await this.$cookies.remove('access_token')
			await this.$router.push({name: 'Login'})
		},
	}
}
</script>