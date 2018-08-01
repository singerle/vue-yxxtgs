const yingxin = {
  state: {
    // 迎新流程 入学配置 应用管理 点击编辑按钮 用于存储该栏应用的所有内容
    appItem: '',
    authGroupName: '',
    // 当迎新流程有编辑按钮时，processItem用于存储编辑页面的回显内容
    processItem: '',
    // 迎新配置点击教师配置 存储该栏的所有数据
    teacherItem: '',
    // 点击入学配置，现场配置，查看入学配置，查看现场配置的时候会把整个流程的信息存储到ruxueItem
    ruxueItem: '',
    // 此状态用来标记是否是 查看入学配置
    // ruxueState: '',
    // 该状态默认值为''，点击入学配置状态为1，查看入学配置为2，现场配置为3，查看现场配置为4
    // 由于以上四个点击共用同一套页面 使用该状态来进行入口判断，点击调用接口等
    ruxueSiteState: '',
    // 保存新闻修改与增加
    newinfo: {}
  },
  getters: {
    appItem: state => state.appItem,
    processItem: state => state.processItem,
    teacherItem: state => state.teacherItem,
    ruxueItem: state => state.ruxueItem,
    ruxueState: state => state.ruxueState,
    // siteState: state => state.siteState,
    ruxueSiteState: state => state.ruxueSiteState,
    // 新闻数据
    newinfo: state => state.newinfo
  },
  mutations: {
    appItem (state, data) {
      state.appItem = data
    },
    saveAppName (state, data) {
      state.appName = data
    },
    saveauthGroupName (state, data) {
      state.authGroupName = data
    },
    processItem (state, data) {
      state.processItem = data
    },
    teacherItem (state, data) {
      state.teacherItem = data
    },
    ruxueItem (state, data) {
      state.ruxueItem = data
    },
    ruxueState (state, data) {
      state.ruxueState = data
    },
    // siteState (state, data) {
    //   state.siteItem = data
    // }
    ruxueSiteState (state, data) {
      state.ruxueSiteState = data
    },
    // 保存新闻修改与增加
    set_new_info(state, info) {
      state.newinfo = info
    }
  }
}
export default yingxin