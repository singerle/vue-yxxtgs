<template>
  <div class="synthesis-wrapper">
    <header class="header">
      <div>
        <span class="title header-item h-left">{{busInfo.userName}}</span>
        <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>业务数据查询</el-breadcrumb-item>
          <el-breadcrumb-item>查看</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-radio-group style="margin-top: 10px;" size="mini" v-model="radio" @change="change">
        <el-radio-button label="base" >基本信息</el-radio-button>
        <el-radio-button label="other">其它信息</el-radio-button>
        <el-radio-button label="flow">迎新流程</el-radio-button>
      </el-radio-group>
    </header>
    <div class="syn-content">
      <businfon-wrapper :infos="infos" :radio="radio" :titles="titles" :avatar="avatar"></businfon-wrapper>
    </div>
    <div class="back"><span @click="back">返回</span></div>
  </div>
</template>

<script>
import businfonWrapper from './businfoWrapper'
import { fetchInfo } from 'oa/api/statis/bus'
import { mapGetters } from 'vuex'
const OK_CODE = '200'
export default {
  components: {
    businfonWrapper
  },
  data () {
    return {
      infos: {},
      radio: 'base',
      titles: ['安全知识测试', '完善信息', '绿色通道', '知识安全', '报道交通', '保险购买', '走进理工'],
      avatar: ''
    }
  },
  methods: {
    _fetchInfo() {
      let loading = this.loading()
      if (!this.busInfo.userId || this.busInfo.userId === '') {
        this.back()
      }
      // this.busInfo为用户信息
      fetchInfo(this.busInfo.userId, this.radio, this.busInfo.title).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.infos = res.data
          this.titles = res.data.titles ? res.data.titles : []
          this.avatar = res.data.avatar
        } else {
          this.MessageError(res.message)
        }
      }).catch(_ => {
        loading.close()
        this.MessageError()
      })
    },
    back() {
      this.$store.commit('SET_UPDATE', false)
      this.$router.push({
        path:'/statis/index/business'
      })
    },
    change() {
      this._fetchInfo()
    }
  },
  activated () {
    this._fetchInfo()
  },
  computed: {
    ...mapGetters([
      'busInfo'
    ])
  }
}
</script>


<style lang="stylus" scoped>
@import '~oa/style/variable'
.synthesis-wrapper
  padding 0 11px
  box-sizing border-box
  width 100%
  height 100%
  display flex
  flex-direction column
  .header
    border-bottom 1px solid $color-theme
    padding-bottom 5px
    .header-item
      display inline-block
      font-size $font-size-large
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
    .title
      color #555555
      font-weight bold
  .syn-content
    margin-top 10px
    flex 1
  .back
    text-align center
    padding-bottom 10px
    span 
      cursor pointer
      padding 8px 30px
      display inline-block
      border-radius 3px
      border 1px solid $color-theme
      color $color-theme
      color #ffffff
      background $color-theme
</style>
