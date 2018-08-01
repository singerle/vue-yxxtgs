import { getDataApi } from './getDataApi'
//报道交通


//查询办理状态
export const getCxblData = (params) => {
	return getDataApi('student/bdjt',params)
}

//上传保存
export const sendBdjtbc = (params) => {
	return getDataApi('student/bdjtbc',params)
}