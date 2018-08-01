// import fetch from 'oa/utils/fetch-notoken'
import fetch from 'oa/utils/fetch'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 用户登录
export function login({name, password}) {
  let data = {
    userName: name,
    userPassword: password
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/background/login`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/login',
    method: 'post',
    data
  })
}
// 用户拉取信息
export function fetchUserInfo() {
  return fetch({
    url: `${$HTTP}/enroll/background/getRoles`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/roles',
    method: 'post'
  })
}
