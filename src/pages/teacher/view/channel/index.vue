<template>
  <transition name="channel">
    <div class="register-wrapper" v-show="isShow">
      <!-- <my-header :title="title" @back="back"></my-header> -->
      <user-info class="margin" :userInfo="userInfo" v-if="!noData"></user-info>
      <AllUser-info :AllUserInfo="AllUserInfo" class="margin" v-if="!noData" v-show="isCanel"></AllUser-info>
      <btn-wrapper class="btn-wrapper" @dispose="dispose" :text="text" :btnstate="btnstate" v-if="!noData" v-show="btnstate===0||btnstate===1||btnstate===3"></btn-wrapper>
      <mt-field  class="margin" placeholder="请输入撤销原因" type="textarea" rows="8" v-model="introduction" v-if="!noData"  v-show="!isCanel" :attr="{maxlength: 10}"></mt-field>
      <marker-icon v-show="item.state === 1"></marker-icon>
      <no-data v-if="noData"></no-data>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import myHeader from 'teacher/component/header'
import userInfo from 'teacher/component/userInfo'
import btnWrapper from 'teacher/component/btnWrapper'
import AllUserInfo from 'teacher/component/AllUserInfo'
import NoData from 'teacher/component/NoData'
import markerIcon from 'teacher/component/marker'
import { MessageBox, Indicator } from 'mint-ui'
import { fetchChannel, channelConfirm, channelCancel } from 'teacher/api/teacher'
import { User, UserInfo} from 'teacher/utils/setData'
const SUCCES_OK = '200'
export default {
  components: {
    myHeader, userInfo, btnWrapper, AllUserInfo, NoData, markerIcon
  },
  data () {
    return {
      title: '绿色通道',
      content: {
        desc: []
      },
      isShow: false,
      userInfo: {},
      AllUserInfo: {},
      btnstate: 1, // 0=>办理，1=>撤销， 2=>不显示 3 =>超出范围 
      isCanel: true,
      item: {}, // 所有数据
      introduction: '',
      canelBtn: false,
      noData: false // 没有数据内容显示的无数据页面
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    // 点击按钮
    dispose() {
      // 只有在有权限的时候才可以点击
      if (this.btnstate === 0) {
        MessageBox({
          title: '您是否确认办理',
          message: '一旦确认无法更改',
          showConfirmButton: true,
          confirmButtonClass: 'yxxt-btn'
        }).then(actions => {
          this._channelConfirm()
        })
      } else if (this.btnstate === 1) {
        // 点击撤销
        this.isCanel = false
        if (this.canelBtn) {
          this._channelCancel()
        }
        this.canelBtn = true
      }
    },
    // 获取现场报到学生信息
    _fetchChannel() {
      // 如果没有值跳转到首页
      if (this.userid === '' && this.type === '' ) {
        this.$router.push({path: '/'})
        return
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.isShow = false
      fetchChannel(this.userid, this.type, this.code).then(res => {
        Indicator.close()
        res = res.data
        this.isShow = true
        if (res.state === SUCCES_OK) {
          this.userInfo = new User(res.data)
          this.AllUserInfo = new UserInfo(res.data)
          this.content.desc = res.data.desc
          this.item = res.data
          this.isCanel = true
          this.btnstate = res.data.btnstate
          this.noData = false
        } else {
          this.noData = true
          this.prop(res.message)
        }
      }).catch(_ => {
        this.noData = true
        Indicator.close()
        this.prop('当前页面暂无数据')
      })
    },
    // 确认办理
    _channelConfirm() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      channelConfirm(this.item.userId).then(res => {
        Indicator.close()
        res = res.data
        if (res.state === SUCCES_OK) {
          this.prop('办理成功')
          this._fetchChannel()
        } else {
          this.prop(res.message)
        }
      }).catch(e => {
        Indicator.close()
        console.log(e)
        this.prop('连接数据库失败')
      })
    },
    _channelCancel() {
      // 当输入为空的时候
      if (this.introduction === '') {
        this.prop('请输入撤销原因')
        return
      }
      // 撤销
      channelCancel(this.item.userId, this.introduction).then(res => {
        this.canelBtn = false
        res = res.data
        if (res.state === SUCCES_OK) {
          this._fetchChannel()
        }
        this.prop(res.message)
      }).catch(_ => {
        this.prop('连接数据库失败')
      })
    }
  },
  created () {
    this._fetchChannel()
  },
  computed: {
    text() {
      const text = ['确认办理', '撤销', ' ', '已超出您的权限范围，无法操作']
      if (!this.isCanel) {
        return '确认'
      }
      return text[this.btnstate]
    },
    ...mapGetters([
      'userid', 'code', 'type'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.register-enter-active, .register-leave-active
  transition all .3s
.register-enter, .register-leave-to
  transform translate3d(100%, 0, 0)
.register-wrapper
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  overflow-y auto
  background $color-background-d
  padding-bottom 75px
  .margin
    margin-top 5px
  .btn-wrapper
    position fixed
    bottom 0
</style>
