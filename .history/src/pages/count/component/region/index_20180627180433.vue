<template>
    <div class="region">
    	<navbar :types="types" type="jf" @getData="getData"></navbar>
    	<div v-if="activeIndex == 0" class="regionContent">
    		<div class="regionContent-header">
    			<pie :option="pieOption" v-if="pieOption" ref="pie"></pie>
    		</div>
    		<div class="regionContent-table">
    			<div>
    				<table>
    					<tr>
    						<th v-for="item in get_title">{{item}}</th>
    					</tr>
    					<tr v-for="item in dqfb">
    						<td>{{item.sf}}</td>
                <td>{{item.sd}}</td>
    						<td>{{item.yd}}</td>
                <td v-if="item.fq>=0">{{item.fq}}</td>
    						<td>{{((item.sd/item.zrs)*100).toFixed(2)}}%</td>
    					</tr>
    				</table>
    			</div>
    		</div>
    	</div>
    	<div v-else-if="activeIndex == 1" class="regionContent">
    		<div class="collegeContent-header">
    			<count :data="progress"></count>
    		</div>
    		<div class="regionContent-table">
    			<div>
    				<table>
    					<tr>
    						<th v-for="item in get_title">{{item}}</th>
    					</tr>
    					<tr v-for="item in progress">
    						<td>{{item.xy}}</td>
                <td>{{item.sd}}</td>
    						<td>{{item.yd}}</td>
                <td v-if="item.yfqrs>=0">{{item.yfqrs}}</td>
    						<td>{{((item.sd/item.zrs)*100).toFixed(2)}}%<span class="iconfont icon-gengduo" @click="togo(item.xybh)"></span></td>
    					</tr>
    				</table>
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import navbar from '@/base/navbar/navbar'
import pie from '@/base/pie/pie'
import count from './count'
import { mapGetters ,mapActions} from 'vuex'
import { getXqbdqk } from 'count/api/yxtj'
let Highcharts = require('highcharts')

export default {
  name: '',
  data () {
    return {
      key: this.$route.query.data,
    	types: [{name: '按地区',type: 1,active: true}, {name: '按学院',type: 2,active: false}],
      snswType: ''
    }
  },
  activated(){
    if(this.key!=this.$route.query.data){
      this.key = this.$route.query.data
      this.types.filter((r,i) => {
        if(i>0){
          r.active = false
        }else{
          r.active = true
        }
      })
      this.getXqbdqk()
      return false
    }
    if(this.sylx != this.get_sylx){
      this.sylx = this.get_sylx
      this.types.filter((r,i) => {
        if(i>0){
          r.active = false
        }else{
          r.active = true
        }
      })
      this.getXqbdqk()
    }
  },
  computed: {
    ...mapGetters([
      'get_xq',
      'get_sylx',
      'get_dqData',
      'get_xyData',
      'get_title'
      ]),
    dqfb(){
      if(!this.get_dqData){
        return
      }
      return this.get_dqData && this.get_dqData.dqfb
    },
    snsw(){
      if(!this.get_dqData){
        return
      }
      return this.get_dqData && this.get_dqData.snsw
    },
    progress(){
      if(!this.get_xyData){
        return
      }
      return this.get_xyData && this.get_xyData
    },
  	activeIndex(){
  		return this.types.indexOf(this.types.filter(item => item.active)[0])
  	},
    pieOption(){
      var vm = this
      if(!this.snsw){
        return
      }
      let sn = {
                  name: '省内',
                  y: this.snsw.snrs
                }
      let sw = {
                  name: '省外',
                  y: this.snsw.swrs
                }
      let option = {
            title: {
                text: ''
            },
            tooltip: {
                  headerFormat: '{series.name}<br>',
                  pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                  text: ''
                },
            plotOptions: {
              series: {
                 cursor: 'pointer',
                 events: {
                  click: function(e) {
                    console.log(e.point.sliced)
                    vm.snswType = e.point.sliced?'':(e.point.index+1)
                    vm.getXqbdqk()
                  }
                 }
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',      // 鼠标样式
                    colors: ['#60C998', '#80dbf6'],
                    dataLabels: {
                        enabled: true,
                        distance: -45,
                        verticalAlign: 'middle',
                        y: -20,
                        format: '<b>{point.name}</b><br><b style="font-size:20px;">{point.percentage:.1f} %</b><br>{y}人',
                        style: {
                            color: 'white',
                        }
                    },
                    states: {
                      hover: {
                        enabled: true,
                        halo: {
                          size: 10
                        }
                      }
                    }
                }
            },
            chart: {
              height: 230,
              margin: [20,0,10,0]
            },
            series: [{
                type: 'pie',
                name: '占比',
                data: [sn,sw]
            }]
            }
      return option
      }
  },
  methods: {
    ...mapActions([
      'set_dqData'
      ]),
    getXqbdqk() {
      if(this.key){
        let k = JSON.parse(this.key)
        this.set_dqData({func: k.func_dq,p: {xq: encodeURI(this.get_xq),type: this.types.filter(item => item.active)[0].type,snsw: this.snswType}}).then((res) => {
          this.$refs.pie && this.$refs.pie.update()
        })
        return false
      }
      this.set_dqData({func: 'getXqbdqk',p: {xq: encodeURI(this.get_xq),type: this.types.filter(item => item.active)[0].type,sylx: encodeURI(this.get_sylx),snsw: this.snswType}}).then((res) => {
          this.$refs.pie && this.$refs.pie.update()
        })
    },
  	getData(i){
  		this.types.filter(item => item.active).forEach((r, i) => {
  			r.active = false
  		})
  		this.types[i].active = true
      this.getXqbdqk()
  	},
    togo(xybh){
      this.$router.push({path:'/major',query:{xybh: xybh,key: this.key}})
    }
  },
  components: { navbar, pie, count }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.regionContent
  background: #f7f7f7;
  .regionContent-header
    height: 2.49rem
    line-height: 2.49rem
    background: white
    box-shadow: 0 1px 0 #f7f7f7
  .regionContent-table
    background: #f7f7f7
    margin-top: .1rem
    >div
      background: white
      table
        width: 100% 
        > tr
          display: flex
          height: .44rem
          align-items: center
          th,td
            flex: 1
          th:first-child,td:first-child
            flex: 1.5
            overflow: hidden
          th
            font-size: 16px
          td
            text-align: center
            font-size: 14px
            color: #888888
        >tr:nth-of-type(odd)
          background: #F4F7F9
	</style>