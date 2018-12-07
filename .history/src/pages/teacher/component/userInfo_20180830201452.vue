<template>
  <div class="user-info-wrapper">
    <div class="avater">
      <img :onerror="logo" width="50" height="50" :src="userInfo.avater"/>
    </div>
    <div class="desc">
      <div class="item">
        <p class="name">{{userInfo.name}}</p>
        <i class="iconfont" :class="userInfo.radio === 'man'? 'icon-man icon-nan' : 'icon-woman icon-nv'"></i>
      </div>
      <div class="item">
        <i class="icon school"></i>
        <p class="text">{{userInfo.school}}</p>
      </div>
      <div class="item">
        <i class="icon learn"></i>
        <p class="text">{{userInfo.learn}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: 'this.src="' + require('./pic.png') + '"'
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: function() {
        return {
          // name: '李同学',
          // school: '理学院',
          // learn: '信息与计算科学(工程计算与数据处理)',
          // avater: 'http://star.kuwo.cn/star/starheads/180/24/27/3001740651.jpg',
          // radio: 'man'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.user-info-wrapper
  height 88px
  width 100%
  display flex
  padding 12px 14px
  box-sizing border-box
  align-items center
  background $color-background
  .avater
    width 50px
    height 50px
    img
      border-radius 50%
  .desc
    flex 1
    margin-left 11px
    display flex
    flex-direction column
    vertical-align top
    .item
      padding 2px
      .name
        color $color-font-nav
        font-weight bold
        font-size $font-size-large
        display inline-block
      .icon-man
        color #3DA8F5
      .icon-woman
        color #ff3366
      .icon
        width 13px
        height 12px
        display inline-block
        vertical-align middle
        background-repeat no-repeat
        background-size 13px 12px
        &.learn
          bg-image('learn')
        &.school
          bg-image('school')
      .text
        color $color-font-text
        font-size $font-size-medium
        display inline-block
        vertical-align middle
        no-wrap()
</style>
