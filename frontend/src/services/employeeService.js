import api from '@/services/api'

export default {
  index(id) {
    return api().get(`employee/${id}`)
  },
  employee(id, employeeId) {
    return api().get(`employee/${id}/${employeeId}`)
  },
  create(employee) {
    return api().post('employee', employee)
  },
  put(employee) {
    return api().put(`invoices/${employee.id}`, employee)
  }
}
