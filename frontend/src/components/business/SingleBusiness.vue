<template>
  <b-container fluid class="single-business">
    <b-row>
      <b-col>
        <div>
          <h1>Business</h1>
          <p>{{ business.business_name }}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
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
  },
  async created () {
    const businessId = this.$store.state.route.params.id
    await businessService.business(businessId).then(res => {
      if (res.data.status === true) {
        this.business = res.data.business
      }
    })
  }
}
</script>

<style scoped>
.single-business {
  margin-top: 70px;
}
</style>
