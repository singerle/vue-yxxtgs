<template>
  <el-container style="padding:20px">
    <el-header>
      <el-row>
        <el-col style="margin-bottom: 28px">
          <p>{{title}}</p>
          <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/yingxin/process' }">{{breadcrumb}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if='this.title'>{{title}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item v-if='this.title==="修改"? true: false'>修改</el-breadcrumb-item> -->
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:10px;border-bottom:1px #2184C5 solid">
        <el-col>
           <el-radio-group v-model="btnTab">
              <el-radio-button label="应用管理" @click.native="goto('/yingxin/ruxue/')"></el-radio-button>
              <el-radio-button label="流程配置" @click.native="goto('/yingxin/ruxue/process')"></el-radio-button>
            </el-radio-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      ruxueSiteState: '',
      btnTab: '',
      title: '入学配置',
      breadcrumb: '2018年夏季迎新配置'
    }
  },
  methods: {
    // 点击切换应用管理与流程配置的路由
    goto (item) {
      this.$router.push({path: item})
    },
    // 首先获取是否为编辑的状态，然后获取相应的state数据
    judgeView () {
      let state = this.$store.getters.ruxueSiteState
      this.ruxueSiteState = state
      this.breadcrumb = this.$store.getters.ruxueItem.processName
      if ( state === '') {
        this.MessageError ('未获取到数据，为您跳回到上一页面')
        this.$router.push({path: '/yingxin/process'})
      } else if ( state === 1) {
        // 此处为入学配置
        this.viewState = true
        this.title = '入学配置'
      } else if ( state === 2) {
        // 2为查看入学配置
        this.title = '查看入学配置'
        this.viewState = false
      } else if ( state === 3) {
        // 3为现场配置
        this.viewState = true
        this.title = '现场配置'
      } else if ( state === 4) {
        // 4为查看现场配置
        this.title = '查看现场配置'
        this.viewState = false
      }
    }
  },
  mounted () {
    this.judgeView()
  }
}
</script>
<style lang="stylus" scoped>
// .vue-header
//   width 100%
//   height 49px
//   line-height 50px
//   font-size 14px
//   border-bottom 1px solid #2184C5
  p
    color #555
    font-weight bold
    display inline-block
    font-family MicrosoftYaHei-Bold
  .crumbs
    display inline-block
    position relative
    top 2px
    left 11px
    font-size 10px
    border-left 2px solid #a7a7a7
    padding-left 10px
</style>