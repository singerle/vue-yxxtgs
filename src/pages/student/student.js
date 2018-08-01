// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from '@/router/routesStu'
import '@/common/stylus/index.styl'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import plugs from 'common/js/plugs'
import store from './store'
import VueClipboard from 'vue-clipboard2'
Vue.use(Vuex)
Vue.use(plugs)
Vue.use(MintUI)
Vue.use(vueAwesomeSwiper)
Vue.use(VueClipboard)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.query.userid) {
    store.commit('SetUserInfo', to.query)
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
