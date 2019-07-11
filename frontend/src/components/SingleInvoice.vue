<template>
  <div class="single-invoice">
    <NavHead
    :user="user"
    />
    <h1>Invoice #{{ invoice.id }} Info:</h1>
    <hr>
    <div class="invoice-info">
      <div class="company_info">
      <h3 class="invoice-company">Bill To:</h3>
      <h4 class="invoice-company">Attn: {{ invoice.name }}</h4>
      <h4>Address</h4>
      <h4>City, State, Zip</h4>
      </div>
      <div>
      <h3>Bill From:</h3>
      <h4>{{ user.company_name }}</h4>
      <h4>{{ user.company_address }}</h4>
      <h4>{{ user.company_city }}, {{ user.company_state }}, {{ user.company_zip }}</h4>
      <h4>{{ user.name }}</h4>
      <h4>{{ user.phone }}</h4>
      </div>
    </div>
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
    <b-form>
      <label class="payment" for="payment">Add Payment</label>
      <b-form-input
      v-model="paid"
      type="text"
      required
      >
      </b-form-input>
    <b-button pill variant="outline-success" @click="newBalance">Apply Payment</b-button>
    {{ status }}
    </b-form>
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
      paid: '',
      status: '',
      fields: [
        { key: 'item_id', label: 'Item #' },
        { key: 'description' },
        { key: 'quantity' },
        { key: 'price' },
      ]
    }
  },
  computed: {
  },
  created () {
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
        this.total_price = total.toFixed(2)
        let balance = 0
        balance = this.total_price - this.invoice.paid
        this.balance_due = balance.toFixed(2)
      }
    })
  },
  methods: {
    addPayment() {
      this.status = "Updating Invoice"
      axios.patch(`http://localhost:3128/invoice`, this.invoice,
      {
        headers: {"x-access-token": localStorage.getItem("token")}
      }).then(res => {
        if (res.data.message === true) {
          this.status = res.data.message
        } else {
          this.status = res.data.message
        }
      })
      
    },
    newBalance() {
      let payment = Number(this.paid)
      let invoicePaid = Number(this.invoice.paid)
      this.invoice.paid = Number(invoicePaid) + Number(payment)
      let balance = this.total_price - this.invoice.paid
      this.balance_due = balance.toFixed(2)
      this.addPayment()
      this.paid = ''
    }
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
.btn {
  margin-top: 20px;
}
</style>
