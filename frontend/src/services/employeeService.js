import api from '@/services/api'

export default {
  index() {
    return api().get('employee')
  },
  employee(employeeId) {
    return api().get(`employee/${employeeId}`)
  },
  create(employee) {
    return api().post('employee', employee)
  },
  put(employeeInfo) {
    return api().put(`employee/${employeeInfo.id}`, employeeInfo)
  }
}
