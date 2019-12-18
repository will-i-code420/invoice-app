<template>
  <div class="signup-container">
    <div class="login-container">
      <Login v-if="login"/>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'home',
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
