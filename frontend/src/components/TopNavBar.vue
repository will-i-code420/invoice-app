<template>
  <div class="top-nav-container">
    <ul class="top-nav-btns">
      <li><router-link :to="{ name: 'main-dashboard' }">
        Main Dashboard
      </router-link></li>
      <li><router-link :to="{ name: 'invoice-dashboard' }">
        Invoice Dashboard
      </router-link></li>
      <li><router-link :to="{ name: 'setting-dashboard' }">
        Settings Dashboard
      </router-link></li>
      <li><router-link :to="{ name: 'business-dashboard' }">
        Business Dashboard
      </router-link></li>
    </ul>
    <div class="top-nav-brand-container">
      <ul class="top-nav-brand">
        <li><button class="logout-btn" @click="logout">
          Log Out
        </button></li>
        <li><router-link :to="{ name: 'about' }">
          About
        </router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-nav-bar',
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push ({ path: '/' })
    }
  }
}
</script>

<style scoped>
</style>
