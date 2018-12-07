import axios from 'axios'
import store from '../store/index'
const server = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 50000
})
server.interceptors.request.use(config => {
  // 后期根据logId做处理
  if (store.getters.token) {
  	// 5edbb0af128146409f72962c214b1321
    config.headers['token'] = store.getters.token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
export default server