<template>
    <div class="home">
		<topSelect :xqList="xqList" @refresh="getHomeInfo"></topSelect>
		<vHeader @Jump="Jump" :data="header" v-if="header" class="home-header"></vHeader>
		<div class="home-content">
			<vxslxObj v-for="(item,i) in sylx" :data="item" class="mb10" :key="'xslx'+i"></vxslxObj>
      <!-- <hjObj class="mb10" :data="qsbl" :titleD="{name:'寝室办理',func_dq:'getXqssbl',func_xy:'getXyssbl'}" v-if="qsbl.length>0"></hjObj> -->
      <hjObj class="mb10" :data="xbbl" :titleD="{name:'新生男女比例',func_dq:'getXqnnbl',func_xy:'getXqnnbl'}" v-if="xbbl.length>0"></hjObj>
			<hjObj class="mb10" :data="bdjt" :titleD="{name:'接站统计',func_dq:'getXqbdjt',func_xy:'getXybdjt'}" v-if="bdjt.length>0"></hjObj>
			<!-- <hjObj class="mb10" :data="cwjf" :titleD="{name:'财务缴费',func_dq:'getXqjfqk',func_xy:'getXyjfqk'}" v-if="cwjf.length>0"></hjObj> -->
      <!-- <hjObj class="mb10" :data="bxgm" :titleD="{name:'保险购买',func_dq:'getXqbxgm',func_xy:'getXybxgm'}" v-if="bxgm.length>0"></hjObj>
      <hjObj class="mb10" :data="lstd" :titleD="{name:'绿色通道',func_dq:'getXqlstd',func_xy:'getXylstd'}" v-if="lstd.length>0"></hjObj> -->
		</div>
    </div>
</template>

<script type="ecmascript-6">
import topSelect from './topSelect'
import vHeader from './header'
import vxslxObj from './xslxObj'
import hjObj from './hjObj'
import { mapActions } from 'vuex'
import { getXqlb, getHomeInfo } from 'count/api/yxtj'
export default {
  name: '',
  data () {
    return {
      xqList: [],
      header: '',
      sylx: '',
      bxgm: [],
      cwjf: [],
      lstd: [],
      qsbl: [],
      bdjt: [],
      xbbl: []
    }
  },
  created(){
    getXqlb().then((res) => {
      if(res.code == '40001'){
        this.xqList = res.content
        this.set_xq(this.xqList[0])
        this.getHomeInfo(this.xqList[0])
      }
    })
  },
  methods: {
    ...mapActions([
      'set_xq'
      ]),
  	Jump(){
  		this.$router.push('/region')
  	},
    getHomeInfo(xq){
      this.bxgm = []
      this.cwjf = []
      this.lstd = []
      this.qsbl = []
      this.bdjt = []
      this.xbbl = []
      getHomeInfo({xq: encodeURI(xq)}).then((res) => {
        if(res.code == '40001'){
          this.header = res.content.all
          this.sylx = res.content.sylx
          this.bdjt = res.content.bdjt
          //财务缴费
          for(var key in res.content.cwjf){
            if(key=='wjf'){
              this.cwjf[1] = {bl: res.content.cwjf[key],key: '未缴费',color: '#68CCA0',zrs: res.content.cwjf.zrs}
            }else if(key=='yjf'){
              this.cwjf[0] = {bl: res.content.cwjf[key],key: '已缴费',color: '#80BDF6',zrs: res.content.cwjf.zrs}
            }
          }
          //保险购买
          for(var key in res.content.bxgm){
            if(key=='ybl'){
              this.bxgm.push({bl: res.content.bxgm[key],key: '已办理',color: '#68CCA0',zrs: res.content.bxgm.zrs})
            }else if(key=='yfq'){
              this.bxgm.push({bl: res.content.bxgm[key],key: '已放弃',color: '#80BDF6',zrs: res.content.bxgm.zrs})
            }else if(key=='ysq'){
              this.bxgm.push({bl: res.content.bxgm[key],key: '已申请',color: '#EA635D',zrs: res.content.bxgm.zrs})
            }
          }
          //绿色通道
          for(var key in res.content.lstd){
            if(key=='ybl'){
              this.lstd.push({bl: res.content.lstd[key],key: '已办理',color: '#68CCA0',zrs: res.content.lstd.zrs})
            }else if(key=='yfq'){
              this.lstd.push({bl: res.content.lstd[key],key: '已放弃',color: '#80BDF6',zrs: res.content.lstd.zrs})
            }else if(key=='ysq'){
              this.lstd.push({bl: res.content.lstd[key],key: '已申请',color: '#EA635D',zrs: res.content.lstd.zrs})
            }
          }
          //寝室办理
          for(var key in res.content.qsbl){
            if(key=='ybl'){
              this.qsbl[0] = {bl: res.content.qsbl[key],key: '已办理',color: '#68CCA0',zrs: res.content.qsbl.zrs}
            }else if(key=='wbl'){
              this.qsbl[1] = {bl: res.content.qsbl[key],key: '未办理',color: '#80BDF6',zrs: res.content.qsbl.zrs}
            }
          }
          //报道交通
          var _bdjt = res.content.bdjt
          for(var i=0,l=_bdjt.length;i<l;i++){
            this.bdjt[i] = {jtzd:_bdjt[i].jtzd,djrs:_bdjt[i].djrs,bdrs:_bdjt[i].bdrs,wbdrs:_bdjt[i].djrs-_bdjt[i].bdrs} 
          }
          // for(var key in res.content.bdjt){
          //   if(key=='ybl'){
          //     this.qsbl[0] = {bl: res.content.qsbl[key],key: '已办理',color: '#68CCA0',zrs: res.content.qsbl.zrs}
          //   }else if(key=='wbl'){
          //     this.qsbl[1] = {bl: res.content.qsbl[key],key: '未办理',color: '#80BDF6',zrs: res.content.qsbl.zrs}
          //   }
          // }
          //男女比例
          var _xbbl = res.content.xbbl
          // console.log(res.content.xbbl)
          // this.xbbl[0]={bl:2,key:'男',color:'#95BAF3',zrs:10}
          // this.xbbl[1]={bl:8,key:'女',color:'#FFABBF',zrs:10}
          for(var i = 0;i < 2;i++){
            for(var key in res.content.xbbl[i]){
              if(key=='xb'&&res.content.xbbl[i][key]=='男'){
                this.xbbl[0] = {bl: res.content.xbbl[i]['lqrs'],key: '男',color: '#95BAF3',zrs: _xbbl[0].lqrs+_xbbl[1].lqrs}
                console.log(_xbbl)
              }else if(key=='xb'&&res.content.xbbl[i][key]=='女'){
                this.xbbl[1] = {bl: res.content.xbbl[i]['lqrs'],key: '女',color: '#FFABBF',zrs: _xbbl[0].lqrs+_xbbl[1].lqrs}
                console.log(_xbbl)
              }
            }
          }
        }
      })
    }
  },
  components: { topSelect, vHeader, vxslxObj, hjObj}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.home-header
	margin-top: .44rem
.home-content
	background: #f7f7f7
	padding: .12rem
</style>