<template>
  <div class="single-business">
    <h1>Business</h1>
    <p>{{ business.business_name }}</p>
  </div>
</template>

<script>
import businessService from '@/services/businessService'

export default {
  name: 'singleBusiness',
  data () {
    return {
      business: {}
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    token() {
      return this.$store.getters.getToken
    }
  },
  async created () {
    const id = this.$store.state.user.id
    const businessId = this.$store.state.route.params.id
    await businessService.business(id, businessId).then(res => {
      if (res.data.status === true) {
        this.business = res.data.business
      }
    })
  }
}
</script>

<style scoped>
h1 {
  margin-top: 70px;
}
</style>
