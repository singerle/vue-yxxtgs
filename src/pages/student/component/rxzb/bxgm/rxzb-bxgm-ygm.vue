<!-- 完成了放弃保险的交互后。成功放弃购买保险显示的页面 -->
<template>
	<div class="bgcolor">
		<p>当前已自愿放弃购买保险</p>
<!-- 		<a>
			<div class="dianji reBuy" @click="cxgm">重新购买</div>
		</a> -->
		<div class="dianji toIndex" @click="$router.go(-1)">返回首页</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'rxzb-bxgm-ygm',
		data(){
			return {

			}
		},
		methods: {
			cxgm(){
				this.$emit('cxgm')
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.bgcolor
		position:fixed
		width:100%
		top:0
		bottom:0
		background:#f7f7f7
		font-family:PingFang-SC-Medium
		font-size:.17rem
		text-align:center
		p	
			color:#333333
			line-height:.17rem
			height:.17rem
			margin:.8rem auto .6rem
		.dianji
			width:calc(100% - 1.14rem)			
			border-radius:.23rem
			margin:0 auto .15rem	
		.reBuy
			line-height:.46rem
			height:.46rem
			color:#fff
			background:#3DA8F5
		.toIndex
			height:.44rem
			line-height:.46rem
			color:#3DA8F5
			border:.01rem solid #3DA8F5 
</style>