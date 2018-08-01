import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: '',
		hjid: '',
		//亲属信息
		qsxx: '',
		//完善信息中三个表单的数据
		wsxxPage1:'',
		wsxxPage2:'',
		wsxxPage3:'',
		//跳转到完善信息模块时，从后台请求到的数据
		getWsxxData:''
	},
	mutations:{
	    SetUserInfo(state,stus) {
	        state.user = stus
	    },
		saveTime(state, payload){
			state.pickerValue = payload
		},
		savewsxxPage1(state, payload){
			state.wsxxPage1 = payload
		},
		savewsxxPage2(state,payload){
			state.wsxxPage2 = payload
		},
		savehjid(state, payload){
			state.hjid = payload
		},
		saveqsxx(state, payload){
			state.qsxx = payload
		},
		saveWsxxDate(state,payload){
			state.getWsxxData = payload
		}
	},
	actions:{
	},
	getters:{
		getHjid:state => {
			return state.hjid
		},
		getqsxx: state => {
			return state.qsxx
		},
		getuser: state => {
			return state.user
		},
	}
})
export default store
