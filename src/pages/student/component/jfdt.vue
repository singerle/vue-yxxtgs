<!-- 缴费大厅 -->
<template>
	<div class="bdlc-xcjf">
    	<div class="top">
    		<div class="text">
    			<p>应交金额（元）</p>
    			<p>已交金额（元）</p>
    		</div>
    		<div class="money">
    			<p>{{total}}</p>
    			<p>{{yijiaoqian}}</p>
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
    			<li v-for="(item,index) in info">
    				<span>{{item.fymc}}</span>
    				<span>{{item.yjfy}}</span>
    				<span>{{item.yjje}}</span>
    				<span>{{item.qfje}}</span>
    			</li>
    		</ul>
    	</div>
    	<div class="prement">
    		<h3>新同学：你好！</h3>
    		<p>
				<span style="display:inline-block;text-indent: 2em">欢迎加入重庆工商大学，当你看到本页面缴费数据后即可进行缴费,学校为你提供以下3种缴费方式:</span>
				</br>
				1、按照入学须知要求，把学费打入指定银行卡，通过银行代扣；</br>
				2、网上自助缴费:</br>
				（1）关注“重庆工商大学财务处”公众号，通过微信缴费</br>
				（2）登录学校门户（网址：http://portal.ctbu.edu.cn）进入“财务系统”中的“统一支付平台”自主进行网上缴费，支付方式有银联卡支付、微信支付两种方式；</br>
				3、到校后到指定地点缴费（费时费力，不推荐）。</br>
				注：新生编学号后就有正式帐户了，用户名为学号，密码统一为ctbu+身份证后六位(如 ctbu123456)
	    	</p>
    	</div>
<!-- 		<div class="qwjf">
			<router-link to="/jfdtEwm">
				<span>前往缴费</span>
			</router-link>
  		</div> -->
	</div>
</template>

<script>
import {getJfdtData} from '@/pages/student/api/jfdt.js'
export default {
	name: 'bdlc-xcjf',
	data(){
		return {
			info:[
				// {fymc:"学费",yjje:4000,yjfy:"0",qfje:4000,hjje:0,jffs:"现场"},
				// {fymc:"书费",yjje:500,yjfy:"0",qfje:500,hjje:0,jffs:"现场"},
				// {fymc:"伙食费",yjje:1000,yjfy:"0",qfje:1000,hjje:0,jffs:"现场"},
				// {fymc:"补课费",yjje:1000,yjfy:"0",qfje:1000,hjje:0,jffs:"现场"},
				// {fymc:"聚餐费",yjje:250,yjfy:"0",qfje:250,hjje:0,jffs:"现场"},
				// {fymc:"住宿费",yjje:1250,yjfy:"0",qfje:1250,hjje:0,jffs:"现场"}
				]
		}
	},
	computed:{
		total(){
			var sum = 0
			for(var i = 0;i < this.info.length;i++){
				sum += this.info[i].yjfy
			}
			if(sum>=1000){
				var str = sum.toString()
				sum = Math.floor(sum/1000) + "," + str.substring(str.length-3)
			}
			return sum==0?0:sum+".00"
		},
		yijiaoqian(){
			var sum = 0
			for(var i = 0;i < this.info.length;i++){
				sum += this.info[i].yjje
			}
			if(sum>=1000){
				var str = sum.toString()
				sum = Math.floor(sum/1000) + "," + str.substring(str.length-3)
			}
			return sum==0?0:sum+".00"
		}
	},
	methods:{
		getData(){
			getJfdtData().then((res) => {
				console.log(res);
				if(res.code==='40001'){
					console.log(res.message)
					this.info = res.content
				}else{
					console.log('data error')
				}
			})
		}
	},
	created(){
		this.getData()
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
		overflow:auto
		padding-bottom:2rem
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
					height:.44rem
					text-align:center
					display:flex
					align-items:center
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
		.qwjf
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