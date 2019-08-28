<template>
  <div class="create-invoice-container">
    <b-container>
      <b-row>
        <b-col>
          <h2 class="complete">Complete To Create Invoice</h2>
          <hr>
          <b-form @submit.prevent="submitInvoice">
            <label class="invoice" for="invoice">Invoice To:</label>
            <b-form-input
            v-model="invoice.name"
            type="text"
            placeholder="Company Or Individual Name"
            required
            >
            </b-form-input>
            <hr>
            <h3>Add New Item:</h3>
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
          <h2>Invoice Info:</h2>
          <div>
            <b-table bordered hover :items="transactions" :fields="fields">
              <template slot="modify" slot-scope="{ item }">
                <b-button squared @click="selectTrans(item)">
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
                <b-button squared @click="deleteTransaction(item.id)">
                  X
                </b-button>
              </template>
            </b-table>
          </div>
        </template>
        <hr>
        <label class="total" for="total">
          <h4>Invoice Total: ${{ invoice.total_due }}</h4>
        </label>
        <br>
        <label class="paid" for="paid">Amount Paid:</label>
        <b-form-input
        v-model="invoice.amount_paid"
        placeholder="ex. 0.00, leave blank if unpaid"
        >
        </b-form-input>
        <div class="create">
          <b-button pill variant="outline-success" type="submit">
            Create Invoice
          </b-button>
        </div>
        </b-form>
        </b-col>
      </b-row>
    </b-container>
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
        amount_paid: ''
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
    user() {
      return this.$store.getters.getUser
    },
    token() {
      return this.$store.getters.getToken
    }
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
    async submitInvoice () {
      this.loading = "Creating Invoice, please wait..."
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
        this.invoice.amount_paid = 0
      }
      formData.append("name", this.invoice.name)
      formData.append("item_id", item_id)
      formData.append("description", description)
      formData.append("quantity", quantity)
      formData.append("price", price)
      formData.append("amount_paid", this.invoice.amount_paid)
      formData.append("total_due", this.invoice.total_due)
      formData.append("UserId", this.user.id)
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

<style scoped>
.btn {
  margin: 0 30px;
}
.complete {
  padding-top: 85px;
}
.invoice {
  padding-top: 30px;
}
.total {
  padding-top: 15px;
}
.paid {
  padding-top: 20px;
}
.create {
  padding-top: 30px;
}
</style>
