import fetch from 'oa/utils/fetch'
// import fetch from 'oa/utils/fetch-notoken'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 入学配置列表获取
export function fetchProcessList (enrollYear, state, pageNum, pageSize) {
  let data = {
    enrollYear,
    state,
    pageNum,
    pageSize
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/configuration/listByConditions`
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/processlist"
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 获取所有迎新年限
export function fetchAllYear () {
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/fetchAllYear"
  let url  = `${$HTTP}/enroll/configuration/getAllEnrollYear`
  return fetch ({
    url,
    method: 'post'
  })
}
// 时间戳转为时间格式
function add0(m){return m<10?'0'+m:m }
function format (shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
// 新增入学流程
export function addProcess (data) {
  data.beginTime = format(data.beginTime)
  data.endTime = format(data.endTime)
  data.originType = data.originType.join(',')
  data = qs.stringify(data)
  let url  = `${$HTTP}/enroll/configuration/insertSelective`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 编辑入学流程
export function editProcess (data) {
  data.beginTime = format(data.beginTime)
  data.endTime = format(data.endTime)
  data.originType = data.originType.join(',')
  data = qs.stringify(data)
  let url  = `${$HTTP}/enroll/configuration/update`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 点击测试 ，启用，停测等改变流程状态
export function changeState (enrollLogicId, state) {
  let data = {
    enrollLogicId,
    state
  }
  let url = `${$HTTP}/enroll/configuration/stateChange`
  data = qs.stringify(data)
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 删除当前迎新流程
export function delProcess (enrollLogicId) {
  let data = {
    enrollLogicId
  }
  let url = `${$HTTP}/enroll/configuration/delete`
  data = qs.stringify(data)
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 入学配置 应用配置的所有应用列表
export function fetchAllApp (enrollId, taskType) {
  let data = {
    enrollId,
    taskType
  }
  data = qs.stringify(data)
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/getAllApp"
  let url = `${$HTTP}/enroll/enrollAndApplication/listByEnrolmentAllocation`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 现场配置配置 应用配置的所有应用列表
export function fetchSiteApp (enrollId, taskType) {
  let data = {
    enrollId,
    taskType
  }
  data = qs.stringify(data)
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/getAllApp"
  let url = `${$HTTP}/enroll/sceneAndApplication/listByEnrolmentAllocation`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 入学配置 应用管理 添加应用的 所有应用的初始化加载
export function fetchAppBox (enrollId, type) {
  // type为1是入学配置，type为2是现场配置
  let data = {
    enrollId,
    type
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/applicationBasic/listConfigure`
  return fetch ({
    url,
    method:'post',
    data
  })
}
// 迎新配置 入学配置 应用管理 添加应用的 入学配置添加应用
export function addRuxueApp (enrollName, applicationId, enrollId) {
  let data = {
    enrollName,
    applicationId,
    enrollId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/enrollAndApplication/add`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 入学配置 应用管理 添加应用的 现场配置添加应用
export function addSiteApp (applicationName, applicationId, enrollId) {
  let data = {
    applicationName,
    applicationId,
    enrollId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/sceneAndApplication/add`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 入学配置 应用管理 删除列表中的某一个应用
export function delRuxueApp (eaaLogicId) {
  let data = {
    eaaLogicId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/enrollAndApplication/delete`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 现场配置 应用管理 删除列表中的某一个应用
export function delSceneApp (saaLogicId) {
  let data = {
    saaLogicId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/sceneAndApplication/delete`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 入学配置 应用管理 点击编辑后获取信息回显（非新闻类）
export function fetchAppInfo (eaaLogicId) {
  let data = {
    eaaLogicId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/enrollAndApplication/selectById`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 现场配置 应用管理 点击编辑后获取信息回显（非新闻类）
export function fetchSiteAppInfo (saaLogicId) {
  let data = {
    saaLogicId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/sceneAndApplication/selectById`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 入学配置 应用管理 点击编辑保存
export function editAPP (eaaLogicId, enrollName, eaaRevoke, type, bulletinLogicId, bulletinTitle, bulletinText) {
  let data = {
    eaaLogicId,
    enrollName,
    eaaRevoke,
    type,
    bulletinLogicId,
    bulletinTitle,
    bulletinText
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/enrollAndApplication/updateApplication`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 迎新配置 现场配置 应用管理 点击编辑保存
export function editSiteAPP (saaId, applicationName, eaaRevoke, type, bulletinLogicId, bulletinTitle, bulletinText) {
  let data = {
    saaId,
    applicationName,
    eaaRevoke,
    type,
    bulletinLogicId,
    bulletinTitle,
    bulletinText
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/sceneAndApplication/updateApplication`
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 入学配置/现场配置 流程配置 首页获取所有的流程 type为1是入学配置 type为2是现场配置
export function processConfig (enrollId, type) {
  let data = {
    enrollId,
    type
  }
  let url = `${$HTTP}/enroll/processLevel/info`
  data = qs.stringify(data)
  return fetch ({
    url,
    method: 'post',
    data
  })
}
// 流程配置 流程配置的保存
export function processCommit (enrollId, type, hierarchy) {
  let data = {
    enrollId,
    type,
    hierarchy
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll//processLevel/save`
  return fetch({
    data,
    url,
    method: 'post'
  })
}
// 迎新配置 入学和现场 列表新闻的新增
export function saveMultiNews (eaaId, bulletinUrl, bulletinTitle, bulletinText) {
  let data = {
    eaaId,
    bulletinUrl,
    bulletinTitle,
    bulletinText
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/bulletin/add`
  return fetch ({
    method: 'post',
    url,
    data
  })
}
// 迎新配置 入学和现场 列表新闻的信息回显
export function fetchNewsInfo (bulletinLogicId) {
  let data = {
    bulletinLogicId
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/bulletin/selectById`
  return fetch ({
    method: 'post',
    url,
    data
  })
}
// 迎新配置 入学和现场 列表新闻的修改
export function editMultiNews (bulletinLogicId, bulletinUrl, bulletinTitle, bulletinText) {
  let data = {
    bulletinLogicId,
    bulletinUrl,
    bulletinTitle,
    bulletinText
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/bulletin/update`
  return fetch ({
    method: 'post',
    url,
    data
  })
}
// 教师端可见不可见的接口
export function changeShow (eaaId, showRange) {
  let data = {
    eaaId,
    showRange
  }
  data = qs.stringify(data)
  let url = `${$HTTP}/enroll/bulletin/showRange`
  return fetch ({
    method: 'post',
    url,
    data
  })
}
// 迎新配置 教师办公配置 获取所有教师办公配置里欸奥
export function fetchAllTeacher () {
  let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/getAllTeacherList"
  return fetch ({
    url,
    method: 'post'
  })
}
// 迎新配置 教师办公配置 成员管理 获取所有成员列白澳
export function fetchAllMember () {
  let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/fetchAllMember"
  return fetch ({
    url,
    method: 'post'
  })
}
// 迎新配置  教师办公配置 权限设置 获取所有权限及选择状态
export function getAllApplication () {
  let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/getAllApplication"
  return fetch ({
    url,
    method: 'post'
  })
}
