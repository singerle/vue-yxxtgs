<!-- 报道流程-入学教育 -->
<template>	
		<div class="rxjy">
	 		<div class="pic"><img src="static/student-index-pictures/rxzb-lstd.png"></div>
	 		<div class="content">
		 		<p>1、新生入学报到当日,学校召开新生家长会;</p>
		 		<p>2、次日日召开新生班会,开展新生入学教育</p>
	  		</div>
	    </div>
</template>

<script>
import { completeProcess } from 'student/api/completeSendData.js'
//import {setHjStu} from "student/api/getHjxx.js"
export default {
	name: 'app',
  //created(){
  	//setHjStu({pauId: this.$store.getters.getHjid})
 // }
 	created(){
 		completeProcess({pauId:this.$store.getters.getHjid})
 	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
		.rxjy
			border-top:0.01rem solid #ECECEC
			background:#fff
			.pic
				width:2.77rem
				height:1.56rem
				margin:.1rem auto .14rem
				border-radius:.03rem
				img
					width:2.77rem
					height:1.56rem
			.content
				width:3rem
				margin:0 auto
				p
					font-size:0.13rem
					font-family:PingFang-SC-Medium
					color:#333
					line-height:0.23rem
					background:url(/yxxt/static/student-index-pictures/more.png) right center no-repeat 
</style>
