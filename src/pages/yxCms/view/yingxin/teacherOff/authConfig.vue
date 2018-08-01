<template>
  <div>
    <el-container style="padding:20px">
      <el-header>
        <el-row class="vue-header">
          <el-col  :span="24">
            <span class="only-title">权限设置</span>
            <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>迎新配置</el-breadcrumb-item>
              <el-breadcrumb-item>教师办公配置</el-breadcrumb-item>
              <el-breadcrumb-item>{{teacher.groupName}}</el-breadcrumb-item>
              <el-breadcrumb-item>权限设置</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" :stripe="true" style="width: 100%">
          <el-table-column  align="center" prop="name" label="成员" width="700">
          </el-table-column>
          <el-table-column  align="center" label="操作">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.check" label="可操作"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :offset="10" :span="4">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { getAllApplication, saveApplication } from 'oa/api/teacher/index'
import { mapGetters } from 'vuex'
import { manageDataSet } from 'oa/utils/manage' 
const SUCCESS_OK = '200'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    // 获取权限 应用列表
    _getAllApplication () {
      // 边界处理
      if (!this.teacher.groupName || !this.teacher.groupName === '') {
        this.goBack()
        return
      }
      let loading = this.loading()
      // 流程id和权限组id
      getAllApplication(this.teacherItem.enrollLogicId, this.teacher.groupId).then(res => {
        loading.close()
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.tableData = res.data
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      }) 
    },
    // 点击返回
    goBack () {
      this.$router.push({path: '/yingxin/teacher'})
    },
    // 点击保存
    save() {
      let loading = this.loading()
      let text = manageDataSet(this.tableData)
      saveApplication(this.teacherItem.enrollLogicId, this.teacher.groupId, text).then(res => {
        loading.close()
        res = res.data
        if (res.state === SUCCESS_OK) {
          this._getAllApplication()
          this.MessageSuccess(res.message)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
    }
  },
  mounted () {
    this._getAllApplication()
  },
  computed: {
    ...mapGetters([
      'teacher',
      'teacherItem'
    ])
  }
}
</script>
<style lang="stylus" scoped>
@import '~oa/style/variable'
.vue-header
  .crumbs
    display inline-block
    position relative
    top 2px
    left 11px
    font-size 10px
    border-left 2px solid #a7a7a7
    padding-left 10px
</style>