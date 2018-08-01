<!-- 报道流程-现场缴费页面 -->
<template>
	<div class="bdlc-xcjf">
		<popup @event="cancleProup" v-show="popupVisible"></popup>
    	<div class="top">
    		<div class="text">
    			<p>应交金额（元）</p>
    			<p>已交金额（元）</p>
    		</div>
    		<div class="money">
    			<p>6,000.00</p>
    			<p>0</p>
    		</div>
    	</div>
    	<div class="detail">
    		<ul>
    			<li>
    				<span>费用名称</span>
    				<span>应交金额</span>
    				<span>已交金额</span>
    				<span>欠费金额</span>
    			</li>
    			<li>
    				<span>教材费</span>
    				<span>5000</span>
    				<span>0</span>
    				<span>5000</span>
    			</li>
    			<li>
    				<span>住宿费</span>
    				<span>1000</span>
    				<span>0</span>
    				<span>1000</span>
    			</li>
    		</ul>
    	</div>
    	<div class="prement">
    		<h3>缴费方式：</h3>
    		<p>报到时前往现场进行线下缴费</p>
    	</div>
	</div>
</template>

<script>
import popup from "@/pages/student/component/common/xcbdPopup.vue"
import { completeProcess } from 'student/api/completeSendData.js'
export default {
	name: '',
	components:{popup},
	data(){
		return {
			popupVisible:false,
			showdiffent:"banli"
		}
	},
	methods:{
		cancleProup(){
			this.popupVisible = false
		}
	},
	activated(){
		completeProcess({pauId:this.$store.getters.getHjid})
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.bdlc-xcjf
		position:fixed
		bottom:0
		top:0
		width:100%
		background:#f7f7f7
		.top
			padding:0 .12rem
			background:#3FB4FF
			text-align:center
			.text
				display:flex
				font-family:PingFang-SC-Bold
				font-size:.16rem
				font-weight:bold
				color:rgba(255,255,255,.7)
				padding:.14rem 0
				p
					width:50%
			.money
				display:flex
				font-family:PingFang-SC-Medium
				font-size:.3rem
				color:#fff
				padding-bottom:.3rem
				p
					width:50%
		.detail
			margin-top:.1rem
			background:#fff
			ul
				li
					font-family:PingFang-SC-Medium
					color:#333
					font-size:.13rem
					line-height:.44rem
					text-align:center
					display:flex
					border-bottom:.01rem solid #F5F5F5
					span
						width:25%
				li:first-child
					font-size:.14rem
					font-family:PingFang-SC-Bold
					span
						font-weight:bold
				li:last-child
					border:0
		.prement
			padding:0 .12rem
			h3
				color:#333
				font-family:PingFang-SC-Bold
				font-weight:bold
				font-size:.16rem
				margin:.3rem 0 .07rem
			p
				font-family:PingFang-SC-Medium
				font-size:.13rem
				line-height:.24rem
</style>