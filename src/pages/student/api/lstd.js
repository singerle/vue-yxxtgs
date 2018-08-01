import { getDataApi } from './getDataApi'
//绿色通道

//查询办理状态
export const getLstd = (params) => {
	return getDataApi('student/lstd',params)
}

//申请   参数名：type:0/1   (0:申请, 3:放弃)
export const sendLstdsq = (params) => {
	return getDataApi('student/lstdsq',params)
}

//新增需求的查询状态
export const lstdzt = (params) => {
	return getDataApi('student/lstdzt',params)
}