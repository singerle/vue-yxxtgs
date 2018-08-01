import Vue from 'vue'
import Router from 'vue-router'
import home from 'teacher/view/home/home'
import register from 'teacher/view/register/index'
import sushe from 'teacher/view/sushe/index'
import channel from 'teacher/view/channel/index'
import insurance from 'teacher/view/insurance/index'
import manage from 'teacher/view/manage/index'
import caiwu from 'teacher/view/caiwu/index'
import search from 'teacher/view/search/index'
import news from 'teacher/view/new/index'
import newsinfo from 'teacher/view/new/newsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { 
        keepAlive: true
       }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/sushe',
      name: 'sushe',
      component: sushe
    },
    {
      path: '/channel',
      name: 'channel',
      component: channel
    },
    {
      path: '/insurance',
      name: 'insurance',
      component: insurance
    }, 
    {
      path: '/manage',
      name: 'manage',
      component: manage
    }, {
      path: '/caiwu',
      name: 'caiwu',
      component: caiwu
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: { 
        title: '搜索'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: news,
      meta: { 
        title: '走进理工'
      }
    }, {
      path: '/newsinfo',
      name: 'newsinfo',
      component: newsinfo,
      meta: { 
        title: '走进理工'
      }
    }
  ]
})
