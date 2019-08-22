<template>
  <div class="about-container">
    <h1 class="about">This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style>
.about {
  padding-top: 65px;
}
</style>
