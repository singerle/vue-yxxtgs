<template>
  <div class="info-wrapper">
    <!-- 基本信息 -->
    <div class="info-base" v-show="radio==='base'">
      <div class="info-left">
        <div class="info-left-content">
          <img :src="avatar" alt="">
          <ul class="info-left-text">
            <li ><span></span></li>
          </ul>
        </div>
      </div>
      <div class="info-right">
        <div class="info-right-content">
          <!-- 基本信息第一部分 -->
          <div class="r-wraper" v-show="infos.basetop && infos.basetop.length>0" >
            <div class="r-top">
              <div class="r-row" v-for="item in infos.basetop">
                <div class="r-row-col" v-for="list in item">
                  <span class="r-item r-item-left">{{list.name}}:</span>
                  <span class="r-item r-item-right">{{list.value}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 基本信息第二部分 -->
          <div class="r-wraper" v-show="infos.basemiddle && infos.basemiddle.length>0">
            <div class="r-top">
              <div class="r-row" v-for="item in infos.basemiddle">
                <div class="r-row-col" v-for="list in item">
                  <span class="r-item r-item-left">{{list.name}}:</span>
                  <span class="r-item r-item-right">{{list.value}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 基本信息第三部分 -->
          <div class="r-wraper" v-show="infos.basebottom && infos.basebottom.length>0">
            <div class="r-top">
              <div class="r-row" v-for="item in infos.basebottom">
                <div class="r-row-col r-row-col1">
                  <span class="r-item r-item-left">{{item.name}}:</span>
                  <span class="r-item r-item-right">{{item.value}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 其它信息 -->
    <div class="info-other" v-show="radio==='other'">
      <div class="info-right">
        <div class="info-right-content">
          <!-- 基本信息第一部分 -->
          <div class="r-wraper" v-show="infos.basebottom && infos.basebottom.length>0">
            <div class="r-top">
              <div class="r-row" v-for="item in infos.basebottom">
                <div class="r-row-col r-row-col1">
                  <span class="r-item r-item-left">{{item.name}}:</span>
                  <span class="r-item r-item-right">{{item.value}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 基本信息第二部分 -->
          <div class="r-wraper" v-show="infos.basetop && infos.basetop.length>0">
            <h2>亲属信息</h2>
            <div class="r-top r-top-other" v-for="item in infos.basetop">
              <div class="r-row" v-for="list in item">
                <div class="r-row-col">
                  <span class="r-item r-item-left">{{list.name}}:</span>
                  <span class="r-item r-item-right">{{list.value}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 基本信息第三部分 -->
          <div class="r-wraper" v-show="infos.basemiddle && infos.basemiddle.length>0">
            <h2>曾读学校</h2>
            <div class="r-top r-top-other" v-for="item in infos.basemiddle">
              <div class="r-row"  v-for="list in item">
                <div class="r-row-col">
                  <span class="r-item r-item-left">{{list.name}}:</span>
                  <span class="r-item r-item-right">{{list.value}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-flow" v-show="radio==='flow'">
      <div class="info-left">
        <div class="info-left-content">
          <img :src="avatar" alt="">
          <ul class="info-left-text">
            <li v-for="item in titles"><span :class="[item.state&&item.state==='1' ? 'uncomplete' : 'complete']">{{item.name}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infos: {
      type: Object,
      default: function() {
        return {}
      }
    },
    radio: '',
    avatar: '',
    titles: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~oa/style/variable'
.info-wrapper
  width 100%
  height 100%
  display flex
  .info-base, .info-other
    width 100%
    height 100%
    display flex
    .info-left
        width 170px
        flex  0 0 170
        box-sizing border-box
        .info-left-content
          padding 10px 15px 0 15px
          box-sizing border-box
          width 100%
          height 100%
          text-align center
          // img
          //   width 70px
          //   height 90px
          .info-left-text
            display flex
            flex-direction column
            margin-top 15px
            li
              display inline-block
              margin-top 5px
              span
                padding 8px 30px
                display inline-block
                cursor pointer
                border-radius 3px
                font-weight bold
                width 60%
                &.complete
                  border 1px solid #999
                  color #999
                &.uncomplete
                  border 1px solid $color-theme
                  color $color-theme 
    .info-right
      flex 1
      .info-right-content
        padding-top 5px
        padding-left 15px
        box-sizing border-box
        width 100%
        img 
          width 70px
          height 90px
        .r-wraper
          width 100%
          padding-bottom 20px
          border-bottom 1px solid #DCDCDC
          h2
            padding 5px 15px
            font-weight bold
          .r-top
            width 630px
            &.r-top-other
              width 262px
              display inline-block
            .r-row
              display flex
              width 100%
              box-sizing border-box
              height 30px
              .r-row-col
                flex 1
                display flex
                &.r-row-col1
                  flex 0 0 50%
                .r-item
                  flex 1
                  line-height 30px
                  font-size 14px
                  &.r-item-left
                    text-align right
                    color #999999
                  &.r-item-right
                    text-align left
                    padding-left 5px
                    color #555555
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
  .info-flow
    .info-left
        width 170px
        flex  0 0 170
        box-sizing border-box
        .info-left-content
          padding 10px 15px 0 15px
          box-sizing border-box
          width 100%
          height 100%
          text-align center
          // img
          //   width 70px
          //   height 90px
          .info-left-text
            display flex
            flex-direction column
            margin-top 15px
            li
              display inline-block
              margin-top 5px
              span
                padding 8px 30px
                display inline-block
                cursor pointer
                border-radius 3px
                font-weight bold
                width 60%
                &.complete
                  border 1px solid #999
                  color #999
                &.uncomplete
                  border 1px solid $color-theme
                  color $color-theme 
</style>