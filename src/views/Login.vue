<template>
<div class="container-fluid">
<div id="page">
<main class="container-display container-display-login">
  <div class="container">
    <div class="row" style="text-align: center">
      <h1>Diário Eletrônico</h1>
    </div>
    <div class="row">
      <div class="col-xl-4 offset-xl-4">
        <div class="card">
          <div class="card-body">
            <form>
                 <div class="mb-3">
                    <strong>Login</strong>                    
                </div>
                <hr>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" v-model="email" @keyup.enter="login()" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Senha</label>
                    <input type="password" v-model="password" @keyup.enter="login()" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="button" @click="login()" @keyup.enter="login()" class="btn btn-primary">Logar</button>
            </form>
        </div>
        </div>
      </div>
    </div>
  </div>
  </main>
</div>
</div>
</template>

<script>
import { requests } from '@/components/helper/requests';
import { mapState } from 'vuex'
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      email: this.email,
      password: this.password,
      errors: []
    }
  },
  computed: {
		...mapState({
			geral: state => state.geral,
		})
  },
  methods: {    
    async login() {
      const payload = {
        email: this.email,
        password: this.password
      }
      
      const a = await requests.post(process.env.VUE_APP_API_URL+'login', payload, null)
     if (a.access_token) {
				this.$cookies.set("access_token", a.access_token);
				this.$router.push({ name: "Home" });
			} else {
				this.errors = ["Usuário ou senha inválidos."];
				return this.errors;
			}
    }    
  },
  beforeRouteEnter(to, from, next) {
      next(app => {
        const token = app.$cookies.get("access_token");
			
        if (token) {
          app.$router.push({ name: "Home" });
        }
      })
  }
}
</script>