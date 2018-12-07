<template>
  <div class="user-info-wrapper">
    <div class="user">
      <ul>
        <li class="listy"><span class="user-name">录取号</span><span class="user-data">{{AllUserInfo.enrollcode}}</span></li>
        <li class="listy"><span class="user-name">考生号</span><span class="user-data">{{AllUserInfo.examineecode}}</span></li>
        <li class="listy"><span class="user-name">身份证号</span><span class="user-data">{{AllUserInfo.idcode}}</span></li>
        <li class="listy"><span class="user-name">出生年月</span><span class="user-data">{{AllUserInfo.birthday}}</span></li>
        <li :class="{listy:AllUserInfo.graduateschool}"><span class="user-name" v-show="AllUserInfo.graduateschool">毕业中学</span><span class="user-data">{{AllUserInfo.graduateschool}}</span></li>
        <li :class="{listy:AllUserInfo.house}"><span class="user-name" v-show="AllUserInfo.house">寝室大楼</span><span class="user-data">{{AllUserInfo.house}}</span></li>
        <li :class="{listy:AllUserInfo.room}"><span class="user-name" v-show="AllUserInfo.room">房号</span><span class="user-data">{{AllUserInfo.room}}</span></li>
        <li :class="{listy:AllUserInfo.bed}" class="borderNO"><span class="user-name" v-show="AllUserInfo.bed">铺位</span><span class="user-data">{{AllUserInfo.bed}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    AllUserInfo: {
      type: Object,
      default: function() {
        return {
          // enrollcode: 10045679841564980,
          // studentcode: 4564581456741,
          // idcode: 500233199004132300,
          // birthday: "1998年12月",
          // graduateschool: "重庆一中",
          // house: "6栋",
          // room: "402",
          // bed: "右2",
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
// @import "~common/stylus/base"
@import "~common/stylus/mixin"
.user-info-wrapper
  background-color $color-background
  .user
    padding 0 20px
    .listy
      padding 18px 0
      font-size $font-size-medium
      border-bottom 1px solid #E9E9E9
      display flex
      justify-content space-between
      .user-name
        font-weight 700
        color $color-font-nav
      .user-data
        color $color-font-Notes
    .borderNO
      border-bottom none
</style>
