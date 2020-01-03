import Vue from 'vue'
import Router from 'vue-router'
import CreateInvoice from '@/components/invoice/CreateInvoice.vue'
import ViewInvoice from '@/components/invoice/ViewInvoice.vue'
import SingleInvoice from '@/components/invoice/SingleInvoice.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/main-dashboard',
      name: 'main-dashboard',
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
      path: '/invoice-dashboard',
      name: 'invoice-dashboard',
      component: () =>
        import('@/views/Invoice.vue'),
      meta: { transitionName: 'zoom'},
      children: [
        {
          path: 'create-invoice',
          name: 'create-invoice',
          component: CreateInvoice,
          meta: { transitionName: 'slide'}
        },
        {
          path: 'all-invoices',
          name: 'all-invoices',
          component: ViewInvoice,
          meta: { transitionName: 'slide'}
        },
        {
          path: 'invoice/:id',
          name: 'singleInvoice',
          component: SingleInvoice,
          meta: { transitionName: 'slide'}
        }
      ]
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
      path: '/settings-dashboard',
      name: 'setting-dashboard',
      component: () =>
        import('@/views/Setting.vue'),
      meta: { transitionName: 'zoom'}
    },
    {
      path: '/business-dashboard',
      name: 'business-dashboard',
      component: () =>
        import('@/views/Business.vue'),
      meta: { transitionName: 'zoom'}
    }
  ]
})
