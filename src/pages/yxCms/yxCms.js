// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/vuex/store/index'
import * as msg from './utils/message'
import loading from './utils/loading'
import './permission'
import './style/index.styl'

Vue.config.productionTip = false
// Vue.prototype.formCreate = formCreate
Vue.use(ElementUi)
// 自定义封装消息提示框
Object.keys(msg).forEach(key => {
  Vue.prototype[key] = msg[key]
})
Vue.prototype.loading = loading
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
