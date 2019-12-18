<template>
  <div class="signup-container">
    <transition name="slide-fade" appear>
      <Login v-if="view === 'login'" @create-account="setView"/>
      <Register v-else-if="view === 'register'" @goto-login="setView"/>
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
