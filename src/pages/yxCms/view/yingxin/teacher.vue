<template>
  <div>
    <el-container style="padding: 20px">
      <el-header>
        <el-row class="vue-header">
          <el-col :span="12" class="left">
            <span class="only-title">教师办公配置</span>
            <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item to="/yingxin/process">{{teacherItem.processName}}</el-breadcrumb-item>
              <el-breadcrumb-item>教师办公配置</el-breadcrumb-item>
            </el-breadcrumb>
            </el-col>
          <el-col :span="12">
            <span @click="add" class="btn">新增权限组</span>
            <span @click="goBack" class="btn">返回</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" :stripe="true" style="width: 100%">
          <el-table-column prop="groupName" align="center" label="分组名称" width="400">
          </el-table-column>
          <el-table-column prop="member" align="center" label="成员" width="300">
          </el-table-column>
          <el-table-column prop="accountType" align="center" label="账号类型" width="300">
          </el-table-column>
          <el-table-column prop="creator" align="center" label="创建者" width="350">
          </el-table-column>
          <el-table-column align="center" label="操作栏">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goto(scope.row, '/yingxin/authGroupEdit')">权限组编辑</el-button>
              <el-button type="text" size="small" @click="goto(scope.row, '/yingxin/authConfig')">权限配置</el-button>
              <el-button type="text" size="small" @click="goto(scope.row, '/yingxin/authority')">权限范围</el-button>
              <el-button type="text" size="small" @click="goto(scope.row, '/yingxin/member')">成员管理</el-button>
              <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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
import { fetchAllTeacher, delTeacher} from 'oa/api/teacher/index'
import { mapMutations, mapGetters } from 'vuex'
const SUCCESS_OK = '200'
export default {
  data () {
    return {
      page: 1,
      size: 10,
      total: 20,
      tableData: []
    }
  },
  methods: {
    // 新增流程按钮
    add () {
      this.$router.push({path:'/yingxin/addAuth'})
    },
    goto(item, path) {
      this._setTeacher(item)
      this.$router.push({path})
    },
    handleCurrentChange(val) {
      this._fetchAllTeacher()
    },
    // 点击返回按钮
    goBack() {
      this.$router.push({
        path: '/yingxin/process'
      })
    },
    // 获取流程列表
    _fetchAllTeacher () {
      // 处理边界情况
      if (!this.teacherItem.enrollLogicId || this.teacherItem.enrollLogicId === '') {
        this.goBack()
        return
      }
      let loading = this.loading()
      fetchAllTeacher(this.teacherItem.enrollLogicId, this.page, this.size).then(res => {
        loading.close()
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.tableData = res.data.rows
          this.total = res.data.total
        } else {
          this.MessageError(res.message)
        }
      }).catch(e => {
        loading.close()
        this.MessageError()
      })
    },
    // 删除
    del(item) {
      this.$confirm('此操作将永久删除该权限组名, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.loading()
        delTeacher(item.groupId).then(res => {
          loading.close()
          res = res.data
          if (res.state === SUCCESS_OK) {
            this.MessageSuccess(res.message)
            this._fetchAllTeacher()
          } else {
            this.MessageError(res.message)
          }
        })
      }).catch(() => {
        loading.close()
        this.MessageError()      
      })
    },
    ...mapMutations({
      '_setTeacher': 'SET_TEACHER'
    })
  },
  mounted () {
    this._fetchAllTeacher()
  },
  computed: {
    ...mapGetters(['teacherItem'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~oa/style/variable'
.vue-header
  padding 0
  .left
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
  .btn
    float right 
    padding 5px
    border 1px solid $color-theme
    border-radius 3px
    color $color-theme
    cursor pointer
</style>
