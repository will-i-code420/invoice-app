<template>
  <div class="sidenav-container">
    <b-nav>
      <b-nav-item-dropdown
      id="user-dropdown-menu"
      text="Menu"
      >
      <b-dropdown-item><h3>{{ company }}</h3></b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item @click="setActive('create')"><h5>Create Invoice</h5></b-dropdown-item>
      <b-dropdown-item @click="setActive('view')"><h5>View Invoices</h5></b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item disabled><h5>Welcome, {{ name }}</h5></b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'sidenav',
  props: ["name", "company"],
  data () {
    return {
      navBar: false
    }
  },
  methods: {
    setActive (option) {
      this.$parent.$parent.isactive = option
    }
  }
}
</script>

<style>
</style>
