<template>
  <div class="signin-container">
    <b-row>
      <b-col sm="6" offset="3">
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
        <hr>
        <b-button pill variant="primary" :to="{name: 'register'}">
          Create New Account
        </b-button>
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
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUser', res.data.user)
          this.$store.dispatch('setCompany', res.data.company)
          this.$router.push ({ name: 'dashboard' })
        } else {
          alert(res.data.error)
        }
      }).catch(err => {
        this.loading = ''
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
.signin-container {
  border: 3px solid blue;
  box-shadow: 0 0 20px green;
}
.btn {
  margin: 20px 0;
}
label {
  margin: 15px 0;
}
</style>
