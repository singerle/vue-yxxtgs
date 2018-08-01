// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/count'
import store from '@/vuex/count'
import '@/common/stylus/index.styl'
import echarts from 'echarts'
import MintUI from 'mint-ui'
import plugs from 'common/js/plugs'
//引入echart
import 'mint-ui/lib/style.css'
Vue.use(require('vue-wechat-title'))
Vue.use(MintUI)
Vue.use(plugs)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
