import axios from 'axios'
import store from 'student/store/index'
const server = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})
server.interceptors.request.use(config => {
  // 后期根据logId做处理
  config.headers['token'] = store.getters.getuser.userid
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
export default server