<template>
  <div class="signin-container">
    <img src="../assets/images/user.png" alt="blank login avatar" class="avatar">
    <h1 class="signin-title">Login</h1>
    <form id="signin-form" @submit.prevent="login">
      <label for="email">Email:</label>
        <input
        v-model="userLogin.email"
        id="email"
        type="email"
        aria-labelledby="email address"
        required
        >
      <label for="password">Password:</label>
        <input
        v-model="userLogin.password"
        id="password"
        type="password"
        aria-labelledby="password"
        required
        >
        <div class="login-btn-container">
          <button class="login-btn" type="submit">
            Log In
          </button>
          <span class="between-login-reset-btn">OR</span>
          <button class="reset-pass-btn" type="button">
            Reset Password
          </button>
        </div>
        <span class="loading-msg">{{ loading }}</span>
    </form>
    <span class="line-between-login-register">Don't Have An Account??</span>
    <div class="register-btn-container">
      <button class="register-btn" type="button" @click="createAccount()">
        Create New Account
      </button>
    </div>
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
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUser', res.data.user)
          this.$store.dispatch('setCompany', res.data.company)
          this.$router.push ({ name: 'dashboard' })
        } else {
          this.loading = res.data.error
        }
      }).catch(err => {
        this.loading = `${err}`
      })
    },
    createAccount() {
      this.$emit('create-account', 'register')
    }
  }
}
</script>
