<template>
  <div class="single-invoice">
    <div id="whole-invoice">
    <h1>Invoice #{{ invoice.id }}:</h1>
    <div class="invoice-dates">
      <h5 class="created">Created On: {{ create_date }}</h5>
      <h5 class="updated">Last Payment On: {{ update_date }}</h5>
    </div>
    <h5 class="next-payment">Next Payment Due: {{ payment_due }}</h5>
    <hr>
    <div class="invoice-info">
      <div class="company_info">
      <h3 class="invoice-company">Bill To:</h3>
      <h4 class="invoice-company">Attn: {{ invoice.name }}</h4>
      <h4>Phone, Email</h4>
      <h4>Company Name</h4>
      <h4>Address</h4>
      <h4>City, State, Zip</h4>
      </div>
      <div>
      <h3>Bill From:</h3>
      <h4>{{ user.company_name }}</h4>
      <h4>{{ user.name }}</h4>
      <h4>{{ user.phone }} | {{ user.email }}</h4>
      <h4>{{ user.company_address }}</h4>
      <h4>{{ user.company_city }}, {{ user.company_state }}, {{ user.company_zip }}</h4>
      </div>
    </div>
    <div class="invoice-details">
      <b-table bordered hover :items="transactions" :fields="fields">
      </b-table>
      <div class="total">
        <h4>Invoice Total: ${{ invoice.total_due }}</h4>
      </div>
      <hr class="balance">
      <div class="paid">
        <h4>Amount Paid: ${{ invoice.amount_paid }}</h4>
      </div>
      <hr class="balance">
      <div class="due">
        <h4>Balance: ${{ balance_due }}</h4>
      </div>
      <hr class="balance">
    </div>
    </div>
    <b-form>
      <label class="payment" for="payment">Add Payment:</label>
      <b-form-input
      v-model="paid"
      type="text"
      required
      >
      </b-form-input>
    <b-button pill variant="outline-success" @click="addPayment">Apply Payment</b-button>
    </b-form>
      <b-button pill variant="outline-success" @click="createPdf">Create PDF</b-button>
  </div>
</template>

<script>
import invoiceService from '@/services/invoiceService'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'singleInvoice',
  data () {
    return {
      invoice: {},
      transactions: [],
      balance_due: '',
      payment_due: '',
      create_date: '',
      update_date: '',
      paid: '',
      status: '',
      loading: '',
      fields: [
        { key: 'item_id', label: 'Item #' },
        { key: 'description' },
        { key: 'quantity' },
        { key: 'price' },
      ],
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
  async created () {
    try {
      let balance
      const id = this.$store.state.user.id
      const invoiceId = this.$store.state.route.params.id
      await invoiceService.invoice(id, invoiceId).then(res => {
        this.invoice = res.data.invoice
      })
      balance = this.invoice.total_due - this.invoice.amount_paid
      this.balance_due = balance.toFixed(2)
      this.splitTransactions()
      this.dateConvert()
      this.paymentDue()
    } catch (err) {
      alert(err)
    }
  },
  methods: {
    async addPayment() {
      let balance
      let payment = Number(this.invoice.amount_paid) + Number(this.paid)
      this.invoice.amount_paid = payment
      this.status = "Updating Invoice"
      this.paid = ''
      await invoiceService.put(this.invoice).then(res => {
        if (res.data.status === true) {
          this.status = ""
          this.invoice = res.data.invoice
          alert(res.data.message)
        } else {
          this.status = ""
          alert(res.data.error)
        }
        balance = this.invoice.total_due - this.invoice.amount_paid
        this.balance_due = balance.toFixed(2)
      })
      this.paymentDue()
    },
    paymentDue() {
      let date
      if (!this.invoice.updatedAt) {
        date = new Date(this.invoice.createdAt)
      } else {
        date = new Date(this.invoice.updatedAt)
      }
      if (this.invoice.total_due === this.invoice.amount_paid) {
        this.payment_due = "PAID IN FULL"
      } else {
        let dueDate
        dueDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+21)
        this.payment_due = dueDate.toDateString()
      }
    },
    dateConvert() {
      let create = new Date(this.invoice.createdAt)
      this.create_date = create.toDateString()
      let update = new Date(this.invoice.updatedAt)
      this.update_date = update.toDateString()
    },
    createPdf() {
      const filename = `${this.invoice.name}_Invoice.pdf`
      const element = document.getElementById("whole-invoice")
      window.scrollTo(0, 0)
      html2canvas(element).then(canvas => {
        const img = canvas.toDataURL("image/png")
        window.open(img)
        const doc = new jsPDF('p', 'in', 'letter')
        doc.addImage(img, 'PNG', 0, 0, 8.5, 11)
        doc.save(filename)
      })
    },
    splitTransactions() {
      const transactionList = this.invoice.transactionId
      let tempTransactions
      if (transactionList[0].item_id.length === 1) {
        return this.transactions = transactionList
      } else {
        Object.keys(transactionList[0]).forEach(key => {
          transactionList[0][key].forEach((value, index) => {
            if (!tempTransactions[index]) {
              tempTransactions[index] = {}
            }
            tempTransactions[index][key] = value
          })
        })
        this.transactions = tempTransactions
      }
    }
  },
  watch: {
    invoice: {
      handler() {
        this.dateConvert()
      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin-top: 70px;
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
.invoice-dates {
  display: flex;
  justify-content: space-between;
}
</style>
