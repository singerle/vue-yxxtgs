<template>
    <div class="xslxObj">
    	<div class="xslxObj-chart">
    		<vcircle :radius="85" :percent="bdl/100"></vcircle>
    	</div>
    	<div class="xslxObj-mes">
    		<p class="ft-14">{{data.sylx}}</p>
    		<p class="mt10">
    			<span class="ft-22">{{data.bdrs}}</span>
    			<span class="my-color-gray">/{{data.lqrs}}</span>
    		</p>
    		<p class="mt22 ft-12 my-color-qh">
    			<span>未到人数: {{data.lqrs-data.bdrs}}(人)</span>
    			<span class="ml23">占比: {{100-bdl}}%</span>
    		</p>
    	</div>
    	<div class="my-color-qh">
    		<span class="iconfont icon-gengduo mr8" @click="togo"></span>
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import vcircle from '@/base/circle/circle'
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
  props: ['data'],
  methods: {
    ...mapActions([
      'sylxset_sylx'
      ]),
    togo(){
        this.sylxset_sylx(this.data.sylx)
        this.$router.push('/region')
    }
  },
  components: { vcircle }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.xslxObj
	display: flex
	height: .85rem
	background: white
	padding: .14rem 0
	border-radius: 0.03rem
	align-items: center
	box-shadow: 0 1px 0 #ececec
	.xslxObj-chart
		flex: 1
		text-align: center
	.xslxObj-mes
		flex: 2
		height: 100%
</style>