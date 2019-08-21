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
        import('@/views/Dashboard.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () =>
        import('@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import('@/views/About.vue')
    },
    {
      path: '/create',
      name: 'createInvoice',
      component: () =>
        import('@/components/CreateInvoice.vue')
    },
    {
      path: '/invoices',
      name: 'viewInvoices',
      component: () =>
        import('@/components/ViewInvoice.vue')
    },
    {
      path: '/invoices/:id',
      name: 'singleInvoice',
      component: () =>
        import('@/components/SingleInvoice.vue')
    },
    {
      path: '/employee/:id',
      name: 'singleEmployee',
      component: () =>
        import('@/components/SingleEmployee.vue')
    },
    {
      path: '/business/:id',
      name: 'singleBusiness',
      component: () =>
        import('@/components/SingleBusiness.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () =>
        import('@/views/Profile.vue')
    }
  ]
})
