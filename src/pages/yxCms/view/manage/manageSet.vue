<template>
  <el-container class="manage-wrapper">
    <el-header class="header" height="35px">
      <span class="title header-item h-left">权限设置</span>
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/manage/index/list">查看统计权限</el-breadcrumb-item>
        <el-breadcrumb-item to="/manage/index/list">{{manage.groupName}}</el-breadcrumb-item>
        <el-breadcrumb-item>权限设置</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main  class="list-content">
      <el-table :data="mList" border style="width: 100%">
        <el-table-column  label="功能" align="center">
          <template slot-scope="scope">
            <p class="item">
              <span>{{scope.row.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column  label="操作" align="center">
          <template slot-scope="scope">
            <p class="item">
              <el-checkbox v-model="scope.row.check">可操作</el-checkbox>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="btn-wrapper">
        <el-col :span="24" class="btn-container">
          <span class="btn-add btn" @click="save">保存</span>
          <span class="btn-back btn" @click="back">返回</span>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
const OK_CODE = '200'
import { manageset, saveSet } from 'oa/api/manage/index'
import { manageDataSet } from 'oa/utils/manage'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      mList: []
    }
  },
  methods: {
    // 获取权限设置列表
    _manageset() {
            // 处理边界,如果页面刷新,则从新返回列表
      if (!this.manage.roleId || this.manage.roleId === '') {
        this.$router.push({
          path: '/manage/index/list'
        })
        return
      }
      let loading = this.loading() // 打开加载中
      manageset(this.manage.roleId).then(res => {
        loading.close() // 关闭加载中
        res = res.data
        if (res.state === OK_CODE) {
          this.mList = res.data
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
      this._manageset()
    },
    // 点击返回
    back () {
      this.$router.push({
        path: '/manage/index/list'
      })
    },
    // 保存信息
    save() {
      let loading = this.loading()
      let text = manageDataSet(this.mList)
      saveSet(this.manage.roleId, text).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
          // 保存成功，回显数据
          this._manageset()
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
    }
  },
  created () {
    this._manageset()
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
    .header-item
      display inline-block
      font-size $font-size-large
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
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
    .btn-wrapper 
      margin-top: 15px
      .btn-container 
        text-align: center
        .btn 
          padding: 8px 30px
          display: inline-block
          cursor: pointer
          border-radius: 3px
          border: 1px solid $color-theme
        .btn-back 
          color: $color-theme
        .btn-add 
          color: #ffffff
          background: $color-theme
</style>
