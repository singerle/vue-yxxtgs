<template>
  <el-container>
    <el-header>
      <el-row class="vue-header">
        <p>{{ title }}</p>
          <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/yingxin/process' }">{{breadcrumb}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/yingxin/ruxue' }">{{secondTitle}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if='title'>{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
      </el-row>
    </el-header>
    <my-app></my-app>
  </el-container>
</template>
<script>
import myApp from 'oa/components/application'
export default {
  components: {
    myApp
  },
  data () {
    return {
      breadcrumb: '',
      secondTitle: '',
      title: '添加应用'
    }
  },
  methods: {
    // 入口进行判断现场配置和入学配置
    judgeView () {
      let state = this.$store.getters.ruxueSiteState
      this.ruxueSiteState = state
      this.breadcrumb = this.$store.getters.ruxueItem.processName
      if ( state === '') {
        this.MessageError ('未获取到数据，为您跳回到上一页面')
        this.$router.push({path: '/yingxin/process'})
      } else if ( state === 1) {
        // 此处为入学配置
        this.secondTitle = '入学配置'
      } else if ( state === 2) {
        // 2为查看入学配置
        this.secondTitle = '查看入学配置'
      } else if ( state === 3) {
        // 3为现场配置
        this.secondTitle = '现场配置'
      } else if ( state === 4) {
        // 4为查看现场配置
        this.secondTitle = '查看现场配置'
      }
    }
  },
  mounted () {
    this.judgeView()
  }
}
</script>
<style lang="stylus" scoped>
.vue-header
  padding-top 21px
  padding-bottom 15px
  p
    color #555
    font-size 18px
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
