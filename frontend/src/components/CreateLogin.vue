<template>
  <div class="create-login-container">
    <b-row>
      <b-col>
        <b-form @submit.prevent="register">
          <label for="name">Name:</label>
          <b-form-input
          v-model="model.name"
          placeholder="ex. Jane Doe"
          type="text"
          required
          >
          </b-form-input>
          <label for="email">Email:</label>
          <b-form-input
          v-model="model.email"
          placeholder="ex. bob@gmail.com"
          type="email"
          required
          >
          </b-form-input>
          <label for="company">Company Name:</label>
          <b-form-input
          v-model="model.company_name"
          type="text"
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
          <label for="c-password">Confirm Password:</label>
          <b-form-input
          v-model="model.c_password"
          type="passsword"
          required
          >
          </b-form-input>
          <div>
            <b-button variant="info">Register</b-button>
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
  name: 'create-login',
  data () {
    model: {
      name: '',
      email: '',
      password: '',
      c_password: '',
      company_name: ''
    },
    loading: '',
    status: ''
  },
  methods: {
    validate () {
      if (this.model.password != this.model.c_password) {
        return false
      }
      return true
    },
    register () {
      const formData = new formData()
      let valid = this.validate()
      if (valid) {
        formData.append('name', this.model.name)
        formData.append('email', this.model.email)
        formData.append('company_name', this.model.company_name)
        formData.append('password', this.model.password)

        this.loading = "Registering you, please wait"

        axios.post('http://localhost:3128/register', formData).then(res => {
          this.loading = ''
          if (res.data.status === true) {
            this.$router.push ({
              name: 'Dashboard',
              params: { user: res.data.user }
            })
          } else {
            this.status = res.data.message
          }
        })
      } else {
        alert('Passwords do not match')
      }
    }
  }
}
</script>

<style>
</style>
