/**
 * 
 * @authors WangYu (you@example.org)
 * @date    2018-06-14 14:17:17
 * @version $Id$
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {getRegion,getXyblqk} from 'count/api/yxtj'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	xq: '',
	sylx: '',
  dqData: '',
  xyData: '',
  xyData1: '',
  title: ['省份','实到','应到','百分比'],
  tableTitle: ['省份','应到','实到','百分比']
  },
  mutations: {
    set_xq (state, val) {
      state.xq = val
    },
    sylxset_sylx(state, val) {
      state.sylx = val
    },
    set_dqData(state, val) {
      Vue.set(state, 'dqData', val)
    },
    set_xyData(state, val) {
      Vue.set(state, 'xyData', val)
    },
    set_xyData1(state, val) {
      Vue.set(state, 'xyData1', val)
    },
    set_title(state, val) {
      state.title = val
    },
    set_tableTitle(state, val) {
      state.tableTitle = val
    }
  },
  actions: {
    set_xq ({ commit }, val) {
      commit('set_xq', val)
    },
    sylxset_sylx ({ commit }, val) {
      commit('sylxset_sylx', val)
    },
    set_dqData ({ commit }, val) {
      commit('set_title', [val.p.type==1?'省份':'学院','实到','应到','百分比'])
      return new Promise((resolve) => {
        getRegion(val).then((res) => {
          if(res.title){
            commit('set_title', res.title)
          }else{
            commit('set_title', [val.p.type==1?'省份':'学院','实到','应到','百分比'])
          }
          if(res.code == '40001'){
            if(val.p.type==1){
              commit('set_dqData', res.content)
            }else if(val.p.type==2){
              commit('set_xyData', res.content)
            }
          }else{
            if(val.p.type==1){
              commit('set_dqData', '')
            }else if(val.p.type==2){
              commit('set_xyData', '')
            }
          }
          resolve()
        })
      })
    },
    set_xyData ({ commit }, val) {
      commit('set_tableTitle', [val.p.type==1?'省份':'学院','实到','应到','百分比'])
      commit('set_xyData1', [])
      getXyblqk(val).then((res) => {
        if(res.code == '40001'){
          if(res.title){
            console.log(res)
            commit('set_tableTitle', res.title)
          }
          commit('set_xyData1', res.content)
        }
      })      
    }
  },
  getters: {
    get_xq: state => {
      return state.xq
    },
    get_sylx: state => {
    	return state.sylx
    },
    get_dqData: state => {
      return state.dqData
    },
    get_xyData: state => {
      return state.xyData
    },
    get_xyData1: state => {
      return state.xyData1
    },
    get_title: state => {
      return state.title
    },
    get_tableTitle: state => {
      return state.tableTitle
    }
  }
})

export default store