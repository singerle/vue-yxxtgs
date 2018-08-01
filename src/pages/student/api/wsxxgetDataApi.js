import fetch from 'student/api/fetch'

export const wsxxgetDataApi = (action,pars) => {
	// let config = {
	//     headers: {
	//         'Content-Type': 'multipart/form-data'
	//     }
	// }
	// axios.post(window.REQUEST_URL+action, pars,config).then( res => {
	//     console.log(res)
	// }).catch( res => {
	//     console.log(res)
	// })
	// const data = Object.assign({}, pars)
		return new Promise((resolve) => {
			fetch({
				headers: {
				    'Content-Type': 'multipart/form-data'
				},
			  	method: 'post',
			  	url: window.REQUEST_URL+action,
			  	data: pars
			}).then((res) => {
			  	resolve(res.data)
		})
	})
}