import fetch from 'oa/utils/fetch'
import fetchDown from 'oa/utils/fetch-down' // 下载文件
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 获取组合查询的列表
export function fetchComb({school, majon, classes, title,  soucre,  year, type, combtype}) {
  let data = {
    userClass: classes,
    userCollege: school,
    userSpecialty: majon,
    userWelcomeYear: year,
    eaaId: type,
    processId: title,
    combtype: combtype,
    soucre: soucre
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/comb',
    url: `${$HTTP}/enroll/statistics/sex`,
    method: 'post',
    data
  })
}
// 下载组合查询
export function combExcel({school, majon, classes, title,  soucre,  year, type, combtype}) {
  let data = {
    userClass: classes,
    userCollege: school,
    userSpecialty: majon,
    userWelcomeYear: year,
    eaaId: type,
    processId: title,
    combtype: combtype,
    soucre: soucre
  }
  data = qs.stringify(data)
  return fetchDown({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/comb',
    // url: `${$HTTP}/enroll/statistics/sex`,
    url: `${$HTTP}/enroll/statistics/export`,
    method: 'post',
    data
  })
}