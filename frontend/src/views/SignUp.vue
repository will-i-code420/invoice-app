<template>
  <div class="signup-container">
    <div class="header">
      <Header/>
    </div>
    <SignIn/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'signup',
  components: {
    Header,
    SignIn
  }
}
</script>

<style>
</style>
