import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import manage from './modules/manage'
import statis from './modules/statis'
import createLogger from 'vuex/dist/logger'
import yingxin from './modules/yingxin'
import news from './modules/news'
import teacher from './modules/teacher'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production' // 开发模式下开启严格模式，线上不开启
const store = new Vuex.Store({
  modules: {
    user,
    permission,
    manage,
    statis,
    yingxin,
    news,
    teacher
  },
  getters,
  plugins: debug ? [createLogger()] : []
})
export default store
