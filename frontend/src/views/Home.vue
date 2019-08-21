<template>
  <div class="signup-container">
    <NavHead/>
    <b-nav class="user" tabs align="center">
      <b-nav-item @click="signIn">Log In</b-nav-item>
      <b-nav-item @click="createLogin">Register New User</b-nav-item>
    </b-nav>
    <b-container class="forms-container">
      <b-row>
        <b-col sm="6" offset="3">
          <Login v-if="showSignIn"/><CreateLogin v-if="showCreateLogin"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead'
import Login from '@/components/Login'
import CreateLogin from '@/components/CreateLogin'

export default {
  name: 'signin',
  components: {
    NavHead,
    Login,
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
.user {
  padding-top: 65px;
}
</style>
