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
            {{ status }}
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

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
      await authentication.login(this.userLogin).then(res => {
        this.loading = ''
        if (res.data.status === true) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push ({ name: 'dashboard' })
        }
      }).catch(err => {
        alert(err.res.data.message)
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
