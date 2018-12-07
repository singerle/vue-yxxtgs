<template>
  <transition name="caiwu">
    <div class="register-wrapper" v-show="isShow">
      <!-- <my-header class="margin" :title="title" @back="back"></my-header> -->
      <user-info class="margin" :userInfo="userInfo" v-if="!noData"></user-info>
      <AllUser-info :AllUserInfo="AllUserInfo" class="margin" v-if="!noData"></AllUser-info>
      <user-bill :billTable="billTable" class="margin" v-if="!noData"></user-bill>
      <no-data v-if="noData"></no-data>
    </div>
  </transition>
</template>

<script>
import myHeader from 'teacher/component/header'
import userInfo from 'teacher/component/userInfo'
import userBill from 'teacher/component/bill'
import AllUserInfo from 'teacher/component/AllUserInfo'
import NoData from 'teacher/component/NoData'
import { finance } from 'teacher/api/teacher'
import { Indicator } from 'mint-ui'
import { User, UserInfo} from 'teacher/utils/setData'
import {mapGetters} from 'vuex'
const SUCCESS_OK = '200'
export default {
  components: {
    myHeader, userInfo, userBill, AllUserInfo, NoData
  },
  data () {
    return {
      title: '财务缴费',
      billTable: [],
      AllUserInfo: {},
      userInfo: {},
      isShow: false, // 刚开始页面不显示
      noData: false // 没有数据内容显示的无数据页面
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    }, 
    // 获取财务信息
    _finance() {
      this.isShow = false
      if (this.userid === '' && this.type === '' ) {
        this.$router.push({path: '/'})
        return
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      finance(this.userid, this.type, this.code, this.states).then(res => {
        Indicator.close()
        this.isShow = true
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.userInfo = new User(res.data)
          this.AllUserInfo = new UserInfo(res.data)
          this.billTable = res.data.tuition
          this.noData = false
        } else {
          this.noData = true
          this.prop('连接数据库失败')
        }
      }).catch(_ => {
        this.noData = true
        Indicator.close()
        this.prop('当前页面暂无数据')
      })
    }
  },
  computed: {
    ...mapGetters([
      'userid', 'type', 'code', 'states'
    ])
  },
  mounted () {
    this._finance()
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
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
  background $color-background-d
  overflow-y auto
  .margin
    margin-top 5px
  .btn-wrapper
    position fixed
    bottom 0
</style>
