import { getDataApi } from './getDataApi'

//通知公告数据 两个参数名，page和size
export const getTzggData = (params) => {
	return getDataApi('student/tzgg',params)
}

//通知公告浏览量  一个参数名tzbh
export const xGllcs = (params) => {
	return getDataApi('student/xgllcs',params)
}
