<template>
  <div name="newsPublicity">
    <news-header :page="page" :headerTitle='headerTitle'></news-header>
    <news-central @changeEdit="changeEdit" class="newscentral" :tableData='tableData' @update="update"></news-central>
    <el-row style="margin-top:40px">
      <el-col :span="2" :offset="10">
        <el-button @click="backApp">返回</el-button>
      </el-col>
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page.sync="currentPage" :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import newsHeader from './multiNewsHeader'
import newsCentral from './multinewsCentral'
import { fetchnews } from 'oa/api/statis/news'
import { fetchAppInfo, fetchSiteAppInfo, editAPP, editSiteAPP } from 'oa/api/process/ruxue'
const SUCCESS_OK = '200'
export default {
    components: {
        newsHeader, newsCentral
    },
    data() {
      return {
        page: '/newsPublicity/addedNews',
        headerTitle: {
          title: '新闻公示',
          button: '新增',
          yxTitle: '新闻列表',
          yinxin:'迎新',
          titlename: '',
          isEdit: false,
          appItem: {},
          checked: false,
          disabled: true
        },
        tableData: [],
        currentPage: 1,
        pageSize:10,
        totalNum: 0,
        eaaLogicId: '',
      }
    },
    methods: {
      // 分页
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 分页跳转
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
      },
      // /获取新闻列表数据
      _fetchnews () {
        let newslist = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        let loading = this.loading()
        fetchnews(newslist).then(res => {
          loading.close()
          res = res.data
          console.info(res)
          if (res.state === OK_CODE) {
            console.info(res.data)
            this.tableData = res.data.rows
            this.totalNum = res.data.total
          } else {
              this.MessageError(res.data.message)
          }
        }).catch(_ => {
          loading.close()
          this.MessageError('链接数据库失败')
        })
      },
      // 改变状态 跳转路由
      changeEdit (item) {
        this.headerTitle.isEdit = true
        this.headerTitle.bulletinLogicId = item.bulletinLogicId
        this.$store.commit('set_new_info', this.headerTitle)
        this.$router.push({path: '/yingxin/addMultiNews'})
      },
      // 获取入学配置所有的列表
      _fetchAppInfo(){
        if(this.eaaLogicId === ''){
          // this.imageList[0].url = this.defaultSrc
          return
        } else {
          fetchAppInfo(this.eaaLogicId).then(res => {
            res = res.data
            if(res.state === SUCCESS_OK){
            console.info(res.data)
            this.tableData = res.data.list
            this.headerTitle.checked = res.data.show // true 是勾选 flase是不勾选
            this.headerTitle.disabled = res.data.disabled
            // console.log('tableDate'+this.tableData)
            this.headerTitle.appItem = res.data.enrollAndApplication
            this.headerTitle.yxTitle = this.headerTitle.appItem.enrollName
            this.headerTitle.eaaLogicId = this.eaaLogicId
              // this.ruleForm.cropImg = res.data.bulletinUrl
              // this.ruleForm.titlename = res.data.enrollAndApplication.enrollName
              // this.ruleForm.title = res.data.list[0].bulletinTitle
              // this.ruleForm.content = res.data.list[0].bulletinText
              // this.bulletinLogicId = res.data.list[0].bulletinLogicId
              // this.imageList[0].url = res.data.bulletinUrl  // 点击放大图片的路径
            } else {
              this.MessageError(res.message)
            }
          })
        }
      },
       _fetchSiteAppInfo(){
        if(this.eaaLogicId === ''){
          // this.imageList[0].url = this.defaultSrc
          return
        } else {
          fetchSiteAppInfo(this.eaaLogicId).then(res => {
            res = res.data
            if(res.state === SUCCESS_OK){
            console.info(res.data)
            this.tableData = res.data.list
            this.headerTitle.checked = res.data.show
            this.headerTitle.disabled = res.data.disabled
            // console.log('tableDate'+this.tableData)
            this.headerTitle.appItem = res.data.enrollAndApplication
            this.headerTitle.yxTitle = this.headerTitle.appItem.enrollName
            this.headerTitle.eaaLogicId = this.eaaLogicId
              // this.ruleForm.cropImg = res.data.bulletinUrl
              // this.ruleForm.titlename = res.data.enrollAndApplication.enrollName
              // this.ruleForm.title = res.data.list[0].bulletinTitle
              // this.ruleForm.content = res.data.list[0].bulletinText
              // this.bulletinLogicId = res.data.list[0].bulletinLogicId
              // this.imageList[0].url = res.data.bulletinUrl  // 点击放大图片的路径
            } else {
              this.MessageError(res.message)
            }
          })
        }
      },
      // 子组件用刷新
      update() {
        this._fetchAppInfo()
      },
      backApp () {
        this.$router.push({path: '/yingxin/ruxue/'})
      },
      // 进行入口判断是入学配置还是现场配置
      judgeView () {
        this.ruxueSiteState = this.$store.getters.ruxueSiteState
        this.appItem = this.$store.getters.appItem
        this.eaaLogicId = this.$store.getters.appItem.eaaId
        if (this.ruxueSiteState === '') {
          this.MessageError('为获取到数据，将跳转到上一页面')
          this.$router.push({path: '/yingxin/ruxue/'})
        } else if (this.ruxueSiteState === 1) {
          // 入学应用配置
          this._fetchAppInfo()
        } else if (this.ruxueSiteState === 3) {
          this._fetchSiteAppInfo()                            
          // 现场应用配置
        }
      }
    },
    created () {
      this.judgeView()
      // this._fetchnews ()
    }
}
</script>
<style lang="stylus" scoped>
div[name = 'newsPublicity']
  width 98%
  margin 0 1%
// .newscentral
//   margin-top 24px
</style>
