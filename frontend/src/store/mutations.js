export default {
  setToken (state) {
    state.token = this.$cookies.get(token)
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
    state.token = this.$cookies.remove(token),
    state.admin = false,
    state.isLoggedIn = false
  }
}
