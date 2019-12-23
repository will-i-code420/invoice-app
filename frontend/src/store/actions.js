export default {
  setToken ({commit}, token) {
    commit('setToken', token)
  },
  setUser ({commit}, user) {
    commit('setUser', user)
  },
  setCompany({commit}, company) {
    commit('setCompany', company)
  },
  setBusinessList({commit}, list) {
    commit('setBusinessList', list)
  },
  setEmployeeList({commit}, list) {
    commit('setEmployeeList', list)
  },
  setInvoiceList({commit}, list) {
    commit('setInvoiceList', list)
  },
  logout({commit}) {
    commit('logout')
  }
}
