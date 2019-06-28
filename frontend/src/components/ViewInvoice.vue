<template>
  <div class="view-inovices-container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h2 class="invoices">All Invoices:</h2>
          <hr>
          <div>
            <b-table striped hover :items="invoices" :fields="fields">
              <template slot="view">
                <b-button
                pill
                variant="outline-success"
                size="small"
                to="{ name: 'singleInvoice', params: { invoice_id: invoice.id }}"
                append
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
      user: this.$route.params.user,
      fields: [
        { key: 'id' },
        { key: 'name' },
        {
          key: 'status',
          formatter: (value, key, item) => {
            if (item.paid === 0) {
              return "Unpaid"
            } else if (item.paid === item.total) {
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
  mounted () {
    axios.get(`http://localhost:3128/invoice/user/${this.user.id}`).then(res => {
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
