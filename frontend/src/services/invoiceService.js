import api from '@/services/api'

export default {
  index (id) {
    return api().get(`invoices/${id}`)
  },
  invoice (id, invoiceId) {
    return api().get(`invoices/${id}/${invoiceId}`)
  },
  create (invoice) {
    return api().post('invoices', invoice)
  }
}
