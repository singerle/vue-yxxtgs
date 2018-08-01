import { getDataApi } from './getDataApi'

//个人身份码
export const getGrsfmData = (params) => {
	return getDataApi('student/grsfm',params)
}