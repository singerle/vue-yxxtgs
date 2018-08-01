import { getDataApi } from './getDataApi'
//录取通知书物流信息

//查询办理状态
export const getLqtzs = (params) => {
	return getDataApi('student/lqtzs',params)
}