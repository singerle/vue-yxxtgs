import fetch from 'oa/utils/fetch'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 获取所有的权限组
export function fetchList(currentPage, display) {
  let data = {
    pageNum: currentPage,
    pageSize: display
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/list`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}
// 新增权限组
export function addManage(roleGroupName) {
  let data = {
    roleGroupName
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/add`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}
// 编辑权限组
export function editManage(roleLogicId, roleGroupName) {
  let data = {
    roleLogicId,
    roleGroupName
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/update`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}
// 删除权限组
export function delManage(roleId) {
  let data = {
    roleId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/delete`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}
// 获取权限组的所有成员
export function fetchMember(currentPage, display, roleId) {
  let data = {
    pageNum: currentPage,
    pageSize: display,
    roleId: roleId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/userList`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/menber',
    method: 'post',
    data
  })
}
// 删除权限组的选中成员
export function delMember(userId) {
  let data = {
    userId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/deleteUser`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/menber',
    method: 'post',
    data
  })
}// 添加权限组的选中成员
export function addMember(roleLogicId, userEmployeeNumber) {
  let data = {
    roleLogicId, userEmployeeNumber
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/addUser`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/menber',
    method: 'post',
    data
  })
}
// 获取所有的权限设置
export function manageset(roleLogicId) {
  let data = {
    roleLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/permissionsSettings`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manageset',
    method: 'post',
    data
  })
}
// 保持权限设置
export function saveSet(roleLogicId, permissionsSettings) {
  let data = {
    roleLogicId,
    permissionsSettings
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/setPermissions`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manageset',
    method: 'post',
    data
  })
}


/*************************
 *     权限范围           *
 ************************/
// 获取权限范围
 export function manageRange(roleLogicId){
  let data = {
    roleLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/roleScope`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/range',
    method: 'post',
    data
  })
 }
 // 保存权限范围
 export function saveRange(roleLogicId, roleScope){
   let data = {
    roleLogicId,
    roleScope
   }
   data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/setRoleScope`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/range',
    method: 'post',
    data
  })
 }