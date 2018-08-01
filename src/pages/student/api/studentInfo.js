import { getDataApi } from './getDataApi'

//学生个人信息
export const getGrxxData = (params) => {
	return getDataApi('student/grxx',params)
}