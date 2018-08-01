import fetchDown from 'oa/utils/fetch-down' // 下载文件
import fetch from 'oa/utils/fetch'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 获取综合统计头部查询信息，根据token获取
export function fetchCondition() {
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/synthesis/title',
    url: `${$HTTP}/enroll/count/selectHead`,
    method: 'post'
  })
}
// 获取统计数据的列表
export function fetchSynthesis({school, majon, classes, title,  soucre,  year}, exports) {
  let data = {
    school, majon, classes, title, soucre, year, exports
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/synthesis',
    url: `${$HTTP}/enroll/count/colligationCount`,
    method: 'post',
    data
  })
}
// 获取所有的专业和班级
export function fetchMajon(schoolId) {
  let data = {
    schoolId
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/synthesis/title',
    url: `${$HTTP}/enroll/count/selectMajonAndClass`,
    method: 'post',
    data
  })
}
// 获取班级
export function fetchClass(schoolId, majonId) {
  let data = {
    schoolId,
    majonId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/count/selectClass`,
    method: 'post',
    data
  })
}
// 根据年获取迎新系统
export function fetchYear(year) {
  let data = {
    year
  }
  data = qs.stringify(data)
  return fetch({
    url:`${$HTTP}/enroll/count/selectSys`,
    method: 'post',
    data
  })
}
// 根据迎新系统获取迎新环节
export function fetchLink(title) {
  let data = {
    title
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/count/selectProcess`,
    method: 'post',
    data
  })
}
// 下载文件
// 获取统计数据的列表
export function down({school, majon, classes, title,  soucre,  year}, exports) {
  let data = {
    school, majon, classes, title, soucre, year, exports
  }
  data = qs.stringify(data)
  return fetchDown({
    url: `${$HTTP}/enroll/count/colligationCount`,
    method: 'post',
    data
  })
}