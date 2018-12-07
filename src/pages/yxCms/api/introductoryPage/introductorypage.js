// import fetch from 'oa/utils/fetch-notoken'
import fetch from 'oa/utils/fetch'
import qs from 'qs'
import { $HTTP } from 'oa/utils/config'
// 获取引导页图片数据的列表
export function fetchintroductory() {
  let data = {
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/uploadList',
    url: `${$HTTP}/enroll/bootPage/init`,
    method: 'post',
    data
  })
}
// 引导页配置数据接口 保存
export function fetchaddIntroductory(addintor) {
  let data = {
    bootPageCondition: addintor.condition,
    bootPagePicture: addintor.fileList
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/addIntroductory',
    url: `${$HTTP}/enroll/bootPage/save`,
    method: 'post',
    data
  })
}
// 上传图片数据
// export const uploadUrl = 'https://dsn.apizza.net/mock/a36657f269d8bc38b9979c1bbf019699/upload'
export const updataUrl = `${$HTTP}/enroll/Resources/save`