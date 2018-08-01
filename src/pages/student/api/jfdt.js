import { getDataApi } from './getDataApi'

//缴费大厅数据
export const getJfdtData = (params) => {
	return getDataApi('student/jfdt',params)
}