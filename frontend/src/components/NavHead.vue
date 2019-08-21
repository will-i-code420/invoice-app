<template>
  <b-navbar type="dark" variant="info" fixed="top">
    <Menu v-if="$store.state.isLoggedIn"/>
  <b-navbar-nav class="ml-auto">
    <b-navbar-brand to="about">{{ title }}</b-navbar-brand>
  </b-navbar-nav>
  </b-navbar>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'navhead',
  components: {
    Menu
  },
  data () {
    return {
      title: "Invoice App",
    }
  }
}
</script>

<style>
</style>
