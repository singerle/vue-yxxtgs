<!-- 报到流程-宿舍办理页面 -->
<template>
  <div class="ssbl">
   	<popup @event="cancleProup" v-show="popupVisible"></popup>
   	<div class="top">
   		<div class="pic">
   			<img src="static/student-index-pictures/rxzb-lstd.png">
   		</div>
   		<p>学生本人凭录取通知书和身份证在公寓管理人员处领取钥匙并办理入住手续。</p>
   		<p>完成报名后，领取以下物品：</p>
		<p>1、《寝室安全手册》&nbsp;一本</p>
		<p>2、寝室钥匙&nbsp;一把</p>
		<p>3、寝室大楼门禁卡&nbsp;一张</p>
		<p>地点:学生公寓大厅</p>
   	</div>
   	<div class="bottom">
   		<div class="banli" @click="handleCode">
   			<p>出示身份码进行办理</p>
   		</div>
   	</div>
  </div>
</template>

<script>
import popup from "@/pages/student/component/common/xcbdPopup.vue"
//import {setHjStu} from "student/api/getHjxx.js"
//import {completeProcess} from "student/api/completeSendData.js"
import {sendHcLc} from "student/api/getHjxx.js"
export default {
  name: '',
  components:{popup},
  data(){
  	return {
  		popupVisible:false
  	}
  },
  // activated(){
  // 	completeProcess({pauId:this.$store.getters.getHjid})
  // },
  methods:{
  	handleCode(){
  		this.popupVisible=true
  		sendHcLc({pauId:this.$store.getters.getHjid,type:2})
  	},
  	cancleProup(isshow){
  		this.popupVisible=isshow
  		//模拟身份码去掉的时候就是完成状态
  		//setHjStu({pauId: this.$store.getters.getHjid})
  		if(!isshow){
  			this.showdiffent = "banlihou"
  		}
  	}
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.ssbl
		.top
			border-top:0.01rem solid #ECECEC
			.pic
				display:block
				margin:.1rem auto 0
				width:2.77rem
				height:1.56rem
				border-radius:0.03rem
				img
					width:2.77rem
					height:1.56rem
			p
				text-indent:2em
				width:3.6rem
				margin:0 auto
				font-size:0.13rem
				font-family:PingFang SC
				color:rgba(51,51,51,1)
				line-height:0.23rem	
			p:nth-of-type(1)
				margin:0.14rem atuo 0.04rem
				font-family:PingFang-SC-Medium
		.bottom
			border-top:0.01rem solid #ECECEC
			height:0.66rem
			width:100%
			display:flex
			justify-content:center
			align-items:center
			position:fixed
			bottom:0
			.banli //出示身份码进行办理
				width:3.51rem
				height:0.46rem
				display:flex
				justify-content:center
				align-items:center
				box-shadow:0.01rem 0.01rem 0.02rem rgba(85,178,245,0.5)
				background:rgba(61,168,245,1)
				border-radius:0.06rem
				p
					font-size:0.17rem
					font-family:PingFang-SC-Medium
					color:rgba(255,255,255,1)
			.banlihou //办理完成后的样式
				width:3.51rem
				height:0.46rem
				display:flex
				justify-content:center
				align-items:center
				background:rgba(255,255,255,1)	
				p
					font-size:0.17rem
					font-family:PingFang-SC-Medium
					color:rgba(51,51,51,1)
</style>