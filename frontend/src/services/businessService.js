import api from '@/services/api'

export default {
  index(id) {
    return api().get(`business/${id}`)
  }
}
