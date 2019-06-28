<template>
  <b-navbar type="dark" variant="info" fixed="top">
    <b-navbar-nav>
      <template v-if="user != null">
        <SideNav
        :name="user.name"
        :company ="user.company_name"
        />
      </template>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-navbar-brand to="/about">{{ title }}</b-navbar-brand>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import SideNav from '@/components/SideNav.vue'

export default {
  name: 'navhead',
  props: ["user"],
  components: {
    SideNav
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
