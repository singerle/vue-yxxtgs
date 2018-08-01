import { getDataApi } from './getDataApi'

//安全知识测试
export const getAqzscsData = (params) => {
	return getDataApi('student/aqzscs',params)
}

//安全知识提交   两个参数名zq ：正确题数  cw：错误题数 
export const sendAqzscsData = (params) => {
	return getDataApi('student/aqcstj',params)
}
//获取问卷调查题
export const getWjdcData = (params) => {
	return getDataApi('student/wjdc',params)
}

//问卷调查提交    必传参数为param   参数值格式如下：[{"id":"1","result":"A"},{"id":"2","result":"B"}]
export const sendWjdcData = (params) => {
	return getDataApi('student/wjdctj',params)
}