export default {
  setToken (state, token) {
    window.$cookies.set('token', token)
    state.token = window.$cookies.get('token')
    if (token) {
      state.isLoggedIn = true
    } else {
      state.isLoggedIn = false
    }
  },
  setUser (state, user) {
    state.user = user
    if (user.role === 'admin') {
      state.isAdmin = true
    } else {
      state.isAdmin = false
    }
  },
  setCompany (state, company) {
    state.company = company
  },
  setBusinessList (state, list) {
    state.businessList = list
  },
  setEmployeeList (state, list) {
    state.employeeList = list
  },
  setInvoiceList (state, list) {
    state.invoiceList = list
  },
  logout(state) {
    state.user = false,
    state.token = window.$cookies.keys().forEach(cookie => window.$cookies.remove(cookie)),
    state.admin = false,
    state.isLoggedIn = false
  }
}
