<template>
    <div class="hjObj">
    	<header>
    		<span class="ft-bold ft-14">{{titleD.name}}</span>
    		<span class="fr ft-12 my-color-gray" @click="togo(titleD)">更多</span>
    	</header>
    	<div class="hjObj-content">
    		<div class="hjObj-content-chart">
    			<div class="hjObj-bj mt12">
    				<span class="hjObj-bj-obj" v-for="item in data">
    					<span :style="{background: item.color}"></span>
	    				<span>{{item.key}}</span>
	    			</span>
    			</div>
    			<div class="hjObj-chart">
    				<pie :option="pieOption" v-if="pieOption"></pie>
    			</div>
    		</div>
    		<div class="hjObj-content-mes">
    			<table>
	    			<tr>
	    				<th>状态</th>
	    				<th>人数</th>
	    				<th>占比</th>
	    			</tr>
	    			<tr :class="{mt20:i==0}" v-for="(item,i) in data">
	    				<td>{{item.key}}</td>
	    				<td>{{item.bl}}</td>
	    				<td>{{((item.bl/item.zrs)*100).toFixed(2)}}%</td>
	    			</tr>
    			</table>
    		</div>
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import pie from '@/base/pie/pie'
export default {
  name: '',
  data () {
    return {
    }
  },
  computed: {
  	pieOption(){
  		if(this.data.length<=0){
  			return false
  		}
  		let d = []
  		let color = []
  		this.data.forEach((r, i) => {
  			d.push({name: r.key, y: r.bl})
  			color.push(r.color)
  		})
  		let option =  {
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
							pie: {
									colors: color,
									cursor: 'pointer',       // 鼠标样式
									dataLabels: {
											enabled: false
									},
									states: {
										hover: {
											enabled: true,
											halo: {
												size: 3
											}
										}
									}
							}
					},
					chart: {
						height: 110,
						margin: [0,0,10,0]
					},
					series: [{
							type: 'pie',
							name: `${this.titleD.name}占比`,
							data: d
					}]
			  	}
	  	return option
  	}
  },
  props: ['data','titleD'],
  methods: {
  	togo(key){
  		this.$router.push({path: '/region',query:{data: JSON.stringify(key)}})
  	}
  },
  components: { pie }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.hjObj
	padding: .12rem .15rem
	height: 1.76rem
	background: white
	box-shadow: 0 1px 0 #ececec
	border-radius: 0.03rem
	header
		padding-bottom: 0.06rem
		border-bottom: 1px solid #ececec
	.hjObj-content
		display: flex
		height: 1.45rem
		align-items: center
		.hjObj-content-chart
			flex: 2
			height: 100%
			.hjObj-bj
				font-size: 12px
				color: #555555
				height: .3rem
				.hjObj-bj-obj
					display: inline-block
					width: 50%
					margin-bottom: 0.05rem
					float: left
					>span:first-child
						display: inline-block
						width: .12rem
						height: .12rem
						background: red
						vertical-align: middle
						margin-bottom: 0.03rem
			.hjObj-chart
				height: calc(100% - .42rem)
		.hjObj-content-mes
			height: 100%
			flex: 3
			table
				font-size: 12px
				color: #555555
				width: 100%
				margin-top: .12rem
				tr
					display: flex
					td,th
						flex: 1
					th
						color: #3DA8F5
					td
						padding: .1rem 0
						text-align: center
</style>