import api from '@/services/api'

export default {
  index (id) {
    return api().get(`invoices/${id}`)
  },
  invoice () {
    return api().get(`invoices/${this.user.id}/${this.invoice_id}`)
  },
  create (invoice) {
    return api().post('invoices', invoice)
  }
}
