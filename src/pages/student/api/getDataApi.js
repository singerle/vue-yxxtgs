/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-05-17 11:41:36
 * @version $Id$
 */
import fetch from 'student/api/fetch'

export const getDataApi = (action,pars) => {
	const data = Object.assign({}, pars)
		return new Promise((resolve) => {
			fetch({
				headers: {
				    'Content-Type': 'multipart/form-data'
				},
			  	method: 'post',
			  	url: window.REQUEST_URL+action,
			  	params: data
			}).then((res) => {
			  	resolve(res.data)
		})
	})
}
