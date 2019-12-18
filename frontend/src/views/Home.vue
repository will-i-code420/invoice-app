<template>
  <div class="signup-container">
    <Login v-if="view === 'login'" @create-account="setView"/>
    <Register v-else-if="view === 'register'" @goto-login="setView"/>
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
      view: 'login'
    }
  },
  methods: {
    setView(view) {
      this.view = view
    },
  }
}
</script>
