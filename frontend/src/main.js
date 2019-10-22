import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'

import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'

import '@/plugins/echarts'

Vue.use(BootstrapVue)
Vue.use(VueCookies)

VueCookies.config('1d')
VueCookies.set('language','JavaScript')

sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
