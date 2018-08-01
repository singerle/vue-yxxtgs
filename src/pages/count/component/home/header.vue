<template>
    <div class="header">
    	<div>
    		<p class="header-tb"></p>
    		<div class="mt10">
    			<p>报到率</p>
    			<p class="header-bdl mt15 ft-32">{{bdl}}</p>%
    		</div>
    	</div>
    	<div>
    		<p class="mt30">报到人数<span class="ml8">{{data.bdrs}}</span></p>
    		<p class="mt18">录取人数<span class="ml8">{{data.lqrs}}</span></p>
    	</div>
    	<div class="textRight">
    		<span @click="Jump" class="iconfont icon-gengduo mr8"></span>
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
    }
  },
  computed: {
    bdl(){
      return ((this.data.bdrs/this.data.lqrs)*100).toFixed(2)
    }
  },
  methods: {
    ...mapActions([
      'sylxset_sylx'
      ]),
  	Jump(){
      this.sylxset_sylx('')
  		this.$emit('Jump')
  	}
  },
  props: ['data']
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header
	display: flex
	color: white
	height: 1.07rem
	line-height: 1.07rem
	padding: .12rem
	background: linear-gradient(#9dcbf2, #6ca5e9)
	>div
		flex: 1
		line-height: 1
		p.header-tb
			width: .11rem
			height: 0.02rem
			background: white
			margin-top: .14rem
			border-radius: 0.05rem
		.header-bdl
			display: inline-block
	>div:last-child
		flex: 0.5
		line-height: 1.07rem
</style>