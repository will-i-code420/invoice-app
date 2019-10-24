<template>
  <b-table bordered hover :items="business" :fields="fields">
    <template v-slot:cell(actions)="data">
      <b-button
      pill
      variant="outline-success"
      size="small"
      :to="{ name: 'singleBusiness', params: { id: data.item.id } }"
      >
      View Details
      </b-button>
      <b-button
      pill
      variant="outline-success"
      size="small"
      @click="deleteBusiness(data.item.id)"
      >
      Delete
      </b-button>
    </template>
  </b-table>
</template>

<script>
import businessService from '@/services/businessService'

export default {
  name: 'all-business',
  props: {
    business: Array,
    getBusinessRolodex: Function
  },
  data() {
    return {
      fields: [
        { key: 'business_name', label: 'Name' },
        { key: 'business_contact', label: 'Contact' },
        { key: 'business_phone', label: 'Phone #' },
        { key: 'business_email', label: 'Email' },
        { key: 'actions' },
      ]
    }
  },
  methods: {
    async deleteBusiness(businessId) {
      try {
        console.log(businessId)
        await businessService.destroy(businessId).then(res => {
          if(res.data.status === true) {
            this.getBusinessRolodex()
            alert(res.data.message)
          }
        })
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 0 5px;
}
</style>
