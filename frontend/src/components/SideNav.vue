<template>
  <div class="sidenav-container">
    <p class="menu-container" @click="openNav">
      &#9776;
    </p>
    <div id="leftside-nav" class="sidenav" v-if="!navBar">
      <p class="close-menu" @click="closeNav">
        <em>Close Menu</em>
      </p>
      <h2>{{ company }}</h2>
      <h3>Welcome, {{ name }}</h3>
      <p @click="setActive('create')">
        Create Invoice
      </p>
      <p @click="setActive('view')">
        View Invoices
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidenav',
  props: {
    [
      "name",
      "company"
    ]
  },
  data: {
    return {
      navBar: false
    }
  },
  methods: {
    setActive (option) {
      this.$parent.$parent.isactive = option
    },
    openNav () {
      this.navBar = true
    },
    closeNav () {
      this.navBar = false
    }
  }
}
</script>

<style>
.menu-container {
  font-size: 30px;
  cursor: pointer;
}
.close-menu {
  font-size: 12px;
  cursor: pointer;
}
.sidenav {
  width: 20%;
}
</style>
