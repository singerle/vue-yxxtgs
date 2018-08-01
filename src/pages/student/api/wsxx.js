import { getDataApi } from './getDataApi'
import { wsxxgetDataApi } from './wsxxgetDataApi'

//完善信息的提交  参数名为：param       
// export const sendWsxxData = (params) => {
// 	return getDataApi('student/wsxx',params)
// }
//参数是如下形式的字符串：
// {
// 	"grxx":{"qq":"213","wx":"21321","dzyx":"5465","rtsj":"20150612","rdsj":"","jkzk":"健康","xx":"O型","hkxz":"城镇户口","hkszd":"重庆市九龙坡区","jg":"重庆"},
// 	"qsxx":[
// 	{"xm":"张三","gx":"朋友","lxdh":"5465","nl":"25","gzdw":"重庆云华","szdq":"重庆市九龙坡区","zw":"前端","zzmm":"党员"},
// 	{"xm":"李四","gx":"朋友","lxdh":"5465","nl":"25","gzdw":"重庆云华","szdq":"重庆市九龙坡区","zw":"后端","zzmm":"党员"}
// 	],
// 	"cdxx":[
// 	{"kssj":"20120901","jssj":"20150701","xxmc":"重庆大坪小学","drzw":"无","zmr":"李四"},
// 	{"kssj":"20120901","jssj":"20150701","xxmc":"重庆大坪小学","drzw":"无","zmr":"李四"}
// 	]
// }
// export const getWsxxcxData =(params) => {
// 	return getDataApi('/student/wsxxcx',params)
// }

export const sendWsxxData = (params) => {
	return wsxxgetDataApi('student/wsgrxx',params)
}

export const getWsxxcxData =(params) => {
	return getDataApi('/student/wsgrxxcx',params)
}