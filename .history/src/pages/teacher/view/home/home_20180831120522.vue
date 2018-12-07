<template>
  <div class="home-wrapper">
    <!-- <my-header :title="title"></my-header> -->
    <div class="home-content" v-if="stu">
      <ul class="items">
        <li class="item" v-if="options.register.flag">
          <div class="item-wraper border-left" @click="toPage('register', options.register.eaaRevoke)">
            <div class="icon register"></div>
            <div class="text">现场报到</div>
          </div>
        </li>
        <li class="item" v-if="options.channel.flag">
          <div class="item-wraper border-right"  @click="toPage('channel', options.channel.eaaRevoke)">
            <div class="icon channel"></div>
            <div class="text">绿色通道</div>
          </div>
        </li>
        <li class="item" v-if="options.sushe.flag">
          <div class="item-wraper border-left"  @click="toPage('sushe', options.sushe.eaaRevoke)">
            <div class="icon sushe"></div>
            <div class="text">宿舍分配</div>
          </div>
        </li>
        <li class="item" v-if="options.insurance.flag">
          <div class="item-wraper border-right" @click="toPage('insurance', options.insurance.eaaRevoke)">
            <div class="icon insurance"></div>
            <div class="text">保险购买</div>
          </div>
        </li>
        <li class="item" v-if="options.caiwu.flag">
          <div class="item-wraper border-left" @click="toPage('caiwu', options.caiwu.eaaRevoke)">
            <div class="icon caiwu"></div>
            <div class="text">财务缴费</div>
          </div>
        </li>
        <li class="item" v-if="options.manage.flag">
          <div class="item-wraper border-right"  @click="toPage('manage', options.manage.eaaRevoke)">
            <div class="icon manage"></div>
            <div class="text">授权管理</div>
          </div>
        </li>
        <li class="item" v-if="options.news.flag">
          <div class="item-wraper border-right" @click="toNew">
            <div class="icon news"></div>
            <div class="text">走进理工</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="noNr">
        <img src="static/img/error.png">
        <p>你的账号暂无操作权限</p>
        <!-- <div class="noNr-btn" @click="$router.(-1)">返回</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import jsAndroid from 'common/js/jsAndroid'
import myHeader from 'teacher/component/header'
import { mapMutations } from 'vuex'
import { home } from 'teacher/api/teacher'
const OK_CODE = '200'
export default {
  data () {
    return {
      title: '迎新管理',
      options: {
        // caiwu: false,
        // register: false,
        // channel: false,
        // sushe: false,
        // manage: false,
        // insurance: false,
        // news: false
      }
    }
  },
  components: {
    myHeader
  },
  computed: {
    stu(){
      let s = false
      for(let key in this.options) {
        if(this.options[key]){
          s = true
        }
      }
      return s
    }
  },
  methods: {
    // toPage(path) {
      // 调用二维码
      toPage(path, eaaRevoke) {
      // 全局设置是否是有撤销功能
      this.setState(eaaRevoke)
      jsAndroid.barcode.scanBtn().then(res => {
        // alert(res)
        console.log(res)
        if(res && res !== '') {
          // 扫描成功
          this.setUserid(res)
          this.setType('')
          this.setCode('')
          this.setSearch('')
          this.$router.push({path: `/${path}`})
        } else {
          //扫描失败
          this.setUserid('')
          this.setSearch(path)
          this.$router.push({path: `/search`})
        }
      })
      this.setUserid('')
      this.setSearch(path)
      this.$router.push({path: `/search`})
      // this.setUserid('')
      // this.setSearch(path)
      // this.$router.push({path: `/search`})
    },
    _home() {
      home().then(res => {
        res = res.data
        if (res.state === OK_CODE) {
          this.options = res.data
        } else {
          this.prop(res.message)
        }
      }).catch(_ => {
        this.prop('链接数据库失败')
      })
    },
    toNew() {
      // 跳转到新闻页
      this.$router.push({
        path: '/news'
      })
    },
    ...mapMutations({
      'setUserid': 'SET_USERID',
      'setSearch': 'SET_SEARCH',
      'setType': 'SET_TYPE',
      'setCode': 'SET_CODE',
      'setState': 'SET_STATE'
    })
  },
  created () {
    this._home()
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.home-wrapper
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background $color-background-d
  overflow-y auto
  .home-content
    position relative
    background $color-background
    right 0
    left 0
    bottom 0
    display flex
    .items
      display flex
      width 100%
      flex-wrap wrap
      .item
        flex 0 0 50%
        width 50%
        padding-top 50%
        box-sizing border-box
        position relative
        height 0
        .item-wraper
          position absolute
          width 100%
          top 0
          height 100%
          box-sizing border-box
          justify-content center
          align-items center
          flex-direction column
          display flex
          border-top 1px solid #ececec
          border-right 1px solid #ececec
          &:nth-last-child(1)
            border-bottom 1px solid #ececec
            border-top 0px solid #ececec
          &:nth-last-child(2)
            border-bottom 1px solid #ececec
            border-top 0px solid #ececec
          .icon
            width 36px
            height 38px
            background-repeat no-repeat
            background-size 36px 38px
            display inline-block
            margin-bottom 12px
          .register
            bg-image('register')
          .channel
            bg-image('channel')
          .sushe
            bg-image('sushe')
          .insurance
            bg-image('insurance')
          .caiwu
            bg-image('caiwu')
          .manage
            bg-image('manage')
          .news
            bg-image('new')
          .text
            display inline-block
            color $color-text-title
            font-weight bold
.noNr
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  text-align: center
  p
    margin-top: .25rem
  >.noNr-btn
    height: .46rem
    line-height: .46rem
    background: #3DA8F5
    width: 2.6rem
    margin-top: .64rem
    color: white
    border-radius: .3rem
</style>
