<!-- 保险购买-放弃购买 -->
<!-- 放弃购买并确认不购买后的短信验证码交互界面 -->
<template>
	<div class="bgcolor">
		<div class="wrap">
			<p>自愿放弃购买保险，需亲属审核并同意协议</p>
			<p>验证码将发送至您亲人的手机，请向您的亲属询问验证码</p>
			<p><span class="qsxm">{{qsxx?qsxx.qsxm:''}}</span>&nbsp;<span class="phoneNum">{{qsxx?qsxx.jzdh:''}}</span></p>
			<div class="checkCode">
				<input type="text" name="" v-model="yzm" placeholder="请输入验证码">
				<!-- sendCode这一块由于样式不会变化，根据需要动态改变值就行了 -->
				<div class="sendCode" @click="showTxyzm">发送验证码</div>
			</div>
<!-- 			<div class="success">
				<p>发送成功，请在15分钟内使用验证码验证</p>
			</div> -->
		</div>
		<!-- 提供class默认提交tijiaoHui样式,改变为tijiao样式改变，且变为可点击 -->
		<div class="tijiaoHui" @click="tjsq">提交</div>
		<div class="txyzm" v-show="txyzmPopu" @click="close">
			<div @click.stop>
				<div class="txyzm-header">
					请输入图形验证码
				</div>
				<div class="txyzm-content">
					<span class="txyzm-content-img textCenter">
						<img v-bind:src="txyzmUrl">
						<div class="mt10 ft-12" @click="refresh">点击图片刷新</div>
					</span>
					<span class="txyzm-content-input">
						<input v-model="txyzm">
					</span>
					<div class="mt40 textCenter ft-12" v-if="result===1">验证信息成功</div>
					<div class="mt40 textCenter ft-12" v-else-if="result===2">验证信息失败</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getBxyzmData,sendSjyzmData,sendFqgmbxData} from 'student/api/bxgm'
	export default {
	  name: 'rxzb-bxgm-fqgm-jh1',
	  data() {
	  	return {
	  		txyzmPopu: false,
	  		//图形验证码地址
	  		txyzmUrl: '',
	  		//ticket
	  		ticket: '',
	  		//验证结果
	  		result: '',
	  		txyzm: '',
	  		qsxx: this.$store.getters.getqsxx,
	  		yzm: ''
	  	}
	  },
	  watch: {
	  	txyzm(val, old) {
	  		if(val.length==4){
	  			sendSjyzmData({pj: this.ticket,yzm: this.txyzm,sjh: this.qsxx.jzdh}).then((res) => {
	  				if(res.code == '40001'){
						this.result = 1
						setTimeout(() => {
							this.txyzm = ''
							this.txyzmPopu = false
						},1000) 
	  				}else{
	  					this.result = 2
	  				}
	  			})
	  		}
	  	}
	  },
	  methods: {
	  	showTxyzm(){
	  		getBxyzmData().then((res) => {
	  			this.txyzmUrl = res.content.url
	  			this.ticket = res.content.ticket
	  		})
	  		this.txyzmPopu = true
	  	},
	  	fsyzm(){
	  		
	  	},
	  	refresh(){
	  		this.showTxyzm()
	  	},
	  	close(){
	  		this.txyzmPopu = false
	  	},
	  	//提交申请
	  	tjsq() {
	  		if(!this.yzm){
	  			this.$Toast('请输入验证码')
	  			return false
	  		}
	  		sendFqgmbxData({yzm: this.yzm,id: this.$store.getters.getHjid}).then((res) => {
	  			if(res.code == '40001'){
	  				this.$Toast('已放弃购买')
	  				this.$router.go(-2)
	  			}else{
	  				this.$Toast('提交失败')
	  			}
	  		})
	  	}
	  }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.bgcolor
	position:fixed
	top:0
	bottom:0
	width:100%
	border-top:.01rem solid #F2F2F2
	background:#f7f7f7
	.wrap
		background:#fff
		padding:0 .12rem
		p
			font-size:.13rem
			line-height:.13rem
		p:nth-of-type(1)
			color:#555555
			font-family:PingFang-SC-Bold
			font-weight:bold
			padding:.25rem 0 .08rem
		p:nth-of-type(2)
			color:#999999
			font-family:PingFang-SC-Medium
			font-weight:Medium
		p:nth-of-type(3)
			font-family:PingFang-SC-Bold
			font-weight:bold
			color:#555555
			font-size:.2rem
			padding:.14rem 0 .34rem
			line-height:.2rem
		.checkCode
			height:.3rem
			padding-bottom:.12rem
			display:flex
			justify-content:space-between
			align-items:center
			border-bottom:.01rem solid #ececec
			input
				font-family:PingFang-SC-Regular
				font-weight:Regular
				font-size:.2rem
				outline:none
				border:0
				color:#555555
			.sendCode
				width:.8rem
				height:.3rem
				background:#3DA8F5
				border-radius:.14rem
				font-family:PingFang-SC-Bold
				font-weight:bold
				color:#ffffff
				font-size:.11rem
				line-height:.3rem
				text-align:center
				margin-right:.12rem
		.success
			width:100%
			height:.5rem
			p
				font-family:PingFang-SC-Medium 
				font-size:.11rem
				font-weight:Medium
				height:.11rem
				line-height:.11rem
				color:#FE4124
				padding-top:.1rem
	.tijiaoHui
		width:calc(100% - .24rem)
		margin-top:.2rem
		text-align:center
		line-height:.46rem
		height:.46rem
		color:#999999
		font-size:.17rem
		font-family:PingFang-SC-Medium
		font-weight:Medium
		border-radius:.06rem
		border:.01rem solid #cfcfcf
		margin:.2rem auto
	.tijiao
		width:calc(100% - .24rem)
		margin-top:.2rem
		text-align:center
		line-height:.46rem
		height:.46rem
		color:#ffffff
		font-size:.17rem
		font-family:PingFang-SC-Medium
		font-weight:Medium
		border-radius:.06rem
		margin:.2rem auto
		background:#3DA8F5
		box-shadow:.01rem .01rem .02rem rgba(85, 178, 245, 0.5)
.txyzm
	position: fixed
	top: 0
	bottom: 0
	color: #2184C5
	background: rgba(0,0,0,.2)
	width: 100%
	z-index: 999
	>div
		position: absolute
		background: white
		width: 70%
		padding-bottom: .3rem
		margin: 0 auto
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		border-radius: 5px
		input
			outline: none
		.txyzm-header
			padding: .1rem
			background: #F6F8F9
			border-top-radius: 5px
		.txyzm-content
			padding: .1rem 0
			>.txyzm-content-img
				display: inline-block
				width: 1rem
				height: .26rem
				vertical-align: middle
				>img
					width: 100%
			>.txyzm-content-input
				display: inline-block
				margin-left: .2rem
				width: 1rem
				border: 1px solid #2184C5
				border-radius: 3px
				vertical-align: middle
				input
					width: 100%
</style>