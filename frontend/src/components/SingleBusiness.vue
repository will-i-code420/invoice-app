<template>
  <div class="single-business">
    <NavHead
    :user="user"
    />
    <h1>Business</h1>
    <p>{{ business.business_name }}</p>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'
import axios from 'axios'

export default {
  name: 'singleBusiness',
  components: {
    NavHead
  },
  data () {
    return {
      user: '',
      business: {}
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    let token = localStorage.getItem('token')
    let business_id = this.$route.params.business_id
    axios.get(`http://localhost:3128/business/user/${this.user.id}/${business_id}`,
    {
      headers: { "x-access-token": token }
    }).then(res => {
      if (res.data.status === true) {
        this.business = res.data.business
      }
    })
  },
  methods: {
  }
}
</script>

<style scoped>
h1 {
  margin-top: 70px;
}
</style>
