<template>
  <div class="header">
    <div class="back" @click="back">返回</div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '头部'
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
.header
  width 100%
  height 29px
  position relative
  color $color-text-title
  background $color-background
  .back
    position absolute
    line-height 29px
    padding-left 12px
  .title
    line-height 29px
    text-align center
    margin 0 auto
    width 70%
    font-weight bold
    font-size $font-size-large
</style>
