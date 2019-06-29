<template>
  <div class="signin-container">
    <b-row>
      <b-col>
        <b-form @submit.prevent="login">
          <label for="email">Email:</label>
          <b-form-input
          v-model="model.email"
          placeholder="ex. bob@gmail.com"
          type="email"
          required
          >
          </b-form-input>
          <label for="password">Password:</label>
          <b-form-input
          v-model="model.password"
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
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      model: {
        email: '',
        password: ''
      },
      loading: '',
      status: ''
    }
  },
  methods: {
    login () {
      this.loading = 'Signing in'

      axios.post('http://localhost:3128/login', this.model).then(res => {
        this.loading = ''
        if (res.data.status === true) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push ({
            name: 'dashboard'
          })
        } else {
          this.status = res.data.message
        }
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
