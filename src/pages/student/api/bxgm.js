import { getDataApi } from './getDataApi'
//保险购买

//查询保险购买状态（待完善）
export const getBxgmzt = (params) => {
	return getDataApi('student/bxgmzt',params)
}
//保险购买查询状态
export const getCxzt = (params) => {
	return getDataApi('student/bxzt',params)
}
//购买保险
export const Gmbx = (params) => {
	return getDataApi('student/gmbx',params)
}

//获取图形验证码URL地址及票据
export const getBxyzmData = (params) => {
	return getDataApi('student/txyzm',params)
}

//获取手机验证码  三个参数名:  pj:图形验证码票据 yzm:图形验证码  sjh:手机号
export const sendSjyzmData = (params) => {
	return getDataApi('student/yzm',params)
}

//放弃购买保险提交  参数名：  yzm:短信验证码
export const sendFqgmbxData = (params) => {
	return getDataApi('student/fqgmbx',params)
}

