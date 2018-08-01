import * as types from './mutation-types'
const teacher = {
  state: {
    userId: '',
    type: '',
    code: '',
    token: '',
    news: {}, // 设置新闻页
    search: '' // 设置跳转到那个页面去
  },
  mutations: {
    [types.SET_USERID](state, userId) {
      state.userId = userId
    },
    // 设置搜索的类型
    [types.SET_TYPE](state, type) {
      state.type = type
    },
    [types.SET_CODE](state, code) {
      state.code = code
    },
    [types.SET_SEARCH](state, search) {
      state.search = search
    },
    // 设置token
    [types.SET_TOKEN](state, token) {
      state.token = token
    },
    // 设置新闻页
    [types.SET_NEW](state, news) {
      state.news = news
    }
  }
}
export default teacher