<template>
    <div class="pie" ref="pie"></div>
</template>

<script type="ecmascript-6">
let Highcharts = require('highcharts');
export default {
  name: '',
  data () {
    return {
    }
  },
  props: ['option'],
  mounted(){
  	this.chart = Highcharts.chart(this.$refs.pie, this.option)
  },
  methods: {
    update(){
      this.chart.series[0].setData(this.option.series[0].data);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">  
</style>