// import fetch from 'oa/utils/fetch-notoken'
import fetch from 'oa/utils/fetch'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 获取统计数据的列表
export function fetchnews(newslist) {
  let data = {
    pageNum: newslist.pageNum,
    pageSize: newslist.pageSize
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/bulletin/noticeBulletin`,
    method: 'post',
    data
  })
}
// 新闻内容的新增
export function fetchAddNews(addnews) {
  let data = {
    bulletinUrl: addnews.cropImg,
    bulletinTitle: addnews.title,
    bulletinText: addnews.content
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/bulletin/noticeBulletinAdd`,
    method: 'post',
    data
  })
}
// 新闻内容的删除
export function deletenews(deleteId) {
  let data = {
    bulletinLogicId: deleteId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/bulletin/delete`,
    method: 'post',
    data
  })
}
// 新闻排序值的修改
export function sortNumber(sortdata){
  let data = {
    eaaId: sortdata.eaaId,
    sort: sortdata.sort,
    bulletinLogicId: sortdata.bulletinLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/bulletin/order`,
    method: 'post',
    data
  })
}
// 新闻修改获取接口数据
export function modifylist(modifyid){
  let data = {
    bulletinLogicId: modifyid
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/bulletin/selectById`,
    method: 'post',
    data
  })
}
// 新闻修改数据提交接口
export function modifynews(modifydata){
  let data = {
    bulletinLogicId: modifydata.id,
    bulletinUrl: modifydata.cropImg,
    bulletinTitle: modifydata.title,
    bulletinText: modifydata.content
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$HTTP}/enroll/bulletin/noticeBulletinUpdate`,
    method: 'post',
    data
  })
}

// 上传图片数据
export const updataUrl = `${$HTTP}/enroll/Resources/save`
