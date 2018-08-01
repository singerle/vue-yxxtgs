import { getDataApi } from './getDataApi'

//所在寝室数据
export const getSzqsData = (params) => {
	return getDataApi('student/qsxx',params)
}