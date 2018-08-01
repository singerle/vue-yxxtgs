import { getDataApi } from './getDataApi'
//电子通知书


//
export const getDztzsData = (params) => {
	return getDataApi('student/dztzs',params)
}
