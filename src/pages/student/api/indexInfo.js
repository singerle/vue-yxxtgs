/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-05-29 11:54:44
 * @version $Id$
 */
import { getDataApi } from './getDataApi'

//学生首页的学生信息
export const getIndexData = (params) => {
	return getDataApi('student/xssy',params)
}