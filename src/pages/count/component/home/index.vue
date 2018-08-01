<template>
    <div class="home">
		<topSelect :xqList="xqList" @refresh="getHomeInfo"></topSelect>
		<vHeader @Jump="Jump" :data="header" v-if="header" class="home-header"></vHeader>
		<div class="home-content">
			<vxslxObj v-for="(item,i) in sylx" :data="item" class="mb10" :key="'xslx'+i"></vxslxObj>
			<hjObj class="mb10" :data="cwjf" :titleD="{name:'财务缴费',func_dq:'getXqjfqk',func_xy:'getXyjfqk'}" v-if="cwjf.length>0"></hjObj>
      <hjObj class="mb10" :data="bxgm" :titleD="{name:'保险购买',func_dq:'getXqbxgm',func_xy:'getXybxgm'}" v-if="bxgm.length>0"></hjObj>
      <hjObj class="mb10" :data="lstd" :titleD="{name:'绿色通道',func_dq:'getXqlstd',func_xy:'getXylstd'}" v-if="lstd.length>0"></hjObj>
      <hjObj class="mb10" :data="qsbl" :titleD="{name:'寝室办理',func_dq:'getXqssbl',func_xy:'getXyssbl'}" v-if="qsbl.length>0"></hjObj>
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
      xbbl: '',
      bxgm: [],
      cwjf: [],
      lstd: [],
      qsbl: [],
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
      this.xbbl = []
      getHomeInfo({xq: encodeURI(xq)}).then((res) => {
        if(res.code == '40001'){
          this.header = res.content.all
          this.sylx = res.content.sylx
          this.xbbl = res.content.xbbl
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