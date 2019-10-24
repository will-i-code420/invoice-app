<template>
  <div class="signup-container">
    <b-container class="forms-container">
      <b-row>
        <b-col sm="6" offset="3">
          <h1>Sign In</h1>
          <Login v-if="login"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'signin',
  components: {
    Login
  },
  data () {
    return {
      login: true
    }
  },
  methods: {
    setView () {
      this.login = !this.login
    },
  }
}
</script>

<style scoped>
.signup-container {
  padding-top: 65px;
}
</style>
