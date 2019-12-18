<template>
  <div class="signup-container">
    <transition name="slide-fade" appear>
      <Login v-if="login" @goto-register="setViewRegister"/>
    </transition>
    <transition name="slide-fade" appear>
      <Register v-if="register" @goto-login="setViewLogin"/>
    </transition>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  name: 'home',
  components: {
    Login,
    Register
  },
  data () {
    return {
      login: true,
      register: false
    }
  },
  methods: {
    setViewLogin() {
      this.register = false
      this.login = true
    },
    setViewRegister() {
      this.login = false
      this.register = true
    }
  }
}
</script>
