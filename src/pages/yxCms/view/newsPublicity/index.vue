<template>
  <div name="newsPublicity">
    <news-header :page="page" :headerTitle='headerTitle'></news-header>
    <news-central class="newscentral" :tableData='tableData' @update="update"></news-central>
    <el-row>
      <el-col :span="6" :offset="18">
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
import newsHeader from './header'
import newsCentral from './newsCentral'
import { fetchnews } from 'oa/api/statis/news'
const OK_CODE = '200'
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
          // yinxin:'迎新',
          titlename: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize:10,
        totalNum: 0
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
      // 子组件用刷新
      update() {
        this._fetchnews()
      }
    },
    created () {
      this._fetchnews ()
    }
}
</script>
<style lang="stylus" scoped>
div[name = 'newsPublicity']
  width 98%
  margin 0 1%
.newscentral
  margin-top 24px
</style>
