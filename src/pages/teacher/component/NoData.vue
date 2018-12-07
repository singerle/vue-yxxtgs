<template>
  <div class="No-Data-wrapper">
    <div class="nodata">
        <i class="icon Nodata"></i>
        <p class="textTip">当前用户无业务申请记录~</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.No-Data-wrapper
  // height 100%
  background-color $color-background-d
  .nodata
    position fixed
    top calc(50% - 120px)
    left 0
    width 100%
    text-align center
    .icon
      width 113px
      height 145px
      display inline-block
      vertical-align middle
      background-repeat no-repeat
      background-size 113px 145px
      &.Nodata
        bg-image('/yxxt/static/teacher/Nodata')
    .textTip
      color #777777
      margin-top 20px
      font-size 15px
      font-weight bold
</style>
