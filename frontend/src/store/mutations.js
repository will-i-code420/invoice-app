export default {
  setToken (state, token) {
    state.token = window.$cookies.set('token', token)
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
    state.user = false,
    state.token = window.$cookies.keys().forEach(cookie => window.$cookies.remove(cookie)),
    state.admin = false,
    state.isLoggedIn = false
  }
}
