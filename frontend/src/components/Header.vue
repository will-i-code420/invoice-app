<template>
  <b-navbar type="dark" variant="info">
    <b-navbar-brand to="/about">{{ title }}</b-navbar-brand>
    <template v-if="user != null">
      <SideNav
      :name="user.name"
      :company="user.company"
      />
    </template>
  </b-navbar>
</template>

<script>
import SideNav from '@/components/SideNav.vue'

export default {
  name: 'header',
  props: ["user"],
  components: {
    SideNav
  },
  data () {
    return {
      title: "Invoice App"
    }
  }
}
</script>

<style>
</style>
