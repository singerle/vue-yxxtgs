<!-- 入学准备-绿色通道 -->
<template>
	<div class="rxzb-lstd" >
		<message id="message" v-if="noData">
			<template slot="top">
				<p>1、若您已缴清所有费用，请等待10分钟后再进入此业务进行确认</p>
				<p>2、若您尚未缴清费用，请先去缴费</p>
			</template>
			<div slot="bottom">
				<p style="color:#fff" @click="noData=false">我知道了</p>
			</div>
		</message>
		<!-- <message id="message" v-if="haveData">
			<template slot="top">
				<p>1、若您已缴清所有费用，请等待10分钟后再进入此业务进行确认</p>
				<p>2、若您存在欠款情况，您是否确认办理绿色通道</p>
			</template>
			<div slot="bottom">
				<p style="color:#fff" @click="haveData=false">我知道了</p>
			</div>
		</message> -->
		<!-- <div class="wrappopu" v-if="tc">
			<div class="content" >
				<div class="top">
					<h3>您是否确认操作？</h3>
					<p>一旦确认无法更改</p>
				</div>
				<div class="xia">
					<p @click="tc_all(0)">取消</p>
					<p @click="tc_all(1)">确定</p>
				</div>
			</div>
		</div> -->
<!-- 		<div class="wrappopu" v-if="haveData" id="banli">
			<div class="content" >
				<div class="top">
					<p>1、若您已缴清所有费用，请等待10分钟后再进入此业务进行确认</p>
					<p>2、若您存在欠款情况，您是否确认办理绿色通道</p>
				</div>
				<div class="xia">
					<p @click="haveData = false">取消</p>
					<p @click="tc_all(1)">确认办理</p>
				</div>
			</div>
		</div> -->
		<div class="jfmx">
			<table>
				<tr>
					<th>费用名称</th>
					<th>应缴金额</th>
					<th>已缴金额</th>
					<th>欠费金额</th>
				</tr>
				<tr v-for="(item,i) in jfmx">
					<td>{{item.fymc}}</td>
					<td>{{item.yjfy}}</td>
					<td>{{item.yjje}}</td>
					<td>{{item.qfje}}</td>
				</tr>
			</table>
		</div>
		<!-- <img src="static/student-index-pictures/rxzb-lstd.png"> -->
		<div class="wrap">
	<!-- 		<p>为保障家庭经济困难新生顺利入学，学校专设“绿色通道”。</p>
			<p>对被录取入学、家庭经济困难、无力缴纳学费、住宿费和其他经批准收取的代收费（含只能部分缴清）的新生，报到时我校一律先办理入学手续，然后再根据核实后的情况，分别采取不同办法予以资助。</p> -->
			<div class="sqtj">
				<!-- <p>申请条件：</p> -->
				<p>1、已办理生源地助学贷款的学生请将贷款受理证明交到绿色通道办理点，地址：两江校区百味坊二楼。生源地贷款到账后（到账时间一般为11月）冲抵欠费的学费和住宿费后多余的部分返还贷款学生本人银行卡。</p>
				<p>2、在校申请校园贷款的学生请办理完成报到注册手续后向所在学院提出贷款申请;</p>
				<p>3、因其他原因在暂缓缴纳费用的学生请尽快完成费用的缴纳。</p>
			</div>
			<!-- <p>以上满足任意即可申请</p> -->
		</div>
		<!-- <div class="bottom" v-if="!blzt">
			<div class="left" @click="dj(3)">放弃</div>
			<div class="right" @click="dj(0)">申请</div>
		</div>
		<div class="ysq" v-else-if="blzt==2" @click="replay()">
			{{sqzt}}
			<span class="hui" v-show="hui">(重选)</span>
		</div>
		<div class="ysq" v-else-if="blzt==1">
			{{sqzt}}
		</div>
		<transition name="fade">
			<div class="success" v-if="TisShow">操作成功</div>
		</transition> -->
		<router-link to="/jfdtEwm">
			<div class="dibu" v-if="state==1 && (blzt==null||!blzt)">必缴项未缴清，前往缴费</div>
		</router-link>
		<div class="dibu" v-if="state==3 && (blzt==null||!blzt)" @click="tc_all(0)">我不办理</div>
		<div class="huiDibu" v-if="blzt==2">我不办理</div>
		<div class="dibu" v-if="state==2 && (blzt==null||!blzt)" @click="$router.push('/lstdSqyy')">申请￥{{je}}助学贷款</div>
		<div class="huiDibu" v-if="blzt==1">我已申请￥{{je}}助学贷款</div>
		<div class="huiDibu" v-if="state==4 && (blzt==null||!blzt)">学费暂未生成，无法办理</div>
<!-- 		<div class="dibu" v-if="state==0 && (blzt==null||!blzt)" @click="$router.push('/jfdtEwm')">前往缴费</div> -->
	</div>
</template>

<script>
import {setHjStu} from "student/api/getHjxx.js"
import {getLstd,sendLstdsq} from "student/api/lstd.js"
import message from '@/pages/student/component/common/popup.vue'
import {lstdzt} from 'student/api/lstd.js'
export default {
  name: 'rxzb-lstd',
  data(){
  	return {
  		// //操作成功提示
  		// TisShow:false,
  		// //控制底部显示哪个
  		// dbxs:true,
  		// //1已办理2已放弃3未处理
  		// blzt: '',
  		// sqzt:"已申请",
  		// hui:false,
  		// tc:false,
  		// bd:'',

  		//前往缴费
  		//0 前往缴费
  		state: '',
  		//贷款金额
  		je: '',
  		blzt: '',
  		jiaofei:false,
  		//缴费明细
  		jfmx: [],
  		//可点击的“我不办理”
  		bubanli:false,
  		//无法点击的灰色“我不办理”
  		huiBubanli:false,
  		//必缴费用未交完或者没有获取到已交完的数据
  		noData:false,
  		//必缴费用已交完
  		haveData:false,
  		//申请贷款
  		shenqing:true,
  		//已申请变灰不能点击
  		yishenqing:false,
  		//学费暂未生成，无法办理
  		wufabanli:false
  	}
  },
  components:{message},
  methods:{
  	tc_all(num){
  		if(num==1){
  			sendLstdsq({type: 0,id: this.$store.getters.getHjid}).then((res) => {
  				if(res.code == '40001'){
  					setHjStu({pauId: this.$store.getters.getHjid})
  					this.getData()
  				}else{
  					this.$Toast('操作失败')
  				}
  			})
  		}else{
  			sendLstdsq({type: 3,id: this.$store.getters.getHjid}).then((res) => {
  				if(res.code == '40001'){
  					setHjStu({pauId: this.$store.getters.getHjid})
  					this.getData()
  				}else{
  					this.$Toast('操作失败')
  				}
  			})
  		}
  		this.haveData = false
  	},
  	// tc_all(pd){//弹窗0取消，1确定
  	// 	if(this.bd == 3){
  	// 		if(pd==0){
	  // 			this.hui = false
	  // 		}else{
	  // 			this.dbxs = false
	  // 			this.sqzt = "已放弃"
	  // 			this.hui = true
	  // 			sendLstdsq({type:this.bd})
	  // 			this.TisShow = true
	  // 			setHjStu({pauId: this.$store.getters.getHjid})
	  // 			setTimeout(() => {
	  // 				this.TisShow = false
	  // 			},1000)
	  // 		}
	  // 		this.tc = false
  	// 	}else{
  	// 		if(pd==0){
	  // 			this.tc = false
	  // 		}else{
	  // 			sendLstdsq({type:this.bd})
	  // 			this.dbxs = false
	  // 			this.sqzt = "已申请"
	  // 			this.hui = false
	  // 			this.TisShow = true
	  // 			setHjStu({pauId: this.$store.getters.getHjid})
	  // 			setTimeout(() => {
	  // 				this.TisShow = false
	  // 			},1000)
	  // 		}
	  // 		this.tc = false
  	// 	}
  	// },
  	// dj(val){//底部的放弃和申请点击事件
  	// 	if(val==3){
  	// 		this.dbxs = false
  	// 		this.sqzt = "已放弃"
  	// 		this.blzt = 2
  	// 		this.hui = true
  	// 		this.bd = val
  	// 		sendLstdsq({type: val})
  	// 		this.TisShow = true
  	// 		setHjStu({pauId: this.$store.getters.getHjid})
  	// 		setTimeout(() => {
  	// 			this.TisShow = false
  	// 		},1000)
  	// 	}else{
  	// 		this.blzt = 1
  	// 		this.tc = true
  	// 		this.bd = val
  	// 	}
  	// },
  	replay(){
	  	this.hui=false,
	  	this.tc=false,
	  	this.bd='',
	  	this.dbxs=true
	  	this.blzt = ''
  	},
  	getData(){
  		lstdzt().then((res) => {
  			if(res.code=="40001"){
  				if(res.content.bjxm.length==0 && Math.abs(res.content.qf[0].qf)>0){
  					//等于0表示必缴已缴清或者为配置，qf<0 bjxm=0表示存在非必缴未缴清
					// this.bubanli = true
					// this.jiaofei = false
					// this.huiBubanli = false
					// this.shenqing = false
					this.state = 2
  				}else if(res.content.bjxm.length>0){ //大于0表示存在必缴未缴清
  					this.state = 1
  				}else if(res.content.bjxm.length==0 && res.content.qf[0].qf==0){
  					//我不办理
					this.state = 3
  				}else if(res.content.qf[0].qf==null){
  					this.state = 4
  				}
  				this.blzt = res.content.zt && res.content.zt.blzt
  				this.je = res.content.qf.length>0?Math.abs(res.content.qf[0].qf):0
  				this.jfmx = res.content.jfqk
  			}else{
  				console.log("data error");
  			}
  			
  		})
  	}
  },
  // activated(){
  // 	getLstd().then((res) => {
  // 		if(res.code == "40001"){
  // 			if(res.content.blzt==1){
  // 				this.dbxs = false
  // 				this.sqzt = "已申请"
  // 				this.hui = false
  // 			}else if(res.content.blzt==2){
  // 				this.dbxs = false
  // 				this.sqzt = "已放弃"
  // 				this.hui = true
  // 			}else{
  // 				this.dbxs = true
  // 			}
  // 			this.blzt = res.content.blzt
  // 		}else{
  // 			console.log("data error")
  // 		}
  // 	})
  // },
  activated(){
  	this.getData()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.rxzb-lstd
		position: fixed
		top: 0
		bottom: 0
		background: #f7f7f7
		border-top:.01rem
		overflow:auto
		padding-bottom:1rem
		img
			display:block
			margin:.1rem auto .12rem
			width:2.77rem
			height:1.56rem
		.wrap
			padding:0 .12rem
			font-size:.13rem
			line-height:.27rem
			padding-bottom:1rem
			p
				font-family:PingFang-SC-Medium
				color:#333
				text-indent:2em
			.sqtj
				margin:.05rem 0 .06rem
			.sqtj>p,>p:last-child
				text-indent:0
			.sqtj>p
				font-family:PingFang-SC
				color:#333
				font-weight:bold
		.jfmx
			background: white
			margin-bottom: .14rem
			table
				width: 100%
				tr
					height: .4rem
					line-height: .4rem
					text-align: center
					th
						font-size: 14px
						font-weight: bold
				tr:nth-child(n+2)
					border-top: 1px solid #ececec
		.bottom
			position:fixed
			bottom:0
			display:flex
			width:100%
			.left,.right
				width:50%
				font-family:PingFang-SC-Medium
				font-size:.16rem
				line-height:.44rem
				text-align:center
			.left
				color:#333333
				background:#fff
				border-top:.01rem #ececec inset			
				border-bottom:.01rem #ececec inset
			.right
				color:#fff
				background:#3DA8F5	
		.ysq
			position:fixed
			bottom:0
			width:100%
			line-height:.44rem
			height:.44rem
			color:#000
			background:#fff
			text-align:center
			border-top:.01rem solid #ececec	
			.hui
				color:#ececec
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
		.wrappopu //包裹元素
			display:flex
			position:fixed
			z-index:99999999
			top: 0
			justify-content:center
			align-items:center
			width:100%
			height:100%
			background:rgba(0,0,0,.5)
			.content //内容元素
				opacity:1
				width:calc(100% - 1.06rem)
				.top //上半部分内容区
					display:flex
					justify-content:center
					align-items:center
					flex-direction:column
					height:1.19rem
					background:rgba(255,255,255,1)
					border-radius:0.1rem 0.1rem 0 0
					p
						width:1.6rem
						font-size:0.14rem
						font-family:PingFang-SC-Medium
						color:rgba(0,0,0,1)
						line-height:0.25rem
						text-align:center
					h3
						font-family:PingFang-SC-Bold
						font-weight:bold
						color:#000
						font-size:.17rem
						margin-bottom:.15rem
				.xia //下部分的点击确认区
					height:0.44rem
					display:flex
					p
						width:50%
						font-size:.15rem
					p:nth-of-type(1)
						background:#F2F2F2
						color:#333
						line-height:.44rem
						text-align:center
						border-radius:0 0 0 .1rem
					p:nth-of-type(2)
						background:#3DA8F5
						color:#fff
						line-height:.44rem
						text-align:center
						border-radius:0 0 .1rem	0
		#message,#banli
			.top
				p
					text-align:left
					width:2.35rem
		.dibu,.huiDibu
			position:fixed
			bottom:0
			width:100%
			line-height:.46rem
			text-align:center
			z-index:5
		.dibu
			color:#fff
			background:#3DA8F5
		.huiDibu
			background:#ececec
			color:#cecece
			font-weight:bold
</style>