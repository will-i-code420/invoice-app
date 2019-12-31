<template>
  <div class="create-invoice-container">
    <NavHead/>
    <h1 class="create-invoice-title" v-if="!this.invoice.is_quote">
      Creating Invoice
    </h1>
    <h1 class="create-invoice-title" v-else>
      Creating Quote
    </h1>
    <label class="price-quote-box" for="if-price-quote">**Check Box If Price Quote Only**
      <input class="quote-checkbox" id="if-price-quote" name="quotebox" type="checkbox" v-model="invoice.is_quote" aria-labelledby="Checkbox for quote or invoice">
    </label>
    <hr class="create-invoice-hr">
    <form id="create-invoice-form" @submit.prevent="createInvoice">
      <label class="invoice-label" for="invoice-name">
        Invoice To:
      </label>
      <input
      v-model="invoice.name"
      id="invoice-name"
      type="text"
      title="Company Or Individual Name"
      aria-labelledby="Company Or Individual Being Invoiced"
      required
      >
    <hr class="create-invoice-hr">
      <h3>Add Transaction(s):</h3>
        <button class="add-trans-button" type="button" @click="toggleTransModal">
          &plus;
        </button>
        <transition name="modal-fade">
        <Modal v-show="isTransModalOpen">
        <template #header>
          <h1 @keydown.esc="toggleTransModal">Add New Item(s)</h1>
        </template>
        <template #body>
          <form id="transaction-form" @keydown.esc="toggleTransModal">
            <label for="description">Description:</label>
            <input
            v-model="trans.description"
            id="description"
            type="text"
            aria-labelledby="Transaction Description"
            required
            @keydown.shift.tab.prevent
            >
            <label for="quantity">Qty:</label>
            <input
            v-model.number="trans.quantity"
            id="quantity"
            type="number"
            aria-labelledby="Quantity Of Transaction"
            required
            >
            <label for="price">Price:</label>
            <input
            v-model.number="trans.price"
            id="price"
            type="number"
            aria-labelledby="Price Per Unit"
            required
            @keydown.enter="submitTransaction"
            >
          </form>
        </template>
        <template #footer>
          <button class="submit-trans" type="button" @click="submitTransaction" @keydown.esc="toggleTransModal" @keydown.enter="submitTransaction">
            Add Item
          </button>
          <button class="cancel-trans" type="button" @click="toggleTransModal" @keydown.esc="toggleTransModal" @keydown.tab.exact.prevent>
            Cancel
          </button>
        </template>
        </Modal>
        </transition>
      <hr class="create-invoice-hr">
      <template>
        <section class="transaction-table-container">
          <h2 class="transactions-title">Transactions:</h2>
          <b-table bordered hover :items="transactions" :fields="fields">
            <template v-slot:cell(modify)="data">
              <button class="edit-trans-btn" aria-labelledby="Edit Transaction Button" title="Edit Transaction" @click="selectTransaction(data.item)">
                &#9998;
              </button>
            <transition name="modal-fade">
              <Modal v-show="isEditModalOpen">
                <template #header>
                  <h1>Editing: {{ selectedTrans.description }}</h1>
                </template>
                <template #body>
                  <form id="edit-transaction-form" @keydown.esc="toggleEditModal">
                    <label for="description">Description:</label>
                    <input
                    v-model="selectedTrans.description"
                    id="description"
                    type="text"
                    aria-labelledby="Transaction Description"
                    required
                    @keydown.shift.tab.prevent
                    >
                    <label for="quantity">Qty:</label>
                    <input
                    v-model.number="selectedTrans.quantity"
                    id="quantity"
                    type="number"
                    aria-labelledby="Quantity Of Transaction"
                    required
                    >
                    <label for="price">Price:</label>
                    <input
                    v-model.number="selectedTrans.price"
                    id="price"
                    type="number"
                    aria-labelledby="Price Per Unit"
                    required
                    @keydown.enter="editTransaction"
                    >
                  </form>
                </template>
                <template #footer>
                  <button class="edit-trans" type="button" @click="editTransaction" @keydown.esc="toggleEditModal" @keydown.enter="editTransaction">
                    Edit Item
                  </button>
                  <button class="cancel-edit" aria-labelledby="Delete Transaction Button" type="button" @click="toggleEditModal" @keydown.esc="toggleEditModal" @keydown.tab.exact.prevent>
                    Cancel
                  </button>
                </template>
              </Modal>
            </transition>
          <button title="Delete Item" class="delete-trans-btn" @click="deleteTransaction(data.item.id)">
            &#10008;
          </button>
          </template>
          </b-table>
        </section>
        </template>
        <hr class="create-invoice-hr">
        <section class="invoice-total-container">
          <label class="tax-amount-box" for="if-tax-charged">**Check Box If Tax Required**
            <input class="tax-checkbox" id="if-tax-charged" name="taxbox" type="checkbox" v-model="isTaxed" aria-labelledby="Checkbox if state taxes to be charged">
          </label>
          <br>
          <select v-if="isTaxed" class="tax-selection-list" name="tax-selection" v-model="invoice.tax_rate">
            <option disabled value="">Select City For Taxes</option>
            <option v-for="tax in taxes" :key="tax.id" :value="tax.rate">{{tax.city}} - {{tax.rate}}</option>
          </select>
          <h4 class="invoice-subtotal">Sub-Total: ${{ invoice.subtotal_due }}</h4>
          <h4 v-if="isTaxed" class="invoice-tax">State Tax: ${{ invoice.tax_due }}</h4>
          <h4 class="invoice-total">Invoice Total: ${{ invoice.total_due }}</h4>
          <br>
        </section>
        <div class="add-payment-container">
          <label class="add-payment-label" for="add-payment">Apply Payment:</label>
          <input
          v-model.number="invoice.amount_paid"
          type="number"
          id="add-payment"
          aria-labelledby="Upfront Payment Received"
          >
        </div>
        <div class="create-invoice-quote">
          <button class="invoice-create-button" v-if="!this.invoice.is_quote" type="submit">
            Create Invoice
          </button>
          <button class="invoice-create-button" v-else type="submit">
            Create Quote
          </button>
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
      isTransModalOpen: false,
      isEditModalOpen: false,
      isTaxed: false,
      taxes: [
        {
          id: 1,
          city: 'Tucson',
          rate: 2.5
        },
        {
          id: 2,
          city: 'Nogales',
          rate: 3.3
        },
        {
          id: 3,
          city: 'Marana',
          rate: 5.4
        },
      ],
      invoice: {
        name: '',
        subtotal_due: Number(),
        total_due: Number(),
        amount_paid: Number(),
        tax_due: Number(),
        tax_rate: Number(),
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
      selectedTrans: {}
    }
  },
  computed: {
  },
  methods: {
    toggleTransModal() {
      this.isTransModalOpen = !this.isTransModalOpen
    },
    toggleEditModal() {
      this.isEditModalOpen = !this.isEditModalOpen
    },
    resetTransModal() {
      this.trans.description = ''
      this.trans.price = ''
      this.trans.quantity = ''
      this.transState = null
    },
    resetEditModal() {
      this.selectedTrans.description = ''
      this.selectedTrans.price = ''
      this.selectedTrans.quantity = ''
      this.transState = null
    },
    checkFormValidity() {
      if (this.trans.description == '' || this.trans.quantity == 0 || this.trans.quantity == 0) {
        return false
      } else {
        return true
      }
    },
    resetInvoice () {
      this.invoice.name = ''
      this.invoice.total_due = ''
      this.invoice.amount_paid = ''
      this.nextTransId = 1
      this.transactions = []
      this.transState = null
    },
    selectTransaction (item) {
      this.selectedTrans = item
      console.log(this.selectedTrans)
      this.toggleEditModal()
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
      this.resetTransModal()
      this.calcSubTotal()
    },
    calcSubTotal () {
      let total = Number()
      this.transactions.forEach(item => {
        total += parseFloat(item.price * item.quantity)
      })
      this.invoice.subtotal_due = total.toFixed(2)
      if (this.invoice.tax_rate != '') {
        this.calcTax()
      }
      this.calcTotal()
    },
    calcTax() {
      let taxRate = (this.invoice.tax_rate / 100) * this.invoice.subtotal_due
      this.invoice.tax_due = taxRate.toFixed(2)
      this.calcTotal()
    },
    calcTotal() {
      let total = Number(this.invoice.subtotal_due) + Number(this.invoice.tax_due)
      this.invoice.total_due = total.toFixed(2)
    },
    applyPayment() {
      let newTotal = Number(this.invoice.total_due) - Number(this.invoice.amount_paid)
      this.invoice.total_due = newTotal.toFixed(2)
    },
    editTransaction (id) {
      if (this.selectedTrans) {
        this.$delete(this.selectedTrans, '_rowVarient')
      }
      this.calcSubTotal()
      this.$set(id, '_rowVarient', 'primary')
      this.selectedTrans = id
      this.resetEditModal()
    },
    deleteTransaction (id) {
      this.transactions = this.transactions.filter(item => {
        return item.id !== id
      })
      this.nextTransId--
      this.calcSubTotal()
    },
    calcDueDate() {
      if (!this.invoice.is_quote) {
        return
      }
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
      formData.append("subtotal_due", this.invoice.subtotal_due)
      formData.append("total_due", this.invoice.total_due)
      formData.append("tax_amount", this.invoice.tax_amount)
      formData.append("tax_rate", this.invoice.tax_rate)
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
  },
  watch: {
    'invoice.tax_rate': function() {
      this.calcTax()
    },
    isTaxed: function() {
      if (!this.isTaxed) {
        this.invoice.tax_rate = 0
        this.calcTax()
      }
    },
    'invoice.amount_paid': function() {
      this.applyPayment()
    }
  }
}
</script>
