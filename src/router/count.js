/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-14 13:37:08
 * @version $Id$
 */

import Vue from 'vue'
import Router from 'vue-router'
import index from 'count/component/home/index'
import region from 'count/component/region/index'
import major from 'count/component/region/major'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {title: '迎新统计',keepAlive: true}
    },
    {
      path: '/region',
      name: 'region',
      component: region,
      meta: {title: '地区学院',keepAlive: true}
    },
    {
      path: '/major',
      name: 'major',
      component: major
    }
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'index',
//       component: resolve => require(['count/component/home/index'], resolve),
//       meta: {title: '迎新统计',keepAlive: true}
//     },
//     {
//       path: '/region',
//       name: 'region',
//       component: resolve => require(['count/component/region/index'], resolve),
//       meta: {title: '地区学院',keepAlive: true}
//     },
//     {
//       path: '/major',
//       name: 'major',
//       component: resolve => require(['count/component/region/major'], resolve),
//       meta: {title: '学院'}
//     }
//   ]
// })
