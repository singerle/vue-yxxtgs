<template>
    <div class="major">
		<table>
			<tr>
				<th v-for="item in get_tableTitle">{{item}}</th>
			</tr>
			<tr v-for="item in get_xyData1">
				<td>{{item.zy}}</td>
        <td>{{item.sd}}</td>
				<td>{{item.yd}}</td>
				<td v-if="item.yfqrs>=0">{{item.yfqrs}}</td>
				<td>{{((item.sd/item.zrs)*100).toFixed(2)}}%</td>
			</tr>
		</table>
    </div>
</template>

<script type="ecmascript-6">
import { getXybdqk } from 'count/api/yxtj'
import { mapGetters,mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
    	data: '',
    	xybh: this.$route.query.xybh
    }
  },
  computed: {
  	...mapGetters([
  		'get_sylx',
  		'get_xyData1',
  		'get_tableTitle'
  		])
  },
  activated(){
  	if(this.xybh != this.$route.query.xybh){
  		this.xybh = this.$route.query.xybh
  		this.getXybdqk()
  		return false
  	}
  	this.getXybdqk()
  },
  // created(){
  // 	this.getXybdqk()
  // },
  methods: {
  	...mapActions([
  		'set_xyData'
  		]),
  	getXybdqk(){
  		if(this.$route.query.key){
        console.log(0)
  			let k = JSON.parse(this.$route.query.key)
  			this.set_xyData({func: k.func_xy,p: {xybh: this.xybh}})
  			return false
  		}
      console.log(1)
  		this.set_xyData({func: 'getXybdqk',p:{xybh:this.xybh,sylx: encodeURI(this.get_sylx)}})
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.major
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
				text-overflow: ellipsis
				white-space: nowrap
			th
				font-size: 16px
			td
				text-align: center
				font-size: 14px
		color: #888888
		>tr:nth-of-type(even)
			background: #F4F7F9
</style>