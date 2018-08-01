<template>
  <div class="synthesis-wrapper">
    <header class="header">
      <span class="title header-item">添加成员</span>
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>查看统计权限</el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加成员</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <el-row class="addmanage-wrapper">
      <el-col :span="16" class="addmanage">
        <label class="title">教师职工号</label>
        <div class="add-input">
          <el-input
            placeholder="请输入教师职工号"
            v-model="input"
            size="mini"
            clearable>
          </el-input>
          <span class="msg">{{msg}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="btn-wrapper">
      <el-col :span="8" class="btn-container">
        <span class="btn-back btn" @click="back">返回</span>
        <span class="btn-add btn" @click="add">添加</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addMember } from 'oa/api/manage/index'
const OK_CODE= '200'
export default {
  data () {
    return {
      input: '',
      msg: ""
    }
  },
  methods: {
    back() {
      this.$router.push({
        path: '/manage/index/member'
      })
    },
    add() {
      if (this.input === '') {
        this.msg = '输入不能够为空'
        return
      }
      this._addMember()
    },
    // 添加成员
    _addMember() {
      let loading = this.loading()
      addMember(this.manage.roleId, this.input).then(res => {
        loading.close()
        res = res.data
        // 添加成功后跳转
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
          this.$router.push({
            path: '/manage/index/member'
          })
        } else {
          // 添加失败
          this.msg = res.message
        }
      }).catch(() => {
        loading.close()
        // 捕获接口异常
        this.MessageError('链接数据库失败')
      })
    }
  },
  // 如果manageid为空则跳转到首页
  created () {
    if (!this.manage.roleId || this.manage.roleId === '') {
      this.$router.push({
        path: '/manage/index/list'
      })
    }
  },
  computed: {
    ...mapGetters([
        'manage'
    ])
  }
}
</script>


<style lang="stylus" scoped>
@import '~oa/style/variable';

.synthesis-wrapper 
  padding: 0 11px
  box-sizing: border-box
  width: 100%
  height: 100%
  .header 
    border-bottom: 1px solid $color-theme
    padding-bottom: 5px
    height: 25px
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
    .header-item 
      display: inline-block;
      font-size: $font-size-large
    .h-left 
      float: left
    .h-right 
      float: right
      padding: 5px
      border: 1px solid $color-theme
      border-radius: 3px
      color: $color-theme
      cursor: pointer
    .title 
      color: #555555
      font-weight: bold
  .addmanage-wrapper 
    margin-top: 15px
    .addmanage 
      display: flex
      .title, .desc 
        line-height: 28px
      .add-input 
        padding: 0 15px
        .msg 
          color: #EC4E4E
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
