<!-- 提供h3和p两个写好的样式 -->
<template>
  <div class="wrap">
  	<div class="content">
  		<div class="top">
  			<slot></slot>
  		</div>
  		<div class="bottom">
  			<p @click="sure">我知道了</p>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'index-popup',
  data () {
  	return {
  		isshow:''
  	}
  },
  methods:{
  	sure(){
  		this.$emit("event",this.isshow)
  	}
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.wrap //包裹元素
		display:flex
		position:fixed
		z-index:999
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
				// height:1.19rem
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
			.bottom //下部分的点击确认区
				height:0.44rem
				background:rgba(85,178,245,1)
				border-radius:0 0 0.1rem 0.1rem
				display:flex
				justify-content:center
				align-items:center
				p
					font-size:0.15rem
					font-family:PingFang-SC-Medium
					color:rgba(255,255,255,1)
					line-height:0.15rem
					text-align:center
</style>