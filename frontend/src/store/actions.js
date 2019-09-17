export default {
  setToken ({commit}) {
    commit('setToken')
  },
  setUser ({commit}, user) {
    commit('setUser', user)
  },
  logout({commit}) {
    commit('logout')
  }
}
