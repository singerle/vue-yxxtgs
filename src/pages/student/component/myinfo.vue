<!-- 学生个人信息 -->
<template>
	<div class="bgcolor">
		<div class="header">
			<div class="pic">
				<div class="picbg">
				<img :onerror="logo" :src="info.tx==null||info.tx=='null'?'static/student-index-pictures/pic.png':info.tx">
				</div>
			</div>
			<div class="student-info">
				<h3 class="student-name">
					<span class="xingming">{{info?info.xm:"无数据"}}</span>
				</h3>
				<p class="yuan">
					<span class="yuan-name">{{info?info.xy:"无数据"}}</span>
				</p>
				<p class="xi">
					<span>{{info.zy}}&nbsp;&nbsp;<span v-if='info.xi'>({{info.zy}})</span></span>
				</p>
			</div>
		</div>
		<div class="content">
			<p><span>出生日期</span><span>{{info?info.sr:"无数据"}}</span></p>
			<p><span>班级</span><span>{{info?info.bj:"无数据"}}</span></p>
			<p><span>考生号</span><span>{{info?info.ksh:"无数据"}}</span></p>
			<p><span>学号</span><span>{{info?info.xh:"无数据"}}</span></p>
			<p><span>身份证号</span><span>{{info?info.sfzh:"无数据"}}</span></p>
			<p><span>录取省份</span><span>{{info?info.lqsf:"无数据"}}</span></p>
			<p><span>政治面貌</span><span>{{info&&info.zzmm!="null"&&info.zzmm!=null?info.zzmm:"无数据"}}</span></p>
			<p><span>民族</span><span>{{info&&info.mz!="null"&&info.mz!=null?info.mz:"无数据"}}</span></p>
			<p><span>学制&nbsp;（年）</span><span>{{info?info.xz:"无数据"}}</span></p>
			<p><span>录取校区</span><span>{{info&&info.lqxq!="null"&&info.lqxq!=null?info.lqxq:"无数据"}}</span></p>
		</div>
	</div>
</template>

<script>
	import {getGrxxData} from '@/pages/student/api/studentInfo.js'
	export default{
		name:'',
		data(){
			return {
				info:'',
				logo: 'this.src="' + require('./pic.png') + '"'
			}
		},
		methods:{
			getData(){
				getGrxxData().then((res) => {
					if(res.code === '40001'){
						console.log(res.message)
						this.info = res.content
					}else{
						console.log("data error")
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
	.bgcolor
		background:#f7f7f7
		position:fixed
		top:0
		bottom:0
		width:100%
		overflow:auto
		.header //头部显示的学生详细信息
			overflow:hidden
			font-family:PingFang-SC-Medium
			color:#333333
			font-size:0.13rem
			background-color:#fff
			padding-bottom:0.07rem
			margin-bottom:0.1rem
			border-top:0.01rem solid #ECECEC 
			padding-top:0.09rem
			.pic //学生头像
				float:left
				margin-left:0.14rem
				width:0.75rem
				height:0.75rem
				display:flex
				justify-content:center
				align-items:center
				.picbg
					width:.65rem
					height:.65rem
					border-radius:50%
					background:#fff
					display:flex
					justify-content:center
					align-items:center
					box-shadow:.01rem .01rem .14rem #cecece
				img
					width:.6rem
					height:.6rem
					border-radius:50%
					border:0
			.student-info //学生信息栏
				float:left
				width:calc(100% - .99rem)
				margin-top:0.03rem
				margin-left:0.10rem
				.student-name //学生基本信息
					font-size:0
					.xingming //学生姓名
						display:inline-block
						font-size:0.17rem
						font-family:PingFang-SC-Bold
						margin-top:0.04rem
						vertical-align:top
				.yuan //学生所在学院
					font-size:0.14rem
					margin-top:0.08rem
					margin-bottom:0.06rem
					padding-left:0.2rem
					background:url(/yxxt/static/student-index-pictures/yuan-hui.png) no-repeat
					background-size: .12rem .12rem
				.xi //学生所在系
					font-size:0.13rem
					padding-left:0.2rem
					background:url(/yxxt/static/student-index-pictures/xi-hui.png) no-repeat
					background-size: .12rem .12rem
		.content
			padding:0 0.12rem
			background:#fff
			padding-bottom:1rem
			p
				border-bottom:0.01rem solid #e9e9e9
				font-size:0.16rem
				font-family:PingFang-SC-Medium
				color:#333
				line-height:0.44rem
				display:flex
				justify-content:space-between
				span
					text-align:right
				span:last-child
					font-size:0.14rem
					font-family:PingFang-SC-Medium
					color:#999
			p:last-child
				border-bottom:0
</style>