<template>
  <div class="create-login-container">
    <b-row>
      <b-col>
        <b-form ref="create" @submit.prevent="register">
          <label for="name">Name:</label>
          <b-form-input
          v-model="createUser.name"
          placeholder="ex. Jane Doe"
          type="text"
          required
          >
          </b-form-input>
          <label for="email">Email:</label>
          <b-form-input
          v-model="createUser.email"
          placeholder="ex. bob@gmail.com"
          type="email"
          required
          >
          </b-form-input>
          <label for="name">Phone:</label>
          <b-form-input
          v-model="createUser.phone"
          placeholder="ex. 800-235-1234 ext. 033"
          type="text"
          required
          >
          </b-form-input>
          <label for="company">Company Name:</label>
          <b-form-input
          v-model="createUser.company_name"
          type="text"
          required
          >
          </b-form-input>
          <label for="company">Company Address:</label>
          <b-form-input
          v-model="createUser.company_address"
          placeholder="Billing Street # and name only"
          type="text"
          required
          >
          </b-form-input>
          <label for="company">Company City:</label>
          <b-form-input
          v-model="createUser.company_city"
          type="text"
          required
          >
          </b-form-input>
          <label for="company">Company State:</label>
          <b-form-input
          v-model="createUser.company_state"
          type="text"
          required
          >
          </b-form-input>
          <label for="company">Company Zip:</label>
          <b-form-input
          v-model="createUser.company_zip"
          type="text"
          required
          >
          </b-form-input>
          <label for="password">Password:</label>
          <b-form-input
          v-model="createUser.password"
          type="password"
          required
          >
          </b-form-input>
          <label for="c-password">Confirm Password:</label>
          <b-form-input
          v-model="confirm_password"
          type="password"
          required
          >
          </b-form-input>
          <div>
            <b-button variant="info" type="submit">Register</b-button>
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
  name: 'register',
  data () {
    return {
      createUser: {
        name: '',
        email: '',
        phone: '',
        password: '',
        company_name: '',
        company_address: '',
        company_city: '',
        company_state: '',
        company_zip: ''
      },
      confirm_password: '',
      loading: '',
      registerError: ''
    }
  },
  methods: {
    validate () {
      if (this.createUser.password != this.confirm_password) {
        this.registerError = "Passwords DO NOT match!"
        return false
      } else if (this.createUser.phone.length !== 10) {
        this.registerError = "Not valid phone #"
        return false
      } else {
        return true
      }
    },
    async register () {
      if (this.createUser.phone === '') {
        this. createUser.phone = '0000000000'
      }
      let valid = this.validate()
      if (valid) {
        this.loading = "Registering you, please wait..."
        this.createUser.phone = parseInt(this.createUser.phone)
        await authenticationService.register(this.createUser).then(res => {
          this.loading = ''
          if (res.data.status === true) {
            this.$store.dispatch('setToken', res.data.token)
            this.$store.dispatch('setUser', res.data.user)
            this.$router.push ({ name: 'dashboard' })
          }
          }).catch(err => {
            this.loading = ''
            alert(err.response.data.error)
        })
      } else {
        this.loading = ''
        alert(this.registerError)
      }
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
