const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  routers: state => state.permission.routers,
  activeRouter: state => state.permission.addRouters,
  // 获取数据统计下面四个模块儿显示与隐藏
  rolesStatis: state => state.user.rolesStatis,
  // 设置权限组的id
  manage: state => state.manage.manage,
  // 获取统计相关的数据
  statis: state => state.statis.statis,
  index: state => state.statis.index,
  busInfo: state => state.statis.info,
  update: state => state.statis.update,
  // 入学配置 应用管理的 应用名称 存储
  appName: state => state.yingxin.appName,
  // 迎新配置 教师配置 权限组编辑 存储
  authGroupName: state => state.yingxin.authGroupName,
  // 新闻id
  newsid: state => state.news.newsid,
  teacher: state => state.teacher.teacher
}
export default getters
