import * as types from '../mutations-type'
const manage = {
  state: {
    manage: {}
  },
  mutations: {
    // 设置权限组的id，以便操作
    [types.SET_MANAGE_ID](state, manage) {
      state.manage = manage
    }
  }
}
export default manage
