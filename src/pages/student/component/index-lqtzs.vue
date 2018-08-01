<template>
	<div class="bgcolor">
		<ul class="main-info">
			<li><span>快递公司</span><span>{{company}}</span></li>
			<li><span>快递单号</span><span>{{ticket}}</span>
				<button v-show="info.kddh" v-clipboard:copy="ticket"
      					v-clipboard:success="onCopy"
      					v-clipboard:error="onError" 
      					style="background:rgb(255, 255, 255);border:1px solid #cfcfcf;padding-left:12px;padding-right: 12px;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);:focus{outline:0;}">复制</button>
			</li>
		</ul>
		<div class="no-data" v-show="datalist.length == 0 || info.kddh == 'undefined'">
			<img src="static/student-index-pictures/lqtzs-pic.png">
			<p>暂无数据，请及时更新~</p>
		</div>
		<div class="haveData" v-show="datalist">
			<ul>
				<li v-for="item,index in datalist">
					<div class="ball"></div>
					<div class="leftborder">
						<div class="content">
							<p>{{item.AcceptStation}}</p>
							<p class="time">{{item.AcceptTime}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<transition name="fade">
			<div class="success" v-show="isShow">复制成功</div>
		</transition>
	</div>
</template>

<script type="text/javascript">
	import {getLqtzs} from "@/pages/student/api/lqtzs.js"
	export default{
		name:'index-lqtzs',
		data(){
			return {
				datalist:'',
				info:'',
				ticket:'无',
				company:'无',
				isShow:''
			}
		},
		methods:{
			getData(){
				getLqtzs().then((res) => {
					if(res.code==='40001'){
						this.info = res.content
						this.datalist = res.content.Traces.reverse()
						if(this.info.kddh){
							this.ticket = this.info.kddh
						}
						if(this.info.wlgs){
							this.company = this.info.wlgs
						}
					}else{
						console.log("getdata error")
					}
				})
			},
			onCopy(e){
				this.isShow = true
				setTimeout(()=>{
					this.isShow = false
				},2000)
			},
			onError(e){
			  alert('Failed to copy texts')
			}
		},
		created(){
			this.getData()
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.bgcolor
		position:fixed
		top:0
		bottom:0
		width:100%
		background:#f7f7f7
		border-top:.01rem solid #E9E9E9
		overflow:scroll
		.main-info
			padding:0 .12rem
			background:#fff
			li
				font-size:.16rem
				color:#999999
				font-family:PingFang-SC-Medium
				line-height:.44rem
				display:flex
				align-items:center
				border-bottom:.01rem solid #e9e9e9
				span:nth-of-type(2)
					color:#333
					margin:0 .12rem	
				span:nth-of-type(3)
					font-size:.1rem
					font-family:PingFang-SC-Bold
					font-weight:bold
					color:#333
					width:.52rem
					line-height:.2rem
					text-align:center
					border:.01rem solid #cfcfcf
				button:focus
					outline:0
			li:last-child
				border:0
		.no-data
			margin-top:.75rem
			img
				display:block
				margin:0 auto .43rem
			p
				font-family:PingFang-SC-Bold
				font-weight:bold
				font-size:.15rem
				color:#777777
				line-height:.15rem
				text-align:center
		.haveData
			margin-top:.1rem
			background:#fff
			ul
				width:calc(100% - .3rem)
				margin:0 auto
				li
					position:relative
					.ball
						position:absolute
						width:.08rem
						height:.08rem
						background:#CFCFCF
						border-radius:50%
						top:.25rem
						left:-.03rem
					.leftborder
						border-left:.02rem solid #ECECEC
						.content
							margin-left:.2rem
							border-bottom:.01rem solid #ECECEC
							color:#999999
							font-size:.14rem
							line-height:.28rem
							padding:.15rem 0
							.time
								font-size:.12rem
								line-height:.24rem
				li:nth-of-type(1)
					.ball
						position:absolute
						width:.16rem
						height:.16rem
						background:#3DA8F5
						border-radius:50%
						top:.21rem
						left:-.06rem
					.leftborder
						.content
							color:#3DA8F5
		.success
			position:fixed
			margin:auto
			top:0
			left:0
			right:0
			bottom:0
			width:1.08rem
			height:.4rem
			border-radius:.06rem
			background:rgba(0, 0, 0, .7)
			line-height:.4rem
			text-align:center
			font-size:.14rem
			color:#fff
		.fade-enter-active,.fade-leave-active
			transition:opacity .5s
		.fade-enter,.fade-leave-to
			opacity:0
</style>