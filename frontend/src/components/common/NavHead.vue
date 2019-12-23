<template>
  <b-navbar class="navbar" type="dark" variant="info">
    <UserMenu v-if="$store.state.isLoggedIn"/>
  <b-navbar-nav class="ml-auto">
    <b-navbar-brand to="about">Business Solutions</b-navbar-brand>
  </b-navbar-nav>
  </b-navbar>
</template>

<script>
import UserMenu from '@/components/UserMenu'

export default {
  name: 'NavHead',
  components: {
    UserMenu
  }
}
</script>

<style scoped>
</style>
