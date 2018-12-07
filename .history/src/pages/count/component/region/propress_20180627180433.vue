<template>
    <div class="propress">
		<span class="progress-parent">
			<span class="progress-child" ref="progress-child"></span>
			<span class="progress-val ml8">{{value}}%</span>
		</span>
    </div>
</template>

<script type="ecmascript-6">
export default {
  name: '',
  data () {
    return {
    }
  },
  props: ['val'],
  computed: {
  	value(){
  		return this.val
  	}
  },
  watch: {
  	val(val,old){
  		let dom = this.$refs['progress-child']
	  	dom.style.width = this.val+'%'
	  	dom.style.backgroundColor  = this.bg()
  	}
  },
  mounted(){
  	let dom = this.$refs['progress-child']
  	dom.style.width = this.val+'%'
  	dom.style.backgroundColor  = this.bg()
  },
  methods: {
    bg(){
		var r=Math.floor(Math.random()*166)
		r<72?(r=94+r):''
		var g=Math.floor(Math.random()*216)
		g<120?(g=96+g):''
		var b=Math.floor(Math.random()*256)
		b<169?(b=87+b):''
		return "rgb("+r+','+g+','+b+")"
	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.propress
	position: relative
	height: .2rem
	line-height: .2rem
	text-align: left
	font-size: 12px
	>span.progress-parent
		display: inline-block
		height: 0.09rem
		width: 1.1rem
		white-space: nowrap
		>span.progress-child,>span.progress-val
			display: inline-block
			height: 0.09rem
			vertical-align: top
		>span.progress-val
			height: 0.09rem
			line-height: 0.09rem
	>span
		vertical-align: middle
</style>