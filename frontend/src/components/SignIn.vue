<template>
  <div class="signin-container">
    <b-row>
      <b-col>
        <form @submit.prevent="login">
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
        </form>
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
        name: '',
        email: '',
        password: '',
        c_password: '',
        company_name: ''
      },
      loading: '',
      status: ''
    }
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
    },
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

<style>
</style>
