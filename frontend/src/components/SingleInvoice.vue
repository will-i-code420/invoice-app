<template>
  <div class="single-invoice">
    <NavHead
    :user="user"
    />
    <div class="invoice">
      <b-table bordered hover :items="transactions" :fields="fields">
      </b-table>
    </div>
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
      user: '',
      invoice: {}
      transactions: [],
      total_price: '',
      fields: [
        { key: 'id' },
        { key: 'description' },
        { key: 'quantity' },
        { key: 'price' },
      ]
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    let token = localStorage.getItem('token')
    let invoice_id = this.$route.params.invoice_id
    axios.get(`http://localhost:3128/invoice/user/${this.user.id}/${invoice_id}`,
      headers: { "x-access-token": token }
    ).then(res => {
      if (res.data === true) {
        this.transactions = res.data.transactions
        this.invoice = res.data.invoice
        let total = 0
        this.transactions.forEach(item => {
          total += parseFloat(item.price * item.quantity)
        })
        total = total.toFixed(2)
        this.total_price = total
      }
    })
  }
}
</script>

<style scoped>
.invoice {
  padding-top: 65px;
}
</style>
