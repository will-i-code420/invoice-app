<template>
  <b-navbar type="dark" variant="info" fixed="top">
    <UserMenu v-if="$store.state.isLoggedIn"/>
  <b-navbar-nav class="ml-auto">
    <b-navbar-brand to="about">{{ title }}</b-navbar-brand>
  </b-navbar-nav>
  </b-navbar>
</template>

<script>
import UserMenu from '@/components/UserMenu'

export default {
  name: 'navhead',
  components: {
    UserMenu
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
