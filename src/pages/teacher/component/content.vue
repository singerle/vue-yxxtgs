<template>
  <div class="container">
    <h2 class="title">{{content.title}}</h2>
    <ul class="item-wrapper" v-show="content.desc.length>0">
      <li class="item" v-for="(item, index) in content.desc">{{index+1}}、 {{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      defalut: function() {
        return {
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .container
    width 100%
    padding 15px 10px
    background $color-background
    box-sizing border-box
    .title
      color $color-font-nav
      font-size $font-size-large
      font-weight bold
    .item-wrapper
      margin-top 15px
      .item
        color $color-font-nav
        font-size $font-size-medium
        margin-top 5px
</style>

