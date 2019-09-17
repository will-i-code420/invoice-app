<template>
  <div class="signin-container">
    <b-row>
      <b-col>
        <b-form @submit.prevent="login">
          <label for="email">Email:</label>
          <b-form-input
          v-model="userLogin.email"
          placeholder="ex. bob@gmail.com"
          type="email"
          required
          >
          </b-form-input>
          <label for="password">Password:</label>
          <b-form-input
          v-model="userLogin.password"
          type="password"
          required
          >
          </b-form-input>
          <div>
            <b-button pill variant="success" type="submit">Log In</b-button>
            {{ loading }}
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import authenticationService from '@/services/authenticationService'

export default {
  name: 'login',
  data () {
    return {
      userLogin: {
        email: '',
        password: ''
      },
      loading: ''
    }
  },
  methods: {
    async login () {
      this.loading = 'Signing in...'
      await authenticationService.login(this.userLogin).then(res => {
        this.loading = ''
        if (res.data.status === true) {
          this.$cookies.set('token', res.data.token)
          this.$store.dispatch('setToken')
          this.$store.dispatch('setUser', res.data.user)
          this.$router.push ({ name: 'dashboard' })
        }
      }).catch(err => {
        this.loading = ''
        alert(err.response.data.error)
      })
    }
  }
}
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
label {
  margin: 15px 0;
}
</style>
