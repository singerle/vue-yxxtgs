import { getDataApi } from './getDataApi'

//走进理工数据获取
export const getZjlgNewsData = (params) => {
	return getDataApi('student/xwcx',params)
}