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
            <b-button pill variant="success">Login</b-button>
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
  name: 'signup',
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
      const formData = new formData()
      formData.append('email', this.model.email)
      formData.append('password', this.model.password)
      this.loading = 'Signing in'

      axios.post('http://localhost:3128/login', formData).then(res => {
        this.loading = ''
        if (res.data.status === true) {
          this.$router.push ({
            name: 'Dashboard',
            params: { user: res.data.user}
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
</style>
