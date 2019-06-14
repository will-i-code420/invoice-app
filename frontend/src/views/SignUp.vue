<template>
  <div class="signup-container">
    <b-nav tabs align="center">
      <b-nav-item @click="signIn">Sign-In</b-nav-item>
      <b-nav-item @click="createLogin">Register New User</b-nav-item>
    </b-nav>
    <b-container class="forms-container">
      <b-row>
        <b-col sm="6" offset="3">
          <SignIn v-if="showSignIn"/><CreateLogin v-if="showCreateLogin"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import CreateLogin from '@/components/CreateLogin.vue'

export default {
  name: 'signup',
  components: {
    SignIn,
    CreateLogin
  },
  data () {
    return {
      showSignIn: true,
      showCreateLogin: false
    }
  },
  methods: {
    signIn () {
      this.showSignIn = !this.showSignIn
      this.showCreateLogin = false
    },
    createLogin () {
      this.showCreateLogin = !this.showCreateLogin
      this.showSignIn = false
    }
  }
}
</script>

<style scoped>
.nav {
  margin-bottom: 30px;
}
</style>
