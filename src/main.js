import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui'
import store from './store'
import request from 'utils/request'
import db from 'utils/localstorage'
import VueApexCharts from 'vue-apexcharts'

import 'ant-design-vue/dist/antd.css'
import 'element-ui/lib/theme-chalk/index.css'

import 'utils/install'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ElementUI)
Vue.use(db)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use({
  install (Vue) {
    Vue.prototype.$db = db
  }
})

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$export = request.export
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload
// Vue.prototype.$baseURL=request.baseURL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})