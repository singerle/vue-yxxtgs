<template>
  <div class="container">
    <div class="header">
      <p class="title">操作说明：</p>
      <p class="text">1 在应用管理中新增了应用将会在可拖动区域框中。</p>
      <p class="text">2 创建层级关系，将应用推入相应层级中。</p>
      <p class="text">3 设置每个层级的解锁关系，每个层级至少设置一个解锁任务（可多个），当前层级解锁任务完成后，自动解锁下一级。</p>
    </div>
    <div class="main">
      <drag-list></drag-list>
    </div>
  </div>
</template>
<script>
import dragList from './dragList'
export default {
  components: {
      dragList
    },
  data () {
    return {

    }
  },
  methods: {
    // goBack () {
    //   this.$router.push({path: '/yingxin/process'})
    // }
  }
}
</script>
<style lang="stylus" scoped>
.container
  display flex
  flex-wrap wrap
  .header
    width 100%
    box-sizing border-box
    padding 40px 0 0 20px
    .title
      font-size 18px
      line-height 25px
      color #555555
    .text
      color #555555
      font-size 14px
      line-height 20px
  .main
    width 100%
</style>
