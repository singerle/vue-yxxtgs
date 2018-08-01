import Vue from 'vue'
import Router from 'vue-router'
import home from 'oa/view/home'
import login from 'oa/view/login'
Vue.use(Router)
// 如果是在开发模式下关闭懒加载，在生产版本中实现懒加载
// const _import = require('./_import_' + process.env.NODE_ENV)
const _import = require('./_import_production')
// const _import = require('./_import_development')
// if hidden is true not show the sidebar
// if noDropdown is ture show the submen
// if code === 300 就不显示
export const stateRoute = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    // component: login
    component: _import('login')
  },
  {
    path: '/',
    name: '主页',
    redirect: '/dashboard',
    component: home,
    children: [{path: 'dashboard', component: _import('dashboard/index')}]
  },  {
    path: '/yingxin',
    name: '迎新配置',
    roles: true,
    component: home,
    children: [
      {path: 'process', component: _import('yingxin/index')},
      {path: 'addProcess', component: _import('yingxin/addProcess')},
      {path: 'ruxue', component: _import('yingxin/ruxue'), children: [
        {path: '/', component: _import('yingxin/ruxue/app')},
        {path: 'process', component: _import('yingxin/ruxue/process')},
      ]},
      {path: 'addapp', component: _import('yingxin/ruxue/addapp')},
      {path: 'teacher', component: _import('yingxin/teacher')},
      {path: 'member', component: _import('yingxin/teacherOff/member')},
      {path: 'editapp', component: _import('yingxin/ruxue/editapp')},
      {path: 'addmember', component: _import('yingxin/teacherOff/addmember')},
      {path: 'authority', component: _import('yingxin/teacherOff/authority')},
      {path: 'addAuth', component: _import('yingxin/teacherOff/addAuth')},
      {path: 'authConfig', component: _import('yingxin/teacherOff/authConfig')},
      {path: 'authGroupEdit', component: _import('yingxin/teacherOff/authGroupEdit')},
      {path: 'singleNews', component: _import('yingxin/news/addSingleNews')},
      {path: 'multiNews', component: _import('yingxin/news/index')},
      {path: 'addMultiNews', component: _import('yingxin/news/addMultiNews')}
    ]
  }
]
// 以后的动态路由
export const activeRoute = [
  {
    path: '/newsPublicity',
    name: '新闻公示',
    component: home,
    children: [
      {path: 'news', component: _import('newsPublicity/index')},
      {path: 'addedNews', name: '新增新闻', component: _import('newsPublicity/addedNews')}
    ]
  }, {
    path: '/statis',
    name: '数据统计',
    component: home,
    roles: true,
    children: [{
      path: 'index',
      component: _import('statis/statis'),
      redirect: '/statis/index/synthesis',
      children: [{
        path: 'synthesis',
        name: '综合统计',
        component: _import('statis/synthesis')
      }, {
        path: 'business',
        name: '业务数据查询',
        component: _import('statis/business')
      }, {
        path: 'comb',
        name: '组合查询',
        component: _import('statis/comb')
      }, {
        path: 'businfo',
        name: '基本信息',
        component: _import('statis/business/businfo')
      }, {
        path: 'traffic',
        name: '交通信息',
        component: _import('statis/traffic')
      }]
    }]
  }, {
    path: '/manage',
    name: '权限管理',
    component: home,
    children: [{
      path: 'index',
      component: _import('manage/index'),
      redirect: '/manage/index/list',
      children: [{
        path: 'list',
        name: '列表',
        component: _import('manage/list')
      }, {
        path: 'add',
        name: '新增权限组',
        component: _import('manage/addManage')
      }, {
        path: 'member',
        name: '成员管理',
        component: _import('manage/member')
      }, {
        path: 'addmember',
        name: '新增成员',
        component: _import('manage/addmember')
      }, {
        path: 'manageset',
        name: '权限设置',
        component: _import('manage/manageSet')
      }, {
        path: 'range',
        name: '权限范围',
        component: _import('manage/manageRange')
      }]
    }]
  },{
    path: '/introductoryPages',
    name: '引导页配置',
    component: home,
    children: [
      {path: 'upload', component: _import('introductoryPages/index')},
      // {path: 'addedNews', name: '新增新闻', component: _import('newsPublicity/addedNews')}
    ]
  }
]
export default new Router({
  routes: stateRoute
})
