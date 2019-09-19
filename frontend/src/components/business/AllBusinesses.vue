<template>
  <b-table bordered hover :items="business" :fields="fields">
    <template slot="view" slot-scope="{ item }">
      <b-button
      pill
      variant="outline-success"
      size="small"
      :to="{ name: 'singleBusiness', params: { id: item.id } }"
      >
      View Details
      </b-button>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'all-business',
  props: {
    business: Array
  },
  data() {
    return {
      fields: [
        { key: 'business_name', label: 'Name' },
        { key: 'business_contact', label: 'Contact' },
        { key: 'business_phone', label: 'Phone #' },
        { key: 'business_email', label: 'Email' },
        { key: 'view' },
      ]
    }
  }
}
</script>

<style scoped>
</style>
