<template>
  <div class="single-invoice">
    <NavHead
    :user="user"
    />
    <b-table bordered hover :items="transactions" :fields="fields">
    </b-table>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'
import axios from 'axios'

export default {
  name: 'singleInvoice',
  components: {
    NavHead
  },
  data () {
    return {
      user: this.$route.params.user,
      transactions: [],
      fields: [
        { key: 'id' },
        { key: 'description' },
        { key: 'quantity' },
        { key: 'price' },
      ]
    }
  },
  mounted () {
    axios.get(`http://localhost:3128/invoice/user/${this.user.id}/${this.invoice_id}`).then(res => {
      if (res.data === true) {
        this.transactions = res.data.transactions
      }
    })
  }
}
</script>

<style>
</style>
