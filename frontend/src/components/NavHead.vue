<template>
  <b-navbar type="dark" variant="info" fixed="top">
    <b-navbar-nav>
      <template v-if="user != null">
        <b-nav>
          <b-nav-item-dropdown
          id="user-dropdown-menu"
          text="Menu"
          >
          <b-dropdown-item><h5>Welcome, {{ user.name }}</h5></b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="setActive('create')"><h5>Create Invoice</h5></b-dropdown-item>
          <b-dropdown-item @click="setActive('view')"><h5>View Invoices</h5></b-dropdown-item>
          <b-dropdown-item to="profile"><h5>Profile</h5></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="dashboard"><h5>{{ user.company_name }}</h5></b-nav-item>
        </b-nav>
      </template>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-navbar-brand to="about">{{ title }}</b-navbar-brand>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'navhead',
  props: ["user"],
  data () {
    return {
      title: "Invoice App",
    }
  },
  methods: {
    setActive (option) {
      this.$parent.isactive = option
    }
  }
}
</script>

<style>
</style>
