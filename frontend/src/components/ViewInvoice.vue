<template>
  <div class="view-inovices-container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h2 class="invoices">All Invoices:</h2>
          <hr>
          <div>
            <b-table bordered hover :items="invoices" :fields="fields">
              <template slot="view" slot-scope="{ item }">
                <b-button
                pill
                variant="outline-success"
                size="small"
                :to="{ name: 'singleInvoice', params: { invoice_id: item.id } }"
                >
                  View Invoice
                </b-button>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'viewInvoice',
  data () {
    return {
      invoices: [],
      fields: [
        { key: 'id', label: 'Invoice #' },
        { key: 'name' },
        {
          key: 'status',
          formatter: (value, key, item) => {
            if (item.paid === 0) {
              return "Unpaid"
            } else if (item.paid === item.total_price) {
              return "Paid"
            } else {
              return "Partial Payment"
            }
          }
        },
        { key: 'view' }
      ]
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
  created () {
    axios.get(`http://localhost:3128/invoice/${this.user.id}`,
    {
      headers: {"x-access-token": this.token}
    }).then(res => {
      if (res.data.status === true) {
        this.invoices = res.data.invoices
      }
    })
  }
}
</script>

<style scoped>
.invoices {
  padding-top: 65px;
}
</style>
