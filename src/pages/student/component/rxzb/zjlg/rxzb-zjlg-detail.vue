<template>
<!--通知公告-通知公告列表页-内容详情页 -->
<div class="bgcolor">
  	<div class="notice-detail">
	  	<h3>{{notice_xq.tzbt}}</h3>
	  	<p class="shijian">
	  		<span>
	  			<span class="date">{{notice_xq.fbsj}}</span>
	  		</span>
	  		<span class="viewer">{{notice_xq.llcs}}</span>
	  	</p>
	  	<div class="pic" :style="{background: notice_xq.fmtp}"></div>
	  	<p class="detail" v-html="notice_xq.tznr"></p>
	</div>
  </div>
</template>

<script>
import { xGllcs } from 'student/api/tzgg'
//import {setHjStu} from "student/api/getHjxx.js"
export default {
  name: '',
  data(){
  	return {
  		data: this.$route.query.data
  	}
  },
  activated(){
  	this.data = this.$route.query.data
  	this.addLlcs()
  },
  computed: {
  	notice_xq(){
  		return this.data?JSON.parse(this.data):''
  	}
  },
  methods: {
  	addLlcs() {
  		xGllcs({tzbh: this.notice_xq.tzbh})
  	}
  }
  // created(){
  // 	setHjStu({pauId: this.$store.getters.getHjid})
  // }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.bgcolor
		position:fixed
		top:0
		bottom:0
		background:#f7f7f7
		.notice-detail
			padding:0 0.12rem
			border-top:0.01rem solid #ECECEC
			background:#fff
			h3
				margin:0.2rem 0 0.14rem
				color:#333
				font-size:0.16rem
				font-family:PingFang-SC-Bold
				line-height:0.16rem
			.shijian
				display:flex
				justify-content:space-between
				font-family:PingFang-SC-Medium
				font-size:0.12rem
				color:#999
				line-height:0.12rem
				.viewer
					text-indent:0.18rem
					background:url(/yxxt/static/student-index-pictures/eye.png) no-repeat left center
			.pic
				margin:0.2rem auto 0.14rem
				width:1.44rem
				height:1.44rem	
				
			.detail
				font-size:0.13rem
				line-height:0.24rem	
				text-indent:2em
				font-family:PingFang-SC-Medium
				padding-bottom:0.13rem
</style>
