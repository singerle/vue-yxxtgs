<template>
	<div :class="{'topSelect': active}" class="tSelect">
    	<span @click="active=!active" class="topSelect-banner">
    		{{dqxq}}
    		<span class="iconfont icon-xiajiantou" :class="{'active': active}"></span>
    	</span>
    	<transition name="activeList">
	    	<ul v-if="active" :class="{'activeList': active}" @click="active=false">
	    		<li v-for="item in xqList" :class="{'activeObj': dqxq==item}" @click.stop="checkObj(item)">{{item}}</li>
	    	</ul>
	    </transition>
	</div>
</template>

<script type="ecmascript-6">
import { getXqlb } from 'count/api/yxtj'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
    	dqxq: '',
    	active: false
    }
  },
  watch: {
  	xqList(val, old){
  		if(val.length>0){
  			this.dqxq = val[0]
  		}
  	}
  },
  props: ['xqList'],
  methods: {
  	...mapActions([
  		'set_xq'
  		]),
  	checkObj(xq){
  		this.dqxq = xq
  		this.active = false
  		this.set_xq(xq)
  		this.$emit('refresh',xq)
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.activeList-enter-active
  transition: all .25s ease
.activeList-leave-active
  transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.activeList-enter, .activeList-leave-to
  opacity: 0
.topSelect
	top: 0
	bottom: 0
.tSelect
	position: fixed
	width: 100%
	font-size: 15px
	border-bottom: 1px solid #ececec
	text-align: center
	z-index: 1000
	.topSelect-banner
		display: inline-block
		width: 100%
		height: .44rem
		line-height: .44rem
		background: white
		text-align: center
	> ul 
		position: absolute
		top: .44rem
		width: 100%
		height: calc(100% - .44rem)
		background: rgba(0, 0, 0, .4)
		z-index: 1000
		> li
			height: .44rem
			line-height: .44rem
			background: white
			border-bottom: 1px solid #ececec
		>li:first-child
			border-top: 1px solid #ececec
	.iconfont
		display: inline-block
		font-size: 12px
		color: #d1d1d1
		margin-left: 0.06rem
	.active
		transform: rotate(-180deg)
		color: #3DA8F5
	.activeObj
		color: #3DA8F5
</style>