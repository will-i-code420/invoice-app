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
            {{ status }}
          </div>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import authentication from '@/services/authentication'

export default {
  name: 'create-login',
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
      status: ''
    }
  },
  methods: {
    validate () {
      if (this.createUser.password != this.confirm_password) {
        return false
      }
      return true
    },
    async register () {
      let valid = this.validate()
      if (valid) {
        this.loading = "Registering you, please wait..."
        await authentication.register(this.createUser).then(res => {
          this.loading = ''
          if (res.data.status === true) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            this.$router.push ({ name: 'dashboard' })
          }
          }).catch(err => {
            alert(err)
        })
      } else {
        alert('Passwords do not match')
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
