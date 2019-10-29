import api from '@/services/api'

export default {
  upload(file) {
    return api().post('employeeFiles', file)
  },
  logo(image) {
    return api().post('companyLogo', image)
  }
};
