<template>
  <div class="view-inovices-container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h2>All Invoices:</h2>
          <hr>
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Invoice Name</th>
                <th>Current Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="invoice in invoices">
                <tr>
                  <th>{{ invoice.id }}</th>
                  <td>{{ invoice.name }}</td>
                  <td v-if="invoice.paid === 0">Unpaid</td>
                  <td v-else>Paid</td>
                  <td>
                    <b-button pill variant="outline-warning" size="small" to="#">
                      View Invoice
                    </b-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
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
      invoices: [],
      user: this.$route.params.user
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

<style>
</style>
