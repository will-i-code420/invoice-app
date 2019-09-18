<template>
  <b-table bordered hover :items="business" :fields="fields">
    <template slot="view" slot-scope="{ item }">
      <b-button
      pill
      variant="outline-success"
      size="small"
      :to="{ name: 'singleBusiness', params: { id: item.id } }"
      >
      View Business
      </b-button>
    </template>
  </b-table>
</template>

<script>
import businessService from '@/services/businessService'

export default {
  name: 'all-business',
  data() {
    return {
      business: [],
      fields: [
        { key: 'business_name', label: 'Name' },
        { key: 'business_contact', label: 'Contact' },
        { key: 'business_phone', label: 'Phone #' },
        { key: 'business_email', label: 'Email' },
        { key: 'view' },
      ]
    }
  },
  async created () {
    try {
      await businessService.index().then(res => {
        if (res.data.status === true) {
          this.business = res.data.business
        }
      })
    } catch (err) {
      alert(err.response.data.error)
    }
  },
  methods: {
  },
}
</script>

<style scoped>
</style>
