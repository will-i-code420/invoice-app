<template>
  <div class="register-container">
    <span class="return-login">Oops, need to go back to login page
    <button type="button" class="return-login-btn" @click="login()">
      Login Page
    </button>
    ??
    </span>
    <h1 class="register-title">Register Your Company</h1>
    <form id="register-form" @submit.prevent="register" autocomplete="off">
      <label for="name">Full Name:</label>
        <input
        v-model="createCompany.name"
        id="name"
        placeholder="ex. Ricky Bobby"
        type="text"
        aria-labelledby="your full name"
        required
        >
      <label for="title">Title:</label>
        <input
        v-model="createCompany.title"
        id="title"
        placeholder="ex. Owner, Operator, CEO, etc..."
        type="text"
        aria-labelledby="Your position title"
        required
        >
      <label for="email">Your Email:</label>
        <input
        v-model="createCompany.email"
        id="email"
        type="email"
        aria-labelledby="your email address with company"
        required
        >
      <label for="phone">Your Phone:</label>
        <input
        v-model="createCompany.phone"
        id="phone"
        placeholder="ex. 800-235-1234 ext. 033"
        type="text"
        aria-labelledby="your phone number with company, include ext or direct line"
        required
        >
      <label for="company-name">Company Name:</label>
        <input
        v-model="createCompany.company_name"
        id="company-name"
        type="text"
        aria-labelledby="company name"
        required
        >
      <label for="company-phone">Company Phone:</label>
        <input
        v-model="createCompany.company_phone"
        id="company-phone"
        type="text"
        placeholder="Main Contact #, leave blank if using same phone above"
        aria-labelledby="main company phone, leave blank if using same phone above"
        >
      <label for="company-email">Company Email:</label>
        <input
        v-model="createCompany.company_email"
        id="company-email"
        type="email"
        placeholder="Leave Blank if using same email above"
        aria-labelledby="main company email, leave blank if using same above"
        >
      <label for="company-address">Company Address:</label>
        <input
        v-model="createCompany.company_address"
        id="company-address"
        placeholder="Billing Street # and street info only"
        type="text"
        aria-labelledby="billing street number and street info only"
        required
        >
      <label for="company-city">Company City:</label>
        <input
        v-model="createCompany.company_city"
        id="company-city"
        type="text"
        aria-labelledby="billing city"
        required
        >
      <label for="company-state">Company State:</label>
        <input
        v-model="createCompany.company_state"
        id="company-state"
        type="text"
        aria-labelledby="billing state"
        required
        >
      <label for="company-zip">Company Zip:</label>
        <input
        v-model="createCompany.company_zip"
        id="company-zip"
        type="text"
        aria-labelledby="billing zip code"
        required
        >
      <label for="ein">EIN #:</label>
        <input
        v-model="createCompany.company_ein"
        id="ein"
        type="password"
        title="If small business w/out EIN use SS#"
        aria-labelledby="company ein or SS# if small business"
        required
        >
      <label for="password">Password:</label>
        <input
        v-model="createCompany.password"
        id="password"
        type="password"
        title="Must be 8-32 characters long using letters and/or numbers"
        aria-labelledby="create password 8 to 32 characters long using letters and/or numbers"
        required
        >
      <label for="confirm-password">Confirm Password:</label>
        <input
        v-model="confirm_password"
        id="confirm-password"
        type="password"
        aria-labelledby="Confirm Password"
        required
        >
        <button type="submit" class="submit-registration-btn">
          Register
        </button>
        <span class="register-loading-msg">{{ message }}</span>
    </form>
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
        title: '',
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
      message: ''
    }
  },
  methods: {
    validate () {
      if (this.createCompany.password != this.confirm_password) {
        this.message = "Passwords DO NOT match!"
        return false
      } else if (this.createCompany.phone.length < 10) {
        this.message = "Not valid phone #"
        return false
      } else {
        return true
      }
    },
    async register () {
      this.message = ''
      if (this.createCompany.company_email === '' || this.createCompany.company_phone === '') {
        this.createCompany.company_email = this.createCompany.email
        this.createCompany.company_phone = this.createCompany.phone
      }
      let valid = await this.validate()
      if (valid) {
        this.message = "Registering you, please wait..."
        await authenticationService.register(this.createCompany).then(res => {
          this.message = "Registration Successful!! And away you go..."
          if (res.data.status === true) {
            this.$store.dispatch('setToken', res.data.token)
            this.$store.dispatch('setUser', res.data.user)
            this.$store.dispatch('setCompany', res.data.company)
            this.$router.push ({ name: 'setting-dashboard' })
          } else {
            this.message = `${res.data.error}`
          }
        }).catch(err => {
          this.message = `${err}`
        })
      } else {
        this.message = `${this.registerError}`
      }
    },
    login() {
      this.$emit('goto-login')
    }
  }
}
</script>
