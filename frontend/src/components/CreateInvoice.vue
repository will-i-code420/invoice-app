<template>
  <div class="create-invoice-container">
    <b-container>
      <b-row>
        <b-col>
          <h2>Complete Details To Create Invoice</h2>
          <b-form @submit.prevent="onSubmit">
            <label for="invoice">Invoice Name:</label>
            <b-form-input
            v-model="invoice.name"
            type="text"
            required
            >
            </b-form-input>
            <label for="total">
              Invoice price: {{ invoice.total_price }}
            </label>
            <hr>
            <label for="transaction">Add Transaction</label>
            <b-button squared v-b-modal.modal-add-transaction>
              +
            </b-button>
            <b-modal
            id="modal-add-transaction"
            ref="modal"
            title="New Transaction"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >

            <form ref="form" @submit.stop.prevent="submitTransaction">

              <b-form-group
              :state="transState"
              label="Transaction:"
              label-for="transaction"
              invalid-feedback="Transaction required"
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
        <div class="transaction-details-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="txn in transactions">
                <tr :key="txn.id">
                  <th>{{ txn.id }}</th>
                  <td>{{ txn.name }}</td>
                  <td>{{ txn.price }}</td>
                  <td><b-button squared @click="deleteTransaction(txn.id)">
                    X
                  </b-button></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
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
        price: 0
      }
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
      this.transState = null

    },
    handleOk (byModalEvt) {
      byModalEvt.prevenDefault()
      this.submitTransaction
    },
    submitTransaction () {
      if (!this.checkFormValidity()) {
        return
      }
      this.transactions.push({
        id: this.nextTransId,
        name: this.trans.name,
        price: this.trans.price
      })
      this.nextTransId++
      this.calcTotal()
      this.trans.name = ''
      this.trans.price = ''
      this.transState = null
    },
    calcTotal () {
      let total = 0
      this.transactions.forEach(element => {
        total += parseInt(element.price)
      })
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
      let txn_prices = []
      this.transactions.forEach(element => {
        txn_names.push(element.name)
        txn_prices.push(element.price)
      })
      formData.append("name", this.invoice.name)
      formData.append("txn_names", txn_names)
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

<style>
</style>
