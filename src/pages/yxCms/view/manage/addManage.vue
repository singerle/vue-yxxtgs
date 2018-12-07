<template>
  <div class="synthesis-wrapper">
    <header class="header">
      <span class="title header-item">新增权限组</span>
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/manage/index/list">查看统计权限</el-breadcrumb-item>
        <el-breadcrumb-item>新增权限组</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <el-row class="addmanage-wrapper">
      <el-col :span="16" class="addmanage">
        <label class="title">权限组名称</label>
        <div class="add-input">
          <el-input
            placeholder="请输入权限组名称"
            v-model="input"
            size="mini"
            maxlength="20"
            clearable>
          </el-input>
          <span class="msg">{{msg}}</span>
        </div>
        <span class="desc">限20个字符内中英文数字</span>
      </el-col>
    </el-row>
    <el-row class="btn-wrapper">
      <el-col :span="8" class="btn-container">
        <span class="btn-add btn" @click="add" v-show="!manage.roleId">添加</span>
        <span class="btn-add btn" v-show="manage.roleId" @click="save">保存</span>
        <span class="btn-back btn" @click="back">返回</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addManage, editManage } from 'oa/api/manage/index'
const OK_CODE = '200'
import { mapGetters } from 'vuex'
import { reg } from 'oa/utils/dom'
export default {
  data () {
    return {
      input: '',
      msg: ""
    }
  },
  computed: {
    ...mapGetters([
      'manage'
    ])
  },
  methods: {
    back() {
      this.$router.push({
        path: '/manage/index/list'
      })
    },
    // 点击添加的时候,进行相应正则验证
    add() {
      if (this.input === '') {
        this.msg = '输入不能够为空'
        return
      } else if (!reg.test(this.input)) {
        this.msg = '只能够输入中文、英文或者数字'
        return
      }
      this._addManage()
    },
    save() {
      if (this.input === '') {
        this.msg = '输入不能够为空'
        return
      } else if (!reg.test(this.input)) {
        this.msg = '只能够输入中文、英文或者数字'
        return
      }
      this._editManage()
    },
    // 执行相应的新增操作
    _addManage() {
      let loading = this.loading()
      addManage(this.input).then(res => {
        loading.close()
        res = res.data
        // 添加成功后跳转到list页面
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
          this.$router.push({
            path: '/manage/index/list'
          })
        } else {
          // 添加失败
          this.msg = res.message
        }
      }).catch(() => {
        loading.close()
        // 捕获接口异常
        this.MessageError()
      })
    },
    // 修改
    _editManage(){
      let loading = this.loading()
      if(this.input!=this.manage.groupName){
      editManage(this.manage.roleId, this.input).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
          this.$router.push({path: '/manage/index/list'})
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
     }else{
        this.MessageSuccess("保存成功！")
        this.$router.push({path: '/manage/index/list'})
      }
    }
  },
  created () {
    this.input = this.manage.groupName ? this.manage.groupName : ''
  }
}
</script>


<style lang="stylus" scoped>
@import '~oa/style/variable'
.synthesis-wrapper
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
    .title
      color #555555
      font-weight bold
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
  .addmanage-wrapper
    margin-top 15px
    .addmanage
      display flex
      .title, .desc
        line-height 28px
      .add-input
        padding 0 15px
        .msg
          color #EC4E4E
  .btn-wrapper
    margin-top 15px
    .btn-container
      text-align center
      .btn
        padding 8px 30px
        display inline-block
        cursor pointer
        border-radius 3px
        border 1px solid $color-theme
      .btn-back
        color $color-theme
      .btn-add
        color #ffffff
        background $color-theme

</style>
