import {stateRoute, activeRoute} from 'oa/router'
const permission = {
  state: {
    routers: stateRoute, // 用于导航栏显示, 基础路由表
    addRouters: [] // 动态添加的路由表
  },
  mutations: {
    SET_ROUTER: (state, routers) => {
      // routers 动态的路由
      state.addRouters = routers
      // 链接动态路由与基础路由
      state.routers = stateRoute.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({commit}, {data, rolesStatis}) {
      // data, 为用户的权限
      // 根据权限设置路由表
      let roles = data[0] * 1
      let newRouters = setRouter(roles, activeRoute, rolesStatis)
      // 到时候动态的添加路由
      return new Promise((resolve) => {
        commit('SET_ROUTER', newRouters)
        // commit('SET_ROUTER', activeRoute)
        resolve(true)
      })
    }
  }
}
export default permission

function setRouter(roles, data, rolesStatis) {
  let arr = []
  // 如果roles == >1 为最高权限
  if(roles === 1) {
    return data
  } else {
    // 只要其中没有有一个显示就不返回数据统计
    if (!rolesStatis.includes(true)) {
      return []
    } 
    // 获取第一个展示的索引
    let index = rolesStatis.indexOf(true)
    // 只有一个就为true就返回数据统计
    for(let i =0 ; i < data.length; i++) {
      if(data[i].roles) {
        arr.push(data[i])
        break
      }
    }
    // 设置默认路由的向导
    for(let i = 0 ; i < arr.length; i++) {
      if (data[i].path = '/yingxin') {
        arr[i].children[0].redirect = `${arr[i].path}/${arr[i].children[0].path}/${arr[i].children[0].children[index].path}`
      }
    }
    return arr
  }
}
