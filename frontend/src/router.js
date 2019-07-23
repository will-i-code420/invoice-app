import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import SignIn from './views/SignIn.vue'
import About from './views/About.vue'
import Profile from './views/Profile.vue'
import SingleInvoice from './components/SingleInvoice.vue'
import SingleEmployee from './components/SingleEmployee.vue'


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
      name: 'signin',
      component: SignIn
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/invoice',
      name: 'singleInvoice',
      component: SingleInvoice
    },
    {
      path: '/employee',
      name: 'singleEmployee',
      component: SingleEmployee
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
