import api from '@/services/api'

export default {
  index () {
    return api().get('invoices')
  },
  invoice (invoiceId) {
    return api().get(`invoices/${invoiceId}`)
  },
  create (invoice) {
    return api().post('invoices', invoice)
  },
  put (invoice) {
    return api().put(`invoices/${invoice.id}`, invoice)
  }
}
