import * as types from '../mutations-type'
const teacher = {
  state: {
    teacher: {}
  },
  mutations: {
    // 保存老师的一些信息
    [types.SET_TEACHER](state, teacher) {
      state.teacher = Object.assign(state.teacher,teacher)
    }
  }
}
export default teacher
