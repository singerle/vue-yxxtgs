import * as types from '../mutations-type'
const news = {
  state: {
    newsid: ''
  },
  mutations: {
    // 设置权限组的id，以便操作
    [types.SET_NEWS_ID](state, id) {
      state.newsid = id
    }
  }
}
export default news