import api from '@/services/api'

export default {
  index () {
    return api().get('register/${this.user.id}')
  },
  invoice () {
    return api().get('register/${this.user.id}/${invoice_id}')
  }
}
