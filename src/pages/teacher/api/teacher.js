import fetch from 'teacher/utils/fetch'
import qs from 'qs'
const $HTTP = window.REQUEST_URL
// const $HTTP = window.REQUEST_URL
// const $HTTP = 'http://www.yunhuakeji.com:10071'
// 获取现场报到数据
export function fetchRegister(userId, type, code) {
  let data = {
    userId,
    type,
    code
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://www.easy-mock.com/mock/5b1dd81fa123fc5c0c6c2510/student',
    url: `${$HTTP}/user/selectByUser`,
    method: 'post',
    data
  })
}
// 获取绿色通道数据
export function fetchChannel(userId, type, code) {
  let data = {
    userId,
    type, code
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/green/selectGreenByUserId`,
    method: 'post',
    data 
  })
}
// 获取寝室数据列表
export function fetchDormitory(userId, type, code) {
  let data = {
    userId, type, code
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/user/selectByUserAndRoom`,
    method: 'post',
    data
  })
}
// 宿舍确认办理接口
export function DormConfirm(userId) {
  let data = {
    userId
  }
  data = qs.stringify(data)
  return fetch({
    url:  `${$HTTP}/bedroom/updateBedroom`,
    method: 'post',
    data 
  })
}
// 宿舍撤销
export function DormCancel(userId, desc) {
  let data = {
    userId, desc
  }
  data = qs.stringify(data)
  return fetch({
    url:  `${$HTTP}/bedroom/updateBedroom`,
    method: 'post',
    data 
  })
}
// 现场报到确认办理接口
export function confirm(userId) {
  let data = {
    userId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enrollConfiguration/insertReportingProcess`,
    method: 'post',
    data 
  })
}
// 确认绿色通道办理接口
export function channelConfirm(userId) {
  let data = {
    userId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/green/updateGreenStateByUserId`,
    method: 'post',
    data 
  })
}
// 绿色通道 撤销
export function channelCancel(userId, desc) {
  let data = {
    userId, desc
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/green/updateGreenStateByUserId`,
    method: 'post',
    data 
  })
}
// 获取保险购买办理数据
export function fetchInsurance(userId, type, code) {
  let data = {
    userId, type, code
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/insurance/selectInsuranceByUserId`,
    method: 'post',
    data
  })
}
// 确认保险购买办理接口
export function insuranceConfirm(userId) {
  let data = {
    userId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/insurance/updateInsuranceStateByUserId`,
    method: 'post',
    data 
  })
}
// 保险购买撤销
export function insuranceCancel(userId, desc) {
  let data = {
    userId, desc
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/insurance/updateInsuranceStateByUserId`,
    method: 'post',
    data 
  })
}
// 现场报到撤销
export function cancel(userId, desc) {
  let data = {
    userId, desc
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enrollConfiguration/insertReportingProcess`,
    method: 'post',
    data 
  })
}

// 获取财务数据
export function finance (userId, type, code) {
  let data = {
    userId, type, code
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enrollPay/queryByPay`,
    method: 'post',
    data 
  })
}
// 获取首页的配置数据
export function home() {
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a09d9d81c5cbe4ef708318b564a6f3de/home',
    url: `${$HTTP}/role/queryMenu`,
    method: 'post'
  })
}

// 新闻页面
export function fetchNews(pageNum, pageSize) {
  let data = {
    pageNum,
    pageSize
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/bulletin/teacherShow`,
    method: 'post',
    data
  })
}
// 获取新闻页详情
export function fetchInfo(bulletinLogicId) {
  let data = {
    bulletinLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/bulletin/selectAndVolumeAdd`,
    method: 'post',
    data
  })
}