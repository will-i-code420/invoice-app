<template>
  <b-navbar-nav class="navhead">
    <b-dropdown ref="user_dropdown" text="Menu" no-caret variant="info">
      <b-dropdown-item class="menu-item" to="/create"><h5>Create Invoice</h5></b-dropdown-item>
      <b-dropdown-item class="menu-item" to="/invoices"><h5>View Invoices</h5></b-dropdown-item>
      <b-dropdown-item class="menu-item" to="/create-business"><h5>Add Business</h5></b-dropdown-item>
      <b-dropdown-item v-if="admin" class="menu-item" to="/create-employee"><h5>Add Employee</h5></b-dropdown-item>
      <b-dropdown-item class="menu-item" to="/profile"><h5>Profile</h5></b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-button class="logout" variant="outline-danger" pill size="sm" @click="logout">Log Out</b-button>
    </b-dropdown>
    <b-navbar-brand class="company" to="/dashboard"><h5>{{ company.company_name }}</h5></b-navbar-brand>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'user-menu',
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    company() {
      return this.$store.getters.getCompany
    },
    admin() {
      return this.$store.getters.isAdmin
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
.menu-item {
  text-align: center;
  width: 225px;
  margin: 5px 0;
}
.logout {
  margin-left: 35%;
}
.company {
  padding-top: 10px;
  padding-left: 10px;
}
</style>
