<template>
  <div>
    <el-container style="padding:20px">
      <el-header>
        <el-row class="vue-header">
          <el-col  :span="6">
            <span class="only-title">迎新配置</span>
          </el-col>
          <el-col :offset="7" :span="4">
            <span>状态</span>
            <el-select size="small" v-model="stateBtn" @change="change()" style="width:120px">
              <el-option
                v-for="(item) in allStateBtn"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <span>迎新年限</span>
            <el-select size="small" v-model="yearBtn" style="width:120px" @change="change()">
              <el-option
                v-for="(item) in allYearBtn"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" v-if="roles[0] === '1'">
            <el-button @click="add" size="small">新增</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" :stripe="true" style="width: 100%">
          <el-table-column prop="processName" align="center" label="迎新流程名称" width="320">
          </el-table-column>
          <el-table-column prop="year" align="center" label="迎新年限" width="120">
          </el-table-column>
          <el-table-column prop="creatTime" align="center" label="开始时间" width="180">
          </el-table-column>
          <el-table-column prop="endTime" align="center" label="结束时间" width="180">
          </el-table-column>
          <el-table-column prop="stuType" align="center" label="生源类型" width="250">
          </el-table-column>
          <el-table-column prop="state" align="center" label="状态" width="150">
            <template  slot-scope="scope">
              <p>{{allStateBtn[scope.row.state].name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作栏">
            <template slot-scope="scope">
              <el-button v-if="scope.row.state === 4 && roles[0] === '1'" type="text" size="small" @click="test(scope.row)">测试</el-button>
              <el-button v-if="scope.row.state === 4 && roles[0] === '1'" type="text" size="small" @click="enable(scope.row)">启用</el-button>
              <el-button v-if="scope.row.state === 4 && roles[0] === '1'" type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.state === 4 && roles[0] === '1'" type="text" size="small" @click="ruxueConfig(scope.row)">入学配置</el-button>
              <el-button v-if="scope.row.state === 3 && roles[0] === '1'" type="text" size="small" @click="unable(scope.row)">停测</el-button>
              <el-button v-if="scope.row.state !== 4 && roles[0] === '1'" type="text" size="small" @click="viewruxue(scope.row)">查看入学配置</el-button>
              <el-button v-if="scope.row.state !== 4 && roles[0] === '1'" type="text" size="small" @click="viewSite(scope.row)">查看现场配置</el-button>
              <el-button v-if="scope.row.state === 4 && roles[0] === '1'" type="text" size="small" @click="siteConfig(scope.row)">现场配置</el-button>
              <el-button type="text" size="small" @click="teacher(scope.row)">教师办公设置</el-button>
              <el-button v-if="scope.row.state === 4 && roles[0] === '1'" type="text" size="small" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-col :span="6" :offset="18">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="size"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { fetchProcessList, fetchAllYear, changeState, delProcess } from 'oa/api/process/ruxue'
import { mapGetters } from 'vuex'
const SUCCESS_OK = '200'
export default {
  data () {
    return {
      // title: '教师办公设置',
      stateBtn: '',
      yearBtn: '全部年限',
      allStateBtn: ['全部状态', '启用中', '进行中', '测试中', '尚未启用','已结束'],
      allYearBtn: [],
      page: 1,
      size: 10,
      total: 10,
      tableData: []
    }
  },
  methods: {
    // 选择状态调用
    change () {
      this._fetchProcessList()
    },
    // 新增流程按钮
    add () {
      this.$router.push({path:'addProcess'})
      this.$store.commit('processItem', '')
    },
    // 编辑流程按钮
    edit (item) {
      this.$router.push({path:'addProcess'})
      this.$store.commit('processItem', item)
    },
    handleCurrentChange(val) {
      this._fetchProcessList()
    },
    // 点击入学配置，跳转入学配置页面
    ruxueConfig (item) {
      this.$router.push({path:'ruxue'})
      this.$store.commit('ruxueItem', item)
      this.$store.commit('ruxueSiteState', 1)
    },
    // 点击查看入学配置，跳转，查看
    viewruxue (item) {
      this.$store.commit('ruxueItem', item)
      this.$store.commit('ruxueSiteState', 2)
      this.$router.push({path:'ruxue'})
      
    },
    // 点击现场配置
    siteConfig (item) {
      this.$store.commit('ruxueItem', item)
      this.$store.commit('ruxueSiteState', 3)
      this.$router.push({path: 'ruxue'})
    },
    // 点击查看现场配置
    viewSite (item) {
      this.$store.commit('ruxueItem', item)
      this.$store.commit('ruxueSiteState', 4)
      this.$router.push({path: 'ruxue'})
    },
    // 点击测试
    test (item) {
      // console.log(item)
      this._changeState(item.enrollLogicId, 3)
    },
    // 点击启用
    enable (item) {
      this._changeState(item.enrollLogicId, 1)
    },
    // 点击停测
    unable (item) {
      this._changeState(item.enrollLogicId, 4)
    },
    // 点击删除
    del (item) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
           // 删除流程
          delProcess(item.enrollLogicId).then(res => {
            res = res.data
            if (res.state === SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._fetchProcessList()
            } else {
              this.MessageError(res.message)
            }
          }).catch(this.MessageError())
        }  
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    },
    // 改变状态
    _changeState (enrollLogicId, state) {
      changeState(enrollLogicId, state).then(res => {
        res = res.data
        if (res.state = SUCCESS_OK) {
          this.MessageSuccess(res.message)
          this._fetchProcessList()
        } else {
          this.MessageError(res.message)
        }
      }).catch(() =>{
        this.MessageError()
      })
    },
    // 获取流程列表
    _fetchProcessList () {
      let loading = this.loading()
      fetchProcessList(this.yearBtn, this.stateBtn, this.page, this.size).then(res => {
        loading.close()
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.tableData = res.data.rows
          // this.tableData = res.data
          this.total = res.data.total
        } else {
          this.MessageError(res.message)
        }
      }).catch(e => {
        loading.close()
        this.MessageError()
      })
    },
    // 获取所有查询条件
    _fetchAllConfig () {
      let loading = this.loading()
      fetchAllYear().then(res => {
        loading.close()
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.allYearBtn = res.data.year
          this.allStateBtn = res.data.types
          this.stateBtn = this.allStateBtn[0].id // 默认状态
          this.yearBtn = this.allYearBtn[0] // 默认的年
          this._fetchProcessList() // 获取值
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
    },
    // 点击教师配置后路由跳转页面
    teacher (item) {
      console.log(item)
      this.$router.push({path: '/yingxin/teacher'})
      this.$store.commit('teacherItem', item)
    }
  },
  mounted () {
    console.log(this.roles)
    this._fetchAllConfig()
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
}
</script>
<style lang="stylus" scoped>
// .vue-header
//   padding-top 21px
//   padding-bottom 15px
  p
    // color #555
    // font-size 18px
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