import api from '@/services/api'

export default {
  index(id) {
    return api().get(`employee/${id}`)
  }
}
