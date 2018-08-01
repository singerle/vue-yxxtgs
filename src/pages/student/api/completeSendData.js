import {getDataApi} from './getDataApi'

//每个模块结束要请求的接口
export const completeProcess = (params) => {
	return getDataApi('/studentManage/completeProcess',params)
}