// 生产环境
module.exports = file => () => import('oa/view/' + file + '.vue')
