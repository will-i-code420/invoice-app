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
  put(employee) {
    return api().put(`employee/${employee.id}`, employee)
  }
}
