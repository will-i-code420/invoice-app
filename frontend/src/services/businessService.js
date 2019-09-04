import api from '@/services/api'

export default {
  index(id) {
    return api().get(`business/${id}`)
  },
  business(id, businessId) {
    return api().get(`business/${id}/${businessId}`)
  },
  create(business) {
    return api().post('business', business)
  },
  put(business) {
    return api().put(`business/${business.id}`, business)
  }
}
