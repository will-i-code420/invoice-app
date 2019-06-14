<template>
  <div class="signup-container">
    <div class="header">
      <Header/>
    </div>
    <SignIn/><CreateLogin/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SignIn from '@/components/SignIn.vue'
import CreateLogin from '@/components/CreateLogin.vue'

export default {
  name: 'signup',
  components: {
    Header,
    SignIn,
    CreateLogin
  }
}
</script>

<style>
</style>
