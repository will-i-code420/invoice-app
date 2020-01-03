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
        <span class="login-loading-msg">{{ message }}</span>
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
      message: ''
    }
  },
  methods: {
    async login () {
      this.message = "Loggin you in..."
      try {
        await authenticationService.login(this.userLogin).then(res => {
          this.message = "Getting Required Info..."
          if (res.data.status === true) {
            this.$store.dispatch('setToken', res.data.token)
            this.$store.dispatch('setUser', res.data.user)
            this.$store.dispatch('setCompany', res.data.company)
            this.$router.push ({ name: 'main-dashboard' })
          }
        })
      } catch (err) {
        this.message = `${err}`
      }
    },
    createAccount() {
      this.$emit('goto-register')
    }
  }
}
</script>
