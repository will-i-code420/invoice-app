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
  logout({commit}) {
    commit('logout')
  }
}
