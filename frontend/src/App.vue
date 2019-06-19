<template>
  <div id="app">
    <NavHead
    :user="user"
    />
    <router-view/>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'

export default {
  components: {
    NavHead
  },
  data () {
    return {
      user: (this.$route.params.user) ? this.$route.params.user : null
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
