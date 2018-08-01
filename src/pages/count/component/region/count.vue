<template>
    <div class="count">
    	<div v-for="item in data">
    		<div>{{item.xy}}</div>
    		<div>
    			<span></span>
    		</div>
    		<div>
				<propress :val="((item.sd/item.zrs)*100)"></propress>
    		</div>
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import propress from './propress'
export default {
  name: '',
  data () {
    return {
    }
  },
  props: ['data'],
  mounted(){

  },
  components: {propress}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.count
	padding: .14rem 0
	background: white
	>div
		display: flex
		color: #888888
		align-items: center
		margin-top: .14rem
		>div:first-child
			flex: 1
			height: .2rem
			line-height: .2rem
			text-align: right
		>div:last-child
			flex: 1
			height: .2rem
			line-height: .2rem
			text-align: left
			font-size: 12px
		>div:nth-child(2)
			position: relative
			width: .2rem
			height: .2rem
			line-height: .2rem
			text-align: center
			span
				display: inline-block
				width: 0.04rem
				height: 0.04rem
				border-radius: 50%
				border: 1px solid #3DA8F5
				vertical-align: middle
			span:after
				content: ''
				display: inline-block
				position: absolute
				height: .24rem
				width: 1px
				bottom: .14rem
				background: #E5E5E5
				left: 50%
				transform: translateX(-50%)
	>div:last-child
		margin-bottom: .14rem
		span:before
			content: ''
			display: inline-block
			position: absolute
			height: .28rem
			width: 1px
			top: .15rem
			background: #E5E5E5
			left: 50%
			transform: translateX(-50%)
</style>