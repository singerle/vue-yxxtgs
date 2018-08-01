import fetch from 'oa/utils/fetch'
import fetchDown from 'oa/utils/fetch-down' // 下载文件
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 获取统计数据的列表
export function fetchBusin({school, majon, classes, title,  soucre,  year, state, search, input, type}, pageNum, pageSize) {
  let data = {
    school, majon, classes, title, soucre, year, search, input, 
    processId: type,
    processState: state,
    pageNum: pageNum,
    pageSize: pageSize
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/bus',
    url: `${$HTTP}/enroll/count/selectStudentByEaa`,
    method: 'post',
    data
  })
}
// 业务数据点击查看
export function fetchInfo(userId , radio) {
  let data = {userId}
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/count/selectUser`
  if (radio === 'other') {
    url = `${$HTTP}/enroll/count/selectOther`
  }
  return fetch({
    url,
    method: 'post',
    data
  })
}
// 下载excel
export function downBusin({school, majon, classes, title,  soucre,  year, state, search, input, type}, pageNum, pageSize, exports) {
  let data = {
    school, majon, classes, title, soucre, year, search, input, 
    processId: type,
    processState: state,
    pageNum: pageNum,
    pageSize: pageSize,
    exports
  }
  data = qs.stringify(data)
  return fetchDown({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/bus',
    url: `${$HTTP}/enroll/count/selectStudentByEaa`,
    method: 'post',
    data
  })
}