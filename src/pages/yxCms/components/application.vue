<template>
  <div class="wrapper">
      <div class="header">
        <div class="header-con">
          <div class="desc-container">
            <p class="title">内嵌式应用</p>
            <p class="text">只能添加一个，不能更改任务内容</p>
          </div>
          <div class="desc-container">
            <p class="title">自定义应用</p>
            <p class="text">可多个，自己设置展示内容</p>
          </div>
          <div class="type-container">
            <div class="title" style="width:200px">任务类型解释:</div>
            <div class="alltype">
              <div class="single-type" v-for="(item, index) in typeData" :key="index">
                <div class="type-title" :class="item.color">{{ item.title }}</div>
                <span class="text">{{ item.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="product" v-for="(app, index) in productList" :key="index">
          <div class="list-title">
            <img  class="t-icon" src="./t-icon.png"/>
            <span class="title">{{ app.title }}</span>
          </div>
          <div class="app-con">
            <div v-for="(item, index) in app.data" :key="index" class="app-box">
              <div class="app-main">
                <div class="img-con">
                  <img class="icon" :src="item.imgUrl">
                </div>
                <div class="text-con">
                  <div class="title"> {{ item.name }}</div>
                  <div class="app-text text1" :class="item.color">{{ item.type }}</div>
                  <div class="app-text">{{ item.desc }}</div>
                </div>
              </div>
              <div class="btn" v-if="show(item)" @click="addapp(item)">添加</div>
              <div class="btn1" v-if="show2(item) ">已添加</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { fetchAppBox, addRuxueApp, addSiteApp } from 'oa/api/process/ruxue'
const SUCCESS_OK = "200"
export default {
  data () {
    return {
      enrollId: '',
      ruxueSiteState: '',
      ruxueItem: {},
      title1: '内嵌式应用',
      title2: '自定义应用',
      btnState: ['添加', '已添加'],
      typeData: [{
        title: 'A通过型',
        text: '(完成任务内表单提交或确认等最终操作视为完成任务)',
        color: 'green-bg'
      }, {
        title: 'B选择型',
        text: '(任务提供A与B两种选择，选择任意之一视为完成任务)',
        color: 'red-bg'
      }, {
        title: 'C阅读型',
        text: '(浏览了相应内容，返回自动视为完成任务)',
        color: 'blue-bg'
      }, {
        title: 'D现场型',
        text: '(学生需要到现场办理，办理完成由教师操作完成后，视为完成)',
        color: 'orange-bg'
      }],
      productList: []
    }
  },
  methods: {
    addapp (item) {
      if (this.ruxueSiteState === 1) {
        this._addRuxueApp(item.name, item.applicationId)
      } else if (this.ruxueSiteState === 2) {
        return false
      } else if (this.ruxueSiteState === 3) {
        this._addSiteApp(item.name, item.applicationId)
      } else if (this.ruxueSiteState === 4) {
        return false
      }
      // item.state = 1
    },
    show (item) {
      if (item.state === 0) {
        return true
      } else {
        return false
      }
    },
    show2 (item) {
      if (item.state === 1) {
        return true
      } else {
        return false
      }
    },
    // 入学配置的添加应用
    _addRuxueApp (enrollName, applicationId) {
      addRuxueApp (enrollName, applicationId, this.enrollId).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.MessageSuccess('添加应用成功')
          this._fetchAppBox(1)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError()
      })
    },
    // 现场配置的添加应用
    _addSiteApp (enrollName, applicationId) {
      addSiteApp (enrollName, applicationId, this.enrollId).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.MessageSuccess('添加应用成功')
          this._fetchAppBox(2)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError()
      })
    },
    // 获取所有appbox
    _fetchAppBox (type) {
      fetchAppBox(this.enrollId, type).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.productList = res.data
          console.info(this.productList)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError()
      })
    },
    // 获取现场配置和入学配置中vuex存取的整条数据,包括id
    getruxueItem () {
      this.ruxueItem = this.$store.getters.ruxueItem
      console.log(this.ruxueItem)
      this.enrollId = this.ruxueItem.enrollLogicId
    },
    // 首先获取是否为编辑的状态，然后获取相应的state数据
    judgeView () {
      let state = this.$store.getters.ruxueSiteState
      this.ruxueSiteState = state
      // this.breadcrumb = this.$store.getters.ruxueItem.processName
      if ( state === '') {
        this.MessageError ('未获取到数据，为您跳回到上一页面')
        this.$router.push({path: '/yingxin/process'})
      } else if ( state === 1) {
        // 此处为入学配置
        this._fetchAppBox (1)
      } else if ( state === 2) {
        // 2为查看入学配置
        this._fetchAppBox (1)
      } else if ( state === 3) {
        // 3为现场配置
        this._fetchAppBox (2)
      } else if ( state === 4) {
        // 4为查看现场配置
        this._fetchAppBox (2)
      }
    }
  },
  mounted () {
    this.getruxueItem()
    this.judgeView()
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  width 100%
  height 100%
  box-sizing border-box
  padding 20px
  .header
    margin-bottom 20px
    .header-con
      display flex
      width 100%
      .desc-container
        width 259px
        height 76px
        padding 26px 0 0 57px
        margin-right 10px
        border 1px solid #ECECEC
        .title
          color #555
          font-size 16px
          font-weight bold
          padding-bottom 3px
        .text
          color #555
          font-size 12px
          margin-top 5px
      .type-container
        width 1160px
        height 76px
        padding 26px 0 0 57px
        border 1px solid #ECECEC
        display flex
        .title
          color #555
          font-size 16px
          font-weight  bold
          padding-bottom 3px
        .alltype
          float right
          .single-type
            float left
            width 46%
            height 22px
            margin-bottom 10px
            .type-title
              color white
              display inline-block
              line-height 22px
              text-align center
              height 22px
              width 60px
              border-radius 3px
            .green-bg
              background-color #00c59f
            .red-bg
              background-color #fb6868
            .blue-bg
              background-color #2a9eff
            .orange-bg
              background-color #ff8436
            .text
              color #555
              font-size 12px
  .main
    width 100%
    .list-title
      height 40px
      line-height 40px
      .t-icon
        width 12px
        height 18px
        position relative
        top 2px
      .title
        color #555
        font-size 18px
        font-weight  bold
        padding-bottom 3px
    .app-con
      display flex
      flex-wrap wrap
      .app-box
        width 274px
        height 160px
        margin-right 30px
        margin-bottom 15px 
        .app-main
          display flex
          flex-wrap nowrap
          width 254px
          height 99px
          padding 25px 0 0 20px
          border #ECECEC 1px solid
          .img-con
            width 70px
            height 83px
            .icon
              width 100%
              height 100%
              object-fit cover
          .text-con
            margin-left 10px
            margin-top 5px
            .title
              color #555
              font-size 16px
              font-weight  bold
              padding-bottom 3px
            .app-text
              font-size 12px
              color #777
              margin-top 10px
            .green
              color #00c59f
            .red
              color #fb6868
            .blue
              color #2a9eff
            .orange
              color #ff8436
            .text1
              margin-top 20px
        .btn
          height 36px
          width 274px
          text-align center
          font 14px
          color white
          line-height 36px
          background-color #2184C5
        .btn1
          height 36px
          width 274px
          text-align center
          font 14px
          color white
          color #999
          line-height 36px
          background-color #F3F3F3
          border #EAEAEA 1px solid
</style>
