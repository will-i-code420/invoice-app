import api from '@/services/api'

export default {
  index() {
    return api().get('business')
  },
  business(businessId) {
    return api().get(`business/${businessId}`)
  },
  create(business) {
    return api().post('business', business)
  },
  put(business) {
    return api().put(`business/${business.id}`, business)
  },
  destroy(businessId) {
    return api().delete(`business/${businessId}`)
  }
}
