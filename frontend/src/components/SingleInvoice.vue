<template>
  <div class="single-invoice">
    <NavHead
    :user="user"
    />
    <div id="whole-invoice">
    <h1>Invoice #{{ invoice.id }} :</h1>
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
      <h4>{{ user.phone }}, {{ user.email }}</h4>
      <h4>{{ user.company_address }}</h4>
      <h4>{{ user.company_city }}, {{ user.company_state }}, {{ user.company_zip }}</h4>
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
        <h4>Amount Paid: ${{ amount_paid }}</h4>
      </div>
      <hr class="balance">
      <div class="due">
        <h4>Balance: ${{ balance_due }}</h4>
      </div>
      <hr class="balance">
    </div>
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
    <div class="email-invoice">
      <b-form>
        <label class="recipient" for="recipient">Send Invoice To:</label>
        <b-form-input
        v-model="recipient.name"
        type="text"
        required
        >
        </b-form-input>
        <label class="recipientEmail" for="recipientEmail">Email Address:</label>
        <b-form-input
        v-model="recipient.email"
        type="email"
        required
        >
        </b-form-input>
        <b-button pill variant="outline-success" @click="sendInvoice">Email Invoice</b-button>
        {{ loading }}
        {{ status }}
      </b-form>
      <b-button pill variant="outline-success" @click="createPdf">Create PDF</b-button>
    </div>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead.vue'
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
      amount_paid: '',
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
      recipient: {
        name: '',
        email: ''
      }
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
        let amount = 0
        amount = this.invoice.paid
        this.amount_paid = amount.toFixed(2)
        this.dateConvert()
        this.paymentDue()
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
      this.updatedDate()
      this.paymentDue()
    },
    newBalance() {
      let payment = Number(this.paid)
      let invoicePaid = Number(this.invoice.paid)
      this.invoice.paid = Number(invoicePaid) + Number(payment)
      let amount = this.invoice.paid
      this.amount_paid = amount.toFixed(2)
      let balance = this.total_price - this.invoice.paid
      this.balance_due = balance.toFixed(2)
      this.paid = ''
      this.addPayment()
    },
    paymentDue() {
      let date
      if (!this.invoice.updated) {
        date = new Date(this.invoice.created)
      } else {
        date = new Date(this.invoice.updated)
      }
      if (this.total_price === this.amount_paid) {
        this.payment_due = "PAID IN FULL"
      } else {
        let dueDate
        dueDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+21)
        this.payment_due = dueDate.toDateString()
      }
      this.status= ''
    },
    dateConvert() {
      let create
      if (this.invoice.created) {
        create = new Date(this.invoice.created)
        this.create_date = create.toDateString()
      } else {
        create = ''
        this.create_date = create
      }
      let update
      if (this.invoice.updated) {
        update = new Date(this.invoice.updated)
        this.update_date = update.toDateString()
      } else {
        update = ''
        this.update_date = update
      }
    },
    updatedDate() {
      let invoice_id = this.$route.params.invoice_id
      axios.get(`http://localhost:3128/invoice/user/${this.user.id}/${invoice_id}`,
        {
          headers: {"x-access-token": localStorage.getItem("token")}
      }).then(res => {
        if (res.data.status === true) {
          this.invoice = res.data.invoice
        }
      })
    },
    sendInvoice() {
      this.loading = 'Emailing Invoice, please wait...'
      const formData = new FormData()
      formData.append("user", JSON.stringify(this.user))
      formData.append("recipient", JSON.stringify(this.recipient))
      axios.post("http://localhost:3128/sendmail", formData,
      {
        headers: {"x-access-token": localStorage.getItem("token")}
      }).then(res => {
        this.loading = ''
        this.status = res.data.message
      })
      this.recipient.name = ''
      this.recipient.email = ''
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
