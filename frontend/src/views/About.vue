<template>
  <div class="about-container">
    <NavHead/>
    <h1 class="about">This is an about page</h1>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'

export default {
  name: 'about',
  components: {
    NavHead
  }
}
</script>

<style>
.about {
  padding-top: 65px;
}
</style>
