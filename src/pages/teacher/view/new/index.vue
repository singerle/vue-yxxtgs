<template>
    <transition name="news">
      <div class="news-wrapper">
        <!-- <my-header :title="title" @back="back"></my-header> -->
        <mt-loadmore class="news-content margin" :top-method="loadTop" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore">
          <div class="scroll-wrapper">
            <div class="news-items" @click="toInfo(item)" v-for="item in datatab" :key="item.id">
              <div class="item-left">
                <img :src="item.cropImg" width="60" height="60"/>
              </div>
              <div class="item-right">
                <h3 class="item-title">{{item.newsTitle}}</h3>
                <div class="item-bottom">
                  <span>{{item.time | newDate}}</span>
                  <span>
                    <i class="iconimg"></i>
                    {{item.sortnumber}}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </mt-loadmore>
      </div>
  </transition>
</template>

<script>
import myHeader from 'teacher/component/header'
import { fetchNews } from 'teacher/api/teacher'
const OK_CODE = '200'
export default {
  data () {
    return {
      title: '新闻列表',
      datatab: [],
      pageNum: 1,
      pageSize: 20,
      allLoaded: false,
    }
  },
  components: {
    myHeader
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    toInfo(item) {
      this.$store.commit('SET_NEW', item)
      this.$router.push({path: '/newsinfo'})
    },
    _fetchNews() {
      fetchNews(this.pageNum, this.pageSize).then(res => {
        res = res.data
        if (res.state === OK_CODE){
          // 如果长度想等
          if (this.datatab.length === res.data.total) {
            this.allLoaded = true
            this.$refs.loadmore.onBottomLoaded()
          } else {
            this.datatab = [...this.datatab, ...res.data.rows]
            this.$refs.loadmore.onTopLoaded()
          }
        }
      }) 
    },
    // 下拉刷新
    loadTop() {
      this.allLoaded = false
      this.pageNum = 1
      this._fetchNews()
    },
    // 上拉加载
    loadBottom() {
      this.pageNum = this.pageNum + 1
      this._fetchNews()
    }
  },
  created () {
    this._fetchNews()
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
    overflow hidden
    .scroll-wrapper
      .news-items
        display flex
        margin-bottom 15px
        align-items center
        background #fff
        padding 5px 15px
        box-sizing border-box
        .item-left
          width 60px
          line-height 0
        .item-right
          flex 1
          margin-left 5px
          .item-title
            font-weight bold
            color $color-modal
          .item-content
            font-size $font-size-medium
            margin 5px 0
          .item-bottom
            font-size $font-size-small
            margin 10px 0 10px 0
            span
              .iconimg
                background-image  url('/yxxt/static/student-index-pictures/eye.png')
                background-position-y 5px
                width 18px
                height 14px
                display inline-block
                background-repeat no-repeat
</style>