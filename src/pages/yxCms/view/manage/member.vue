<template>
  <el-container class="manage-wrapper">
    <el-header class="header" height="35px">
      <span class="title header-item h-left">成员管理</span>
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>查看统计权限</el-breadcrumb-item>
        <el-breadcrumb-item>{{manage.groupName}}</el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="btn-excel header-item h-right" @click="add">添加成员</span>
      <span class="btn-excel header-item h-right" @click="back">返回</span>
    </el-header>
    <el-main  class="list-content">
      <el-table :data="mList" border style="width: 100%">
        <el-table-column prop="date" label="成员" align="center">
          <template slot-scope="scope">
            <p class="item">
              <span>{{scope.row.member}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template slot-scope="scope">
            <p class="item">
              <span class="click" @click="del(scope.row.userId)">删除</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination class="footer"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="display"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
const OK_CODE = '200'
import { fetchMember, delMember } from 'oa/api/manage/index'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      mList: [],
      currentPage: 1,
      display: 10,
      total: 30
    }
  },
  methods: {
    // 获取权限组对应的成员
    _fetchMember() {
      // 处理边界,如果页面刷新,则从新返回列表
      if (!this.manage.roleId || this.manage.roleId === '') {
        this.$router.push({
          path: '/manage/index/list'
        })
        return
      }
      let loading = this.loading() // 打开加载中
      fetchMember(this.currentPage, this.display, this.manage.roleId).then(res => {
        loading.close() // 关闭加载中
        res = res.data
        if (res.state === OK_CODE) {
          this.mList = res.data.rows
          this.total = res.data.total
        } else {
          this.MessageError(res.message)
        }
      }).catch(_ => {
        loading.close()
        this.MessageError('链接数据库失败')
      })
    },
    // 点击跳转页面
    handleCurrentChange() {
      this._fetchMember()
    },
    // 点击新增权限组
    add () {
      this.$router.push({
        path: '/manage/index/addmember'
      })
    },
    // 点击返回
    back() {
      this.$router.push({
        path: '/manage/index/list'
      })
    },
    // 点击删除按钮
    del(id) {
      this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delMember(id)
      }).catch(() => {        
      })
    },
    // 删除成员接口
    _delMember(id) {
      let loading = this.loading()
      delMember(id).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
          this._fetchMember()
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
         this.MessageError('链接数据库失败')
      })
    }
  },
  created () {
    this._fetchMember()
  },
  computed: {
    ...mapGetters([
      'manage'
    ])
  }
}
</script>


<style lang="stylus" scoped>
@import '~oa/style/variable'
.manage-wrapper
  padding 0 11px
  box-sizing border-box
  width 100%
  height 100%
  .header
    border-bottom 1px solid $color-theme
    padding-bottom 5px
    height 25px
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
    .header-item
      display inline-block
      font-size $font-size-large
    .h-left
      float left
    .h-right
      float right 
      padding 5px
      border 1px solid $color-theme
      border-radius 3px
      color $color-theme
      cursor pointer
      margin-right 5px
    .title
      color #555555
      font-weight bold
  .list-content
    padding 0
    margin-top 10px
    .item
      .click
        cursor pointer
        padding 5px
  .footer
    text-align right 
</style>
