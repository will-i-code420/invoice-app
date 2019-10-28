import api from '@/services/api'

export default {
  put (companyInfo) {
    return api().put(`company/${companyInfo.id}`, companyInfo)
  }
}
