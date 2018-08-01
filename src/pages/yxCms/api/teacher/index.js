import fetch from 'oa/utils/fetch'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 迎新配置 教师办公配置 获取所有教师办公配置里
export function fetchAllTeacher (processId, pageNum, pageSize) {
  let data = {
    processId, pageNum, pageSize
  }
  data = qs.stringify(data)
  return fetch ({
    url: `${$HTTP}/enroll/permission/showGroups`,
    // url: "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/getAllTeacherList",
    method: 'post',
    data
  })
}
// 迎新配置  教师办公配置 删除权限组
export function delTeacher(groupId) {
  let data = {
    groupId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/permission/deleteGroup`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}
// 迎新配置  教师办公配置 修改权限组
export function editTeacher(groupId, newName) {
  let data = {
    groupId,
    newName
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/roleManage/delete`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}

// 迎新配置  教师办公配置 新增权限组
export function addTeacher(processId, groupName) {
  let data = {
    processId, groupName
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/permission/addPermissionGroup`,
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/manage/list',
    method: 'post',
    data
  })
}


// 迎新配置  教师办公配置 权限设置 
export function getAllApplication (enrollId, groupId) {
  let data = {
    enrollId,
    groupId
  }
  data = qs.stringify(data)
  return fetch ({
    url: `${$HTTP}/enroll/sceneAndApplication/selectBycd`,
    method: 'post',
    data
  })
}
// 迎新配置  教师办公配置 权限设置  保存设置
export function saveApplication (enrollId ,groupId, roleId) {
  let data = {
    enrollId, groupId, roleId
  }
  data = qs.stringify(data)
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/getAllApplication"
  return fetch ({
    url: `${$HTTP}/enroll/role/setUp`,
    data,
    method: 'post'
  })
}
  /*********************
   *      成员管理      *
   *********************/
/// 成员管理部分
// 迎新配置 教师办公配置 成员管理 获取所有成员列白
export function fetchAllMember (groupId, pageNum, pageSize) {
  let data = {
    groupId,
    pageNum,
    pageSize
  }
  data = qs.stringify(data)
  return fetch ({
    url: `${$HTTP}/enroll/permission/showmembers`,
    method: 'post',
    data
  })
}
// 删除对应的成员
export function delMember(userId, groupId) {
  let data = {
    userId, groupId
  }
  data = qs.stringify(data)
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/fetchAllMember"
  return fetch ({
    url: `${$HTTP}/enroll/permission/deletemembers`,
    method: 'post',
    data
  })
}
// 添加对应的成员
export function addMember(id, groupId, employeeNumber) {
  let data = {
    id, groupId, employeeNumber
  }
  data = qs.stringify(data)
  // let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/fetchAllMember"
  return fetch ({
    url: `${$HTTP}/enroll/permission/addmember`,
    method: 'post',
    data
  })
}


//   /*********************
//    *      权限范围      *
//    *********************/
// // 获取权限范围数据
// export function fetchRange(enrollId, groupId) {
//   let data = {
//     enrollId, groupId
//   }
//   data = qs.stringify(data)
//   return fetchNotaken ({
//     url: `${$HTTP}/enroll/sceneAndApplication/selectBycd`,
//     // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/range',
//     method: 'post',
//     data 
//   })
// }
// // 保存权限范围
// export function savaRange(enrollId, groupId, data) {
//   let obj = {
//     list: data,
//     enrollId, groupId,
//   }
//   return fetch ({
//     url: `${$HTTP}/enroll/permission/showmembers`,
//     method: 'post',
//     data: obj
//   })
// }
  /*********************
   *      权限范围      *
   *********************/
// 获取权限范围数据
export function fetchRange(groupId, enrollId) {
  let data = {
    enrollId, groupId
  }
  data = qs.stringify(data)
  return fetch ({
    url: `${$HTTP}/enroll/role/selectByDept`,
    // url: 'http://192.168.0.63:8086/enroll/role/selectByDept',
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/range',
    method: 'post',
    data 
  })
}
// 保存权限范围
export function savaRange(enrollId, groupId, data) {
  let obj = {
    list: data,
    enrollId, groupId,
  }
  obj = qs.stringify(obj)
  return fetch ({
    // url: `${$HTTP}/enroll/permission/showmembers`,
    url:`${$HTTP}/enroll/role/insertRange`,
    method: 'post',
    data: obj
  })
}

