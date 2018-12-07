<template>
    <swiper :options="swiperOption" id="loop">
      <swiper-slide v-for="(slide, index) in data" :key="index">
        <div @click="togo(index)" class="pic" :style="{backgroundImage:`url('${slide}')`,backgroundSize:`100% 100%`}"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        // swiperSlides: ["static/student-index-pictures/yindao1.png", "static/student-index-pictures/yindao2.png","static/student-index-pictures/yindao3.png"],
      }
    },
    props: ['data'],
    methods: {
      // togo(i){
      //   i == (this.swiperSlides.length-1) && this.$emit('hiden')
      // }
      togo(i){
        i == (this.data.length-1) && this.$emit('hiden')
      }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
// .bg
//   width:100%
//   height:100%
#loop
  height:100%
  width:100%
  .pic
    height:100%
    width:100%
</style>