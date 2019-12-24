<template>
  <div class="create-invoice-container">
    <h1 class="create-invoice-title" v-if="!this.invoice.is_quote">
      Creating Invoice
    </h1>
    <h1 class="create-invoice-title" v-else>
      Creating Quote
    </h1>
    <label class="price-quote-box">**Check Box If Price Quote Only**
      <input class="quote-checkbox" name="quotebox" type="checkbox" v-model="invoice.is_quote">
    </label>
    <hr>
    <form id="create-invoice-form" @submit.prevent="createInvoice">
      <label class="invoice" for="invoice">Invoice To:
      <input
      v-model="invoice.name"
      id="invoice-name"
      type="text"
      placeholder="Company Or Individual Name"
      aria-labelledby="Company Or Individual Being Invoiced"
      required
      >
      </label>
    <hr>
    <h3>Add Transaction:</h3>
      <b-button squared variant="success" v-b-modal.modal-add-transaction>
        +
      </b-button>
      <b-modal
      id="modal-add-transaction"
      ref="modal"
      title="New Item"
      ok-title="Add Item"
      ok-variant="success"
      cancel-variant="danger"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      >
      <form ref="form" @submit.stop.prevent="submitTransaction">
        <b-form-group
        :state="transState"
        label="Item Description:"
        label-for="transaction"
        invalid-feedback="Item required"
        >
        <b-form-input
        id="transaction"
        v-model="trans.description"
        :state="transState"
        required
        ></b-form-input>
        </b-form-group>
        <b-form-group
        :state="transState"
        label="Qty:"
        label-for="quantity"
        invalid-feedback="Item required"
        >
        <b-form-input
        id="quantity"
        v-model="trans.quantity"
        :state="transState"
        required
        ></b-form-input>
        </b-form-group>
        <b-form-group
        :state="transState"
        label="Price:"
        label-for="price"
        invalid-feedback="Price required"
        >
        <b-form-input
        id="price"
        v-model="trans.price"
        :state="transState"
        required
        ></b-form-input>
        </b-form-group>
      </form>
      </b-modal>
      <hr>
      <template>
        <h2>Transactions:</h2>
        <div>
          <b-table bordered hover :items="transactions" :fields="fields">
            <template v-slot:cell(modify)="data">
              <b-button squared @click="selectTrans(data.item)">
                Edit
              </b-button>
              <b-modal
              id="modal-edit-transaction"
              ref="modal"
              title="Edit Item:"
              ok-title="Edit Item"
              ok-variant="success"
              cancel-variant="danger"
              @ok="handleEdit"
              >
              <form ref="edit-form">
                <b-form-group
                :state="transState"
                label="Item Description:"
                label-for="transaction"
                invalid-feedback="Item required"
                >
                <b-form-input
                id="transaction"
                v-model="selectedTrans.description"
                :state="transState"
                required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                :state="transState"
                label="Qty:"
                label-for="quantity"
                invalid-feedback="Item required"
                >
                <b-form-input
                id="quantity"
                v-model="selectedTrans.quantity"
                :state="transState"
                required
                ></b-form-input>
              </b-form-group>
              <b-form-group
              :state="transState"
              label="Price:"
              label-for="price"
              invalid-feedback="Price required"
              >
              <b-form-input
              id="price"
              v-model="selectedTrans.price"
              :state="transState"
              required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
          <b-button squared @click="deleteTransaction(data.item.id)">
            X
          </b-button>
          </template>
          </b-table>
        </div>
        </template>
        <hr>
        <h4>Invoice Total: ${{ invoice.total_due }}</h4>
        <br>
        <div class="create-invoice-quote">
          <b-button v-if="!this.invoice.is_quote" pill variant="outline-success" type="submit">
            Create Invoice
          </b-button>
          <b-button v-else pill variant="outline-success" type="submit">
            Create Quote
          </b-button>
        </div>
        </form>
  </div>
</template>

<script>
import invoiceService from '@/services/invoiceService'

export default {
  name: 'create-invoice',
  data () {
    return {
      transState: null,
      invoice: {
        name: '',
        total_due: '',
        amount_paid: '',
        tax_amount: '',
        is_quote: false,
        due_date: ''
      },
      nextTransId: 1,
      transactions: [],
      loading: '',
      status: '',
      trans: {
        description: '',
        quantity: Number(),
        price: Number()
      },
      fields: [
        { key: 'item_id', label: 'Item #' },
        { key: 'description' },
        { key: 'quantity' },
        { key: 'price' },
        { key: 'modify', class: 'text-center' }
      ],
      selectedTrans: []
    }
  },
  computed: {
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.transState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.trans.description = ''
      this.trans.price = ''
      this.trans.quantity = ''
      this.transState = null
    },
    resetInvoice () {
      this.invoice.name = ''
      this.invoice.total_due = ''
      this.invoice.amount_paid = ''
      this.nextTransId = 1
      this.transactions = []
      this.transState = null
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.submitTransaction()
    },
    selectTrans (item) {
      this.selectedTrans = item
      this.$bvModal.show('modal-edit-transaction')
    },
    handleEdit () {
      this.editTransaction()
    },
    submitTransaction () {
      if (!this.checkFormValidity()) {
        return
      }
      this.transactions.push({
        item_id: this.nextTransId,
        description: this.trans.description,
        quantity: this.trans.quantity,
        price: this.trans.price
      })
      this.nextTransId++
      this.calcTotal()
      this.resetModal()
    },
    calcTotal () {
      let total = Number()
      this.transactions.forEach(item => {
        total += parseFloat(item.price * item.quantity)
      })
      this.invoice.total_due = total.toFixed(2)
    },
    editTransaction (id) {
      if (this.selectedTrans) {
        this.$delete(this.selectedTrans, '_rowVarient')
      }
      this.calcTotal()
      this.$set(id, '_rowVarient', 'primary')
      this.selectedTrans = id
    },
    deleteTransaction (id) {
      this.transactions = this.transactions.filter(item => {
        return item.id !== id
      })
      this.nextTransId--
      this.calcTotal()
    },
    calcDueDate() {
      let date = new Date()
      this.invoice.due_date = new Date(date.getFullYear(), date.getMonth(), date.getDate()+21)
    },
    async createInvoice () {
      this.loading = "Creating Invoice, please wait..."
      this.calcDueDate()
      let invoiceForm = {}
      const formData = new FormData()
      let item_id = []
      let description = []
      let quantity = []
      let price = []
      this.transactions.forEach(element => {
        item_id.push(element.item_id)
        description.push(element.description)
        quantity.push(element.quantity)
        price.push(element.price)
      })
      if (this.invoice.amount_paid === '') {
        this.invoice.amount_paid = 0.00
      }
      if (this.invoice.tax_amount === '') {
        this.invoice.tax_amount = 0.00
      }
      formData.append("name", this.invoice.name)
      formData.append("item_id", item_id)
      formData.append("description", description)
      formData.append("quantity", quantity)
      formData.append("price", price)
      formData.append("amount_paid", this.invoice.amount_paid)
      formData.append("total_due", this.invoice.total_due)
      formData.append("tax_amount", this.invoice.tax_amount)
      formData.append("is_quote", this.invoice.is_quote)
      formData.append("due_date", this.invoice.due_date)
      formData.append("invoiceId", this.$store.state.user.id)
      for (const [key, value] of formData.entries()) {
        invoiceForm[key] = value
      }
      await invoiceService.create(invoiceForm).then(res => {
        this.loading = ''
        if (res.data.status === true) {
          alert(res.data.message)
        }
      }).catch(err => {
        alert(err.response.data.error)
      })
      this.resetInvoice()
    }
  }
}
</script>
