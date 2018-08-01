<template>
  <el-container class="manage-wrapper">
    <el-header class="header" height="35px">
      <span class="title header-item h-left">统计查看权限</span>
      <span class="btn-excel header-item h-right" @click="add">添加权限组</span>
    </el-header>
    <el-main  class="list-content">
      <el-table :data="mList" border style="width: 100%">
        <el-table-column prop="date" label="分组名称" align="center"  width="300">
          <template slot-scope="scope">
            <p class="item">
              <span>{{scope.row.groupName}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="成员" align="center"  width="350">
          <template slot-scope="scope">
            <p class="item">
              <span>{{scope.row.member}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="账号类型" align="center"  width="300">
          <template slot-scope="scope">
            <p class="item">
              <span>{{scope.row.type}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="创建者" align="center"  width="300">
          <template slot-scope="scope">
            <p class="item">
              <span>{{scope.row.creat}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template slot-scope="scope">
            <p class="item">
              <el-button type="text" size="small" @click="edit(scope.row)">权限组编辑</el-button>
              <el-button type="text" size="small" @click="set(scope.row)">权限配置</el-button>
              <el-button type="text" size="small" @click="del(scope.row.roleId)">权限删除</el-button>
              <el-button type="text" size="small" @click="range(scope.row)">权限范围</el-button>
              <el-button type="text" size="small" @click="member(scope.row)">成员管理</el-button>
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
import { fetchList, delManage } from 'oa/api/manage/index'
import { mapMutations } from 'vuex'
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
    // 获取权限列表
    _fetchList() {
      let loading = this.loading() // 打开加载中
      fetchList(this.currentPage, this.display).then(res => {
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
      this._fetchList()
    },
    // 点击新增权限组
    add () {
      this._setId({}) // 新增的时候置空
      this.$router.push({
        path: '/manage/index/add'
      })
    },
    // 成员管理
    member(id) {
      this._setId(id)
      this.$router.push({
        path: '/manage/index/member'
      })
    },
    // 权限设置
    set(id) {
      this._setId(id)
      this.$router.push({
        path: '/manage/index/manageset'
      })
    },
    // 点击编辑权限
    edit(manage) {
      this._setId(manage)
      this.$router.push({
        path: '/manage/index/add'
      })
    },
    // 点击权限范围
    range(manage) {
      this._setId(manage)
      this.$router.push({
        path: '/manage/index/range'
      })
    },
    // 点击删除
    del(id) {
      this.$confirm('此操作将永久删除该权限组名, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.loading()
        delManage(id).then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.MessageSuccess(res.message)
            this._fetchList()
          } else {
            this.MessageError(res.message)
          }
        }).catch(() => {
          loading.close()
          this.MessageError()
        })
      }).catch(() => {        
      })
    },
    ...mapMutations({
      '_setId': 'SET_MANAGE_ID'
    })
  },
  created () {
    this._fetchList()
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
