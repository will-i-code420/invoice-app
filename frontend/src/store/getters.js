export default {
  getUser(state) {
    return state.user
  },
  getToken(state) {
    return state.token
  },
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  isAdmin(state) {
    return state.isAdmin
  }
}
