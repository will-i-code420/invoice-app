import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/index.scss'
import VueCookies from 'vue-cookies'

import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'

import '@/plugins/echarts'

import commonComponents from './components/common'
commonComponents.forEach(component => {
  Vue.component(component.name, component)
})

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
