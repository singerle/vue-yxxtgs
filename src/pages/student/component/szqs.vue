<!-- 所在寝室 -->
<template>
	<div class="bgcolor">
		<div class="first">
			<div class="school" v-if="info">
				<p><span>校区名称</span><span>{{info.xqmc}}</span></p>
				<p><span>校栋名称</span><span>{{info.xdmc}}</span></p>
			</div>
			<div class="school" v-else>
				<p><span>校区名称</span><span></span></p>
				<p><span>校栋名称</span><span></span></p>
			</div>
		</div>
		<div class="second">
			<div class="room" v-if="info">
				<p><span>寝室名称</span><span>{{info.qsmc}}</span></p>
				<p><span>寝室性别</span><span>{{info.qsxb==1?"男":(info.qsxb==2?"女":"")}}</span></p>
				<p><span>床位号</span><span>{{info.cwh}}</span></p>
				<p><span>收费标准</span><span>{{info.sfbz}}</span></p>
			</div>
			<div class="room" v-else>
				<p><span>寝室名称</span><span></span></p>
				<p><span>寝室性别</span><span></span></p>
				<p><span>床位号</span><span></span></p>
				<p><span>收费标准</span><span></span></p>
			</div>
		</div>
	</div>
</template>
<script>
	import {getSzqsData} from "@/pages/student/api/szqs.js"
	export default {
		name:'',
		data(){
			return {
				info:''
			}
		},
		methods:{
			getData(){
				getSzqsData().then((res) => {
					this.info = res
					console.log(res)
					if(res.code==='40001'){
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
		position:fixed
		top:0
		bottom:0
		width:100%
		background:#f7f7f7
		.first
			border-top:0.01rem solid #e9e9e9
			margin-bottom:0.1rem
			.school
				padding:0 0.12rem
				background:#fff
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
		.second
			.room
				padding:0 0.12rem
				background:#fff
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