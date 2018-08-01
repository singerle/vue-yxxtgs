<!-- 入学准备-保险购买完成页面 -->
<template>
	<div class="wrap">
		<p>
			<img src="static/student-index-pictures/bxgm-complete.png">
			<span>当前已自愿购买保险</span>
		</p>
		<ul>
			<li v-for="(item,i) in data"><span>{{item.fymc}}</span><span>{{item.yjfy}}元</span></li>
		</ul>
		<div class="return" @click="$router.go(-1)">
			<span>返回首页</span>
  		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import {completeProcess} from 'student/api/completeSendData.js'
export default {	
  	name: 'rxzb-bxgm-complete',
  	props: ['data'],
  	created(){
  		completeProcess({pauId:this.$store.getters.getHjid})
  	},
  	methods:{
	  	message(){
	  		MessageBox({
	  			title: '您是否确认自愿购买保险？',
	  			message: '一旦确认无法更改',
	  			showCancelButton: false
			});
	  	},
  	}  
}
</script>
<style  scoped lang="stylus" rel="stylesheet/stylus">
	.wrap
		position:fixed
		top:0
		bottom:0
		width:100%
		background:#f7f7f7
		border-top:.01rem solid #E9E9E9 
		p
			display:flex
			justify-content:center
			align-items:center
			height:.8rem
			font-size:.17rem
			fotn-family:PingFang-SC-Medium
			color:#333333
			img
				margin-right:.06rem
				width:.18rem
				height:.18rem
		ul
			background:#fff
			li
				width:calc(100% - .3rem)
				margin:0 auto
				border-bottom:.01rem solid #E9E9E9
				display:flex
				justify-content:space-between
				align-items:center
				height:.44rem
				span:first-child
					font-size:.16rem
					color:#333333
				span:last-child
					font-size:.14rem
					color:#999999
			li:last-child
				border:0
		.return
			width:calc(100% - 2 * .57rem)
			background:#3DA8F5
			height:.46rem
			border-radius:.23rem
			margin:0 auto
			text-align:center
			font-size:.17rem
			margin-top:.2rem
			span
				color:#fff
				line-height:.45rem
</style>