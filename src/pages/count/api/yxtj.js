/**
 * 
 * @authors wangyu (you@example.org)
 * @date    2018-06-22 14:48:14
 * @version $Id$
 */
import { getDataApi } from './getDataApi'

//获取校区列表
export const getXqlb = (params) => {
    return getDataApi('yxtj/xqlb', params)
}
//迎新统计首页
export const getHomeInfo = (params) => {
    return getDataApi('yxtj/tjsy', params)
}
//校区报道情况
export const getXqbdqk = (params) => {
    return new Promise((resolve) => {
        getDataApi('yxtj/xqbdqk', params).then((res) => {
            if(res.content.dqfb){
                res.content.dqfb.forEach((r, i) => {
                    r.zrs=r.yd
                })
                res.title = ['省份','实到','应到','百分比']
            }else{
                res.title = ['学院','实到','应到','百分比']
                res.content.forEach((r, i) => {
                    r.zrs=r.yd
                })
            }
            resolve(res)
        })
    })
}
//学院报道情况
export const getXybdqk = (params) => {
    return new Promise((resolve) => {
        getDataApi('yxtj/xybdqk', params).then((res) => {
            let d = []
            if(res.code == '40001'){
                res.content.forEach((r, i) => {
                    d.push({sd: r.sd,yd: r.yd,zy: r.zy,zrs: r.yd})
                })
            }
            res.content = d
            let r = Object.assign(res,{title: ['专业','实到','应到','百分比']})
            resolve(r)
        })
    })
}
//校区缴费情况
export const getXqjfqk = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xqjfqk', params).then((res) => {
    		if(params.type==1){
	    		let d = []
	    		let snsw = {snbdrs: '',snrs: '',swbdrs: '',swrs: '',zrs: ''}
	    		if(res.code == '40001'){
	    			res.content.dqfb.forEach((r,i) => {
	    				d.push({sd: r.yjfrs,yd: r.zrs,sf: r.sf,zrs: r.zrs})
	    			})
	    			snsw.snbdrs = res.content.snsw.snjfrs
	    			snsw.snrs = res.content.snsw.snrs
	    			snsw.swbdrs = res.content.snsw.swjfrs
	    			snsw.swrs = res.content.snsw.swrs
	    			snsw.zrs = res.content.snsw.zrs
	    			res.content.dqfb = d
	    			res.content.snsw = snsw
	    		}
	    		res.title = ['省份','实缴','应缴','百分比']
    		}else if(params.type==2){
    			let d = []
    			res.content.forEach((r, i) => {
    				d.push({xy: r.xy, sd: r.yjfrs, yd: r.zrs, xybh: r.xybh,zrs: r.zrs})
    			})
    			res.content = d
    			res.title = ['学院','实缴','应缴','百分比']
    		}
    		resolve(res)
    	})
    })
}
//学院缴费情况
export const getXyjfqk = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xyjfqk', params).then((res) => {
    		let d = []
    		if(res.code == '40001'){
    			res.content.forEach((r, i) => {
    				d.push({sd: r.yjfrs,yd: r.zrs,zy: r.zy,zrs: r.zrs})
    			})
    		}
    		res.content = d
    		let r = Object.assign(res,{title: ['专业','实缴','应缴','百分比']})
            console.log(r)
    		resolve(r)
    	})
    })
}
//校区宿舍办理
export const getXqssbl = (params) => {
	return new Promise((resolve) => {
    	getDataApi('yxtj/xqssbl', params).then((res) => {
    		if(params.type==1){
	    		let d = []
	    		let snsw = {snbdrs: '',snrs: '',swbdrs: '',swrs: '',zrs: ''}
	    		if(res.code == '40001'){
	    			res.content.dqfb.forEach((r,i) => {
	    				d.push({sd: r.yblrs,yd: r.wblrs,sf: r.sf,zrs: r.zrs})
	    			})
	    			snsw.snbdrs = res.content.snsw.snblrs
	    			snsw.snrs = res.content.snsw.snrs
	    			snsw.swbdrs = res.content.snsw.swblrs
	    			snsw.swrs = res.content.snsw.swrs
	    			snsw.zrs = res.content.snsw.zrs
	    			res.content.dqfb = d
	    			res.content.snsw = snsw
	    		}
	    		res.title = ['省份','已办理','未办理','百分比']
    		}else if(params.type==2){
    			let d = []
    			res.content.forEach((r, i) => {
    				d.push({xy: r.xy, sd: r.yblrs, yd: r.wblrs, xybh: r.xybh,zrs: r.zrs})
    			})
    			res.content = d
    			res.title = ['学院','已办理','未办理','百分比']
    		}
    		resolve(res)
    	})
    })
}
//学院宿舍办理情况
export const getXyssbl = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xyssbl', params).then((res) => {
    		let d = []
    		if(res.code == '40001'){
    			res.content.forEach((r, i) => {
    				d.push({sd: r.yblrs,yd: r.zrs,zy: r.zy,zrs: r.zrs})
    			})
    		}
    		res.content = d
    		let r = Object.assign(res,{title: ['专业','已办理','未办理','百分比']})
    		resolve(res)
    	})
    })
}
//社区保险购买
export const getXqbxgm = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xqbxgm', params).then((res) => {
    		if(params.type==1){
	    		let d = []
	    		let snsw = {snbdrs: '',snrs: '',swbdrs: '',swrs: '',zrs: ''}
	    		if(res.code == '40001'){
	    			res.content.dqfb.forEach((r,i) => {
	    				d.push({sd: r.yblrs,yd: r.ysqrs,fq: r.yfqrs,sf: r.sf,zrs: r.zrs})
	    			})
	    			snsw.snbdrs = res.content.snsw.snblrs
	    			snsw.snrs = res.content.snsw.snrs
	    			snsw.swbdrs = res.content.snsw.swblrs
	    			snsw.swrs = res.content.snsw.swrs
	    			snsw.zrs = res.content.snsw.zrs
	    			res.content.dqfb = d
	    			res.content.snsw = snsw
	    		}
	    		res.title = ['省份','已购买','已申请','已放弃','百分比']
    		}else if(params.type==2){
    			let d = []
    			res.content.forEach((r, i) => {
    				d.push({xy: r.xy, sd: r.yblrs, yd: r.ysqrs, yfqrs: r.yfqrs,xybh: r.xybh,zrs: r.zrs})
    			})
    			res.content = d
    			res.title = ['学院','已购买','已申请','已放弃','百分比']
    		}
    		resolve(res)
    	})
    })
}
//学校保险购买情况
export const getXybxgm = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xybxgm', params).then((res) => {
    		let d = []
    		if(res.code == '40001'){
    			res.content.forEach((r, i) => {
    				d.push({sd: r.yblrs,yd: r.ysqrs,yfqrs: r.yfqrs,zy: r.zy,zrs: r.zrs})
    			})
    		}
    		res.content = d
    		let r = Object.assign(res,{title: ['专业','已购买','已申请','已放弃','百分比']})
    		resolve(r)
    	})
    })
}
//校区绿色通道
export const getXqlstd = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xqlstd', params).then((res) => {
    		if(params.type==1){
	    		let d = []
	    		let snsw = {snbdrs: '',snrs: '',swbdrs: '',swrs: '',zrs: ''}
	    		if(res.code == '40001'){
	    			res.content.dqfb.forEach((r,i) => {
	    				d.push({sd: r.yblrs,yd: r.ysqrs,fq: r.yfqrs,sf: r.sf,zrs:r.zrs})
	    			})
	    			snsw.snbdrs = res.content.snsw.snblrs
	    			snsw.snrs = res.content.snsw.snrs
	    			snsw.swbdrs = res.content.snsw.swblrs
	    			snsw.swrs = res.content.snsw.swrs
	    			snsw.zrs = res.content.snsw.zrs
	    			res.content.dqfb = d
	    			res.content.snsw = snsw
	    		}
	    		res.title = ['省份','已购买','已申请','未申请','百分比']
    		}else if(params.type==2){
    			let d = []
    			res.content.forEach((r, i) => {
    				d.push({xy: r.xy, sd: r.yblrs, yd: r.ysqrs, yfqrs: r.yfqrs,xybh: r.xybh,zrs: r.zrs})
    			})
    			res.content = d
    			res.title = ['学院','已购买','已申请','未申请','百分比']
    		}
    		resolve(res)
    	})
    })
}
//学院绿色通道情况
export const getXylstd = (params) => {
    return new Promise((resolve) => {
    	getDataApi('yxtj/xylstd', params).then((res) => {
    		let d = []
    		if(res.code == '40001'){
    			res.content.forEach((r, i) => {
    				d.push({sd: r.yblrs,yd: r.ysqrs,yfqrs: r.yfqrs,zy: r.zy,zrs: r.zrs})
    			})
    		}
    		res.content = d
    		let r = Object.assign(res,{title: ['专业','已购买','已申请','未申请','百分比']})
    		resolve(r)
    	})
    })
}
export const getRegion = (params) => {
	let p = `(${JSON.stringify(params.p)})`
	return eval(params.func+p);
}
export const getXyblqk = (params) => {
	let p = `(${JSON.stringify(params.p)})`
	return eval(params.func+p);
}