<template>
  <div class="single-business">
    <h1>Business</h1>
    <p>{{ business.business_name }}</p>
  </div>
</template>

<script>
import axios from 'axios'

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
  created () {
    let business_id = this.$route.params.business_id
    axios.get(`http://localhost:3128/business/${this.user.id}/${business_id}`,
    {
      headers: { "x-access-token": this.token }
    }).then(res => {
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
