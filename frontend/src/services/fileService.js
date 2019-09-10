import api from '@/services/api'

export default {
  upload(file) {
    return api().post('employeeFiles', file)
  }
};
