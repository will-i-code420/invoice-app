import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import('@/views/Dashboard.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/',
      name: 'home',
      component: () =>
        import('@/views/Home.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import('@/views/About.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/create',
      name: 'createInvoice',
      component: () =>
        import('@/components/invoice/CreateInvoice.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/invoices',
      name: 'viewInvoices',
      component: () =>
        import('@/components/invoice/ViewInvoice.vue'),
      meta: { transitionName: 'slide'}
    },
    {
      path: '/invoices/:id',
      name: 'singleInvoice',
      component: () =>
        import('@/components/invoice/SingleInvoice.vue'),
      meta: { transitionName: 'slide'}
    },
    {
      path: '/employee/:id',
      name: 'singleEmployee',
      component: () =>
        import('@/components/employee/SingleEmployee.vue'),
      meta: { transitionName: 'slide'}
    },
    {
      path: '/create-employee',
      name: 'addEmployee',
      component: () =>
        import('@/components/employee/AddEmployee.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/business/:id',
      name: 'singleBusiness',
      component: () =>
        import('@/components/business/SingleBusiness.vue'),
      meta: { transitionName: 'slide'}
    },
    {
      path: '/create-business',
      name: 'addBusiness',
      component: () =>
        import('@/components/business/AddBusiness.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/profile',
      name: 'profile',
      component: () =>
        import('@/views/Profile.vue'),
      meta: { transitionName: 'zoom'}
    }
  ]
})
