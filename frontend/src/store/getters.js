export default {
  getUser(state) {
    return state.user
  },
  getToken(state) {
    return state.token
  },
  getCompany(state) {
    return state.company
  },
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  isAdmin(state) {
    return state.isAdmin
  }
}
