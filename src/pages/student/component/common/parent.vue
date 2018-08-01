<template>
    <div>
    	<zujian @event="sure" v-show="show">
    		<h3>恭喜您完成入学准备</h3>
    		<p>到校后可进行报到流程</p>
    	</zujian>
    </div>
</template>

<script type="ecmascript-6">
import zujian from '@/pages/student/component/common/popup-test.vue'
export default {
  name: '',
  components:{zujian},
  data () {
    return {
    	show:true
    }
  },
  methods:{
  	sure(isshow){
  		this.show=isshow
  		console.log(isshow)
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
</style>
