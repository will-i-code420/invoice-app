export default {
  setToken (state, token) {
    state.token = token
    if (token) {
      state.isLoggedIn = true
    } else {
      state.isLoggedIn = false
    }
  },
  setUser (state, user) {
    state.user = user
    if (user.admin === true) {
      state.isAdmin = true
    } else {
      state.isAdmin = false
    }
  },
  logout(state) {
    state.user = '',
    state.token = '',
    state.admin = '',
    state.isLoggedIn = ''
  }
}
