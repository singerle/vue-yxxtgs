// 删除子节点
export function removeNode(el) {
  let childs = el.childNodes
  for (let i = childs.length - 1; i >= 0; i--) {
    el.removeChild(childs[i])
  }
}
// 用于全局验证是否数字中文字母
export const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
export const checkTeacherId = (rule, value, callback) => {
  if(!reg.test(value)) {
    callback(new Error('请输入中文、英文、或者数字'))
  }
  callback()
}
