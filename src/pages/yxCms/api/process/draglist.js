import fetch from 'oa/utils/fetch-notoken'
import qs from 'qs'
// 获取流程配置内容数据列表
export function fetchdragList () {
  let url = "https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/draglist"
  return fetch ({
    url,
    method: 'post'
  })
}
//  提交保存流程配置内容数据列表
export function fetchAddDraglist (addlist) {
 let data = {
    application: addlist.application,
    Hierarchy: addlist.Hierarchy
 }
 data = qs.stringify(data)
  return fetch({
    url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/addedDraglist',
    method: 'post',
    data
  })
}