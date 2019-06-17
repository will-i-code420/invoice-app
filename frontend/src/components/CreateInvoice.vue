<template>
  <div class="create-invoice-container">
    <b-container>
      <b-row>
        <b-col>
          <h2>Complete Details To Create Invoice</h2>
          <b-form @submit.prevent="onSubmit">
            <label for="invoice">Invoice To:</label>
            <b-form-input
            v-model="invoice.name"
            type="text"
            required
            >
            </b-form-input>
            <label for="total">
              Invoice Total: ${{ invoice.total_price }}
            </label>
            <hr>
            <h3>Add New Item:</h3>
            <b-button squared v-b-modal.modal-add-transaction>
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
              v-model="trans.name"
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
              <template slot="modify">
                <b-button squared @click="editTransaction(txn.id)">
                  Edit
                </b-button>
                <b-button squared @click="deleteTransaction(txn.id)">
                  X
                </b-button>
              </template>
            </b-table>

          </div>
        </template>
        <div class="create-invoice">
          <b-button pill variant="outline-success" @click="onSubmit">
            Create Invoice
          </b-button>
          {{ loading }}
          {{ status }}
        </div>
        </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      transState: null,
      invoice: {
        name: '',
        total_price: 0
      },
      nextTransId: 1,
      transactions: [],
      loading: '',
      status: '',
      trans: {
        name: '',
        quantity: 0,
        price: 0
      },
      fields: [
        { key: 'id' },
        { key: 'name' },
        { key: 'quantity' },
        { key: 'price' },
        { key: 'modify', class: 'text-center' }
      ]
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.transState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.trans.name = ''
      this.trans.price = ''
      this.trans.quantity = ''
      this.transState = null

    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.submitTransaction()
    },
    submitTransaction () {
      if (!this.checkFormValidity()) {
        return
      }
      this.transactions.push({
        id: this.nextTransId,
        name: this.trans.name,
        quantity: this.trans.quantity,
        price: this.trans.price
      })
      this.nextTransId++
      this.calcTotal()
      this.resetModal()
    },
    calcTotal () {
      let total = 0
      this.transactions.forEach(element => {
        total += parseFloat(element.price * element.quantity)
      })
      total = total.toFixed(2)
      this.invoice.total_price = total
    },
    deleteTransaction (id) {
      let newList = this.transactions.filter(function(el) {
        return el.id != id
      })
      this.nextTransId--
      this.transactions = newList
      this.calcTotal()
    },
    onSubmit () {
      const formData = new formData()
      let txn_names = []
      let txn_quantity = []
      let txn_prices = []
      this.transactions.forEach(element => {
        txn_names.push(element.name)
        txn_quantity.push(element.quantity)
        txn_prices.push(element.price)
      })
      formData.append("name", this.invoice.name)
      formData.append("txn_names", txn_names)
      formData.append("txn_quantity", txn_quantity)
      formData.append("txn_prices", txn_prices)
      formData.append("user_id", this.$route.params.user.id)
      this.loading = "Creating Invoice, please wait..."

      axios.post("http://localhost:3128/invoice", formData).then(res => {
        this.loading = ''
        if (res.data.status === true) {
          this.status = res.data.message
        } else {
          this.status = res.data.message
        }
      })
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 0 30px;
}
</style>
