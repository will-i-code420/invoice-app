<template>
  <div class="about-container">
    <NavHead
    :user="user"
    />
    <h1 class="about">This is an about page</h1>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'

export default {
  name: 'about',
  components: {
    NavHead
  },
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style>
.about {
  padding-top: 65px;
}
</style>
