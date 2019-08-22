<template>
  <b-navbar-nav>
    <b-dropdown ref="user_dropdown" text="Menu" no-caret variant="info">
      <b-dropdown-item><h5>Welcome, {{ user.name }}</h5></b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item class="create" to="/create"><h5>Create Invoice</h5></b-dropdown-item>
      <b-dropdown-item class="view" to="/invoices"><h5>View Invoices</h5></b-dropdown-item>
      <b-dropdown-item class="profile" to="/profile"><h5>Profile</h5></b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-button class="logout" variant="outline-primary" size="sm" @click="logout">Log Out</b-button>
    </b-dropdown>
    <b-navbar-brand to="/dashboard"><h5>{{ user.company_name }}</h5></b-navbar-brand>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'user-menu',
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push ({ path: '/' })
    }
  }
}
</script>

<style scoped>
.create, .view, .profile {
  text-align: center;
}
.logout {
  margin-left: 35%;
}
</style>
