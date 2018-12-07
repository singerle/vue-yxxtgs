<template>
  <div>
    <el-container style="padding:20px">
      <el-header>
        <el-row class="vue-header">
          <el-col  :span="12">
            <span class="only-title">成员管理</span>
            <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item to="/yingxin/process">{{teacherItem.processName}}</el-breadcrumb-item>
              <el-breadcrumb-item to="/yingxin/teacher">教师办公配置</el-breadcrumb-item>
              <el-breadcrumb-item to="/yingxin/teacher">{{teacher.groupName}}</el-breadcrumb-item>
              <el-breadcrumb-item>成员管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="12" >
            <span @click="add" class="btn">添加成员</span>
            <span @click="back" class="btn">返回</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" :stripe="true" style="width: 100%">
          <el-table-column  align="center" prop="userName" label="成员" width="700">
          </el-table-column>
          <el-table-column  align="center" label="操作栏">
            <template slot-scope="scope">
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
import { fetchAllMember, delMember } from 'oa/api/teacher/index'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'teacher', 'teacherItem'
    ])
  },
  methods: {
    // 新增成员按钮
    add () {
      this.$router.push({path:'/yingxin/addmember'})
    },
    handleCurrentChange(val) {
      this._fetchAllMember()
    },
    // 点击删除
    del (item) {
      this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.loading()
        delMember(item.userId, this.teacher.groupId).then(res => {
          loading.close()
          res = res.data
          if (res.state === SUCCESS_OK) {
            this.MessageSuccess(res.message)
            // 回显数据
            this._fetchAllMember()
          } else {
            this.MessageError(res.message)
          }
        })
      }).catch(() => {     
        loading.close()
        this.MessageError(res.message)
      })
    },
    // 获取成员列表
    _fetchAllMember () {
      // 如果用户刷新页面，返回首页
      if (!this.teacher.groupName || this.teacher.groupName === '') {
        this.back()
        return
      }
      let loading = this.loading()
      fetchAllMember(this.teacher.groupId, this.page, this.size).then(res => {
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
    // 点击返回
    back() {
      this.$router.push({
        path: '/yingxin/teacher'
      })
    }
  },
  mounted () {
    this._fetchAllMember()
  }
}
</script>
<style lang="stylus" scoped>
@import '~oa/style/variable'
.vue-header
  .btn
    float right 
    padding 5px
    border 1px solid $color-theme
    border-radius 3px
    color $color-theme
    cursor pointer
  .crumbs
    display inline-block
    position relative
    top 2px
    left 11px
    font-size 10px
    border-left 2px solid #a7a7a7
    padding-left 10px
</style>
