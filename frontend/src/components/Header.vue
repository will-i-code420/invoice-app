<template>
  <b-navbar type="dark" variant="info">
    <template v-if="user != null">
      <SideNav
      :name="user.name"
      :company="user.company"
      />
    </template>
    <b-navbar-brand href="#">{{ title }}</b-navbar-brand>
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
