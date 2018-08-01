import Vue from 'vue'
import Vuex from 'vuex'
import teacher from './teacher'
import getters from './getters'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production' // 开发模式下开启严格模式，线上不开启
const store = new Vuex.Store({
  modules: {
    teacher
  },
  getters,
  plugins: debug ? [createLogger()] : []
})
export default store