<template>
    <transition name="news">
      <div class="news-wrapper">
        <!-- <my-header :title="title" @back="back"></my-header> -->
        <div class="news-content margin">
          <div class="top">
            <h3 class="title">{{newsinfo.bulletinTitle}}</h3>
            <p class="desc">
              <span class="left">{{newsinfo.bulletinTime | newDate}}</span>
              <span class="right">
                <i class="iconimg"></i>
                {{newsinfo.bulletinCount}}
              </span>
            </p>
          </div>
          <div class="bottom">
            <div class="bottom-img">
              <img :src="newsinfo.bulletinUrl" width="100%" height="100%">
            </div>
            <div class="bottom-text">
              {{newsinfo.bulletinText}}
            </div>
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
import myHeader from 'teacher/component/header'
import { mapGetters } from 'vuex'
import { fetchInfo } from 'teacher/api/teacher'
const OK_CODE = '200'
export default {
  data () {
    return {
      title: '新闻显示',
      newsinfo: {}
    }
  },
  components: {
    myHeader
  },
  methods: {
    back() {
      this.$router.push({path: '/news'})
    }
  },
  created () {
    fetchInfo(this.news.id).then(res => {
      res = res.data
      if (res.state === OK_CODE) {
        this.newsinfo = res.data
      }
    })
  },
  computed: {
    ...mapGetters([
      'news'
    ])
  },
  filters: {
    newDate(val) {
      let date = new Date(val)
      let m = date.getMonth() + 1
      m = m < 10 ? ('0'+m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      return `${m}-${d}  ${h}:${minute}`
    }
  }
}
</script>


<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.news-enter-active, .news-leave-active
  transition all .3s
.news-enter, .news-leave-to
  transform translate3d(100%, 0, 0)
.news-wrapper
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background $color-background-d
  .margin
    margin-top 5px
  .news-content
    position fixed
    left 0
    right 0
    top 29px
    bottom 0
    background $color-background-d
    box-sizing border-box
    padding 5px 15px
    overflow hidden
    .top
      margin-bottom 10px
      .title
        font-weight bold
        color $color-modal
        margin-bottom 10px
      .desc
        display flex
        span
          flex 1
          &.left
            text-align left
          &.right
            text-align right 
            .iconimg
              background-image  url('/yxxt/static/student-index-pictures/eye.png')
              background-position-y 5px
              width 18px
              height 14px
              display inline-block
              background-repeat no-repeat
    .bottom-img
      width 100%
      height 150px
      margin-bottom 10px
</style>