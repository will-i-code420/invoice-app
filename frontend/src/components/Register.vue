<template>
  <div class="register-container">
    <h1>Register Your Company</h1>
    <b-container class="forms-container">
      <b-row>
        <b-col sm="8" offset="2">
          <b-form ref="create" @submit.prevent="register">
            <label for="name">Name:</label>
            <b-form-input
            v-model="createCompany.name"
            placeholder="ex. Jane Doe"
            type="text"
            required
            >
            </b-form-input>
            <label for="email">Email:</label>
            <b-form-input
            v-model="createCompany.email"
            placeholder="ex. bob@gmail.com"
            type="email"
            required
            >
            </b-form-input>
            <label for="name">Phone:</label>
            <b-form-input
            v-model="createCompany.phone"
            placeholder="ex. 800-235-1234 ext. 033"
            type="text"
            required
            >
            </b-form-input>
            <label for="company">Company Name:</label>
            <b-form-input
            v-model="createCompany.company_name"
            type="text"
            required
            >
            </b-form-input>
            <label for="company">Company Phone:</label>
            <b-form-input
            v-model="createCompany.company_phone"
            type="text"
            placeholder="Main Contact #, no direct line or ext"
            required
            >
            </b-form-input>
            <label for="company">Company Email:</label>
            <b-form-input
            v-model="createCompany.company_email"
            type="email"
            placeholder="Leave Blank if using same email for login"
            >
            </b-form-input>
            <label for="company">Company Address:</label>
            <b-form-input
            v-model="createCompany.company_address"
            placeholder="Billing Street # and name only"
            type="text"
            required
            >
            </b-form-input>
            <label for="company">Company City:</label>
            <b-form-input
            v-model="createCompany.company_city"
            type="text"
            required
            >
            </b-form-input>
            <label for="company">Company State:</label>
            <b-form-input
            v-model="createCompany.company_state"
            type="text"
            required
            >
            </b-form-input>
            <label for="company">Company Zip:</label>
            <b-form-input
            v-model="createCompany.company_zip"
            type="text"
            required
            >
            </b-form-input>
            <label for="ein">EIN #:</label>
            <b-form-input
            v-model="createCompany.company_ein"
            type="text"
            required
            >
            </b-form-input>
            <label for="password">Password:</label>
            <b-form-input
            v-model="createCompany.password"
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
    </b-container>
  </div>
</template>

<script>
import authenticationService from '@/services/authenticationService'

export default {
  name: 'register',
  data () {
    return {
      createCompany: {
        name: '',
        email: '',
        phone: '',
        password: '',
        company_name: '',
        company_phone: '',
        company_email: '',
        company_address: '',
        company_city: '',
        company_state: '',
        company_zip: '',
        company_ein: '',
        role: 'admin'
      },
      confirm_password: '',
      loading: '',
      registerError: ''
    }
  },
  methods: {
    validate () {
      if (this.createCompany.password != this.confirm_password) {
        this.registerError = "Passwords DO NOT match!"
        return false
      } else if (this.createCompany.phone.length < 10) {
        this.registerError = "Not valid phone #"
        return false
      } else {
        return true
      }
    },
    async register () {
      if (this.createCompany.company_email === '') {
        this.createCompany.company_email = this.createCompany.email
      }
      let valid = this.validate()
      if (valid) {
        this.loading = "Registering you, please wait..."
        await authenticationService.register(this.createCompany).then(res => {
          this.loading = ''
          if (res.data.status === true) {
            this.$store.dispatch('setToken', res.data.token)
            this.$store.dispatch('setUser', res.data.user)
            this.$store.dispatch('setCompany', res.data.company)
            this.$router.push ({ name: 'profile' })
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
.register-container {
  padding-top: 70px;
}
.forms-container {
  border: 3px solid blue;
}
.btn {
  margin: 20px 0;
}
label {
  margin: 15px 0;
}
</style>
