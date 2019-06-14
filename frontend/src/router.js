import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import SignUp from './views/SignUp.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
