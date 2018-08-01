import * as types from '../mutations-type'
const statis = {
  state: {
    statis: {},
    index: '0',
    info:{},
    update: true
  },
  mutations: {
    // 设置权限组的id，以便操作
    [types.SET_STATIS_OPTIONS](state, options) {
      state.statis = options
    },
    // 设置数据统计二级菜单的选中的颜色
    [types.SET_INDEX](state, index) {
      state.index = index
    },
    // 设置查看
    [types.SET_INFO](state, info) {
      state.info = info
    },
    // 设置业务查询是否刷新
    [types.SET_UPDATE](state, bool) {
      state.update = bool
    }
  }
}
export default statis