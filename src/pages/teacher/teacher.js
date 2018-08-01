// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from '@/router/teacher'
import 'common/stylus/teacher.styl'
import * as prop from './utils/yxxt-mint'
import store from './store'

import './permission.js'

Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false

// 设置全局函数
Object.keys(prop).forEach(key => {
  Vue.prototype[key] = prop[key]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
