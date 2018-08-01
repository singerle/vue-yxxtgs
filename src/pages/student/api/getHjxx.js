/**
 * 
 * @authors wangyu (you@example.org)
 * @date    2018-06-26 10:13:00
 * @version $Id$
 */

import { getDataApi } from './getDataApi'

//获取引导页状态
export const getYdyStu = (params) => {
	return getDataApi('studentManage/welcome',params)
}

//设置引导页状态
export const setYdyStu = (params) => {
	return getDataApi('studentManage/updateCondition',params)
}

//获取环节信息
export const getHjxx = (params) => {
	return getDataApi('studentManage/init',params)
}

//设置环节状态
export const setHjStu = (params) => {
	return getDataApi('studentManage/completeProcess',params)
}
//获取报道流程
export const getBdLc = (params) => {
	return getDataApi('studentManage/registration',params)
}
//缓存流程
export const sendHcLc = (params) => {
	return getDataApi('student/hclc',params)
}
