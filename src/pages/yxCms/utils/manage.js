// 处理权限设置的数据
export function manageDataSet(list) {
  var arr = []
  list.forEach(item => {
    if (item.check) {
      arr.push(item.id)
    }
  })
  return arr.join(',')
}
// 处理权限范围的数据
export function RangeData(list) {
  let arr = []
  list.forEach(item => {
    // 一级菜单
    if(item.checked) {
      arr.push(item.id)
    }
    // 二级菜单
    if (item.children && item.children.length > 0) {
      item.children.forEach(data => {
        if(data.checked){
          arr.push(data.id)
        }
      })
    }
  })
  return arr.join(',')
}
