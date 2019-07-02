<template>
  <div class="single-invoice">
    <NavHead
    :user="user"
    />
    <h1>Invoice Info:</h1>
    <hr>
    <div class="invoice-info">
      <div class="company_info">
      <h3 class="invoice-company">Bill To:</h3>
      <h4 class="invoice-company">{{ invoice.name }}</h4>
      <h4>Address</h4>
      <h4>City, State, Zip</h4>
      </div>
      <h3 class="invoice-id">Invoice # {{ invoice.id }}</h3>
    </div>
    <hr>
    <div class="invoice-details">
      <b-table bordered hover :items="transactions" :fields="fields">
      </b-table>
      <div class="total">
        <h4>Invoice Total: ${{ total_price }}</h4>
      </div>
      <hr class="balance">
      <div class="paid">
        <h4>Amount Paid: ${{ invoice.paid }}</h4>
      </div>
      <hr class="balance">
      <div class="due">
        <h4>Balance: ${{ balance_due }}</h4>
      </div>
      <hr class="balance">
    </div>
    <b-button pill variant="outline-success">Add Payment</b-button>
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
      invoice: {},
      transactions: [],
      total_price: '',
      balance_due: '',
      fields: [
        { key: 'item_id', label: 'Item #' },
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
    {
      headers: { "x-access-token": token }
    }).then(res => {
      if (res.data.status === true) {
        this.transactions = res.data.transactions
        this.invoice = res.data.invoice
        let total = 0
        this.transactions.forEach(item => {
          total += parseFloat(item.price * item.quantity)
        })
        total = total.toFixed(2)
        this.total_price = total
        let balance = 0
        balance = this.total_price - this.invoice.paid
        this.balance_due = balance.toFixed(2)
      }
    })
  }
}
</script>

<style scoped>
h1 {
  padding-top: 70px;
}
.invoice-info {
  display: flex;
  justify-content: space-between;
}
.invoice-info div:last-child {
  margin-left: auto;
}
.total, .paid, .due {
  text-align: right;
}
</style>
