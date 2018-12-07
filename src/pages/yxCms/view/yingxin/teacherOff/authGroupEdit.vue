<template>
  <el-container>
    <el-header>
      <el-row class="vue-header">
        <el-col>
          <span>权限组编辑</span>
          <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/yingxin/process">{{teacherItem.processName}}</el-breadcrumb-item>
            <el-breadcrumb-item to="/yingxin/teacher">教师办公配置</el-breadcrumb-item>
            <el-breadcrumb-item to="/yingxin/teacher">{{teacher.groupName}}</el-breadcrumb-item>
            <el-breadcrumb-item>权限组编辑</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="14">
          <el-form :model="form" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
            <el-form-item label="权限组名称" prop="authGroupName">
              <el-row>
                <el-col :span="11"><el-input type="text" v-model="form.authGroupName" auto-complete="off" maxlength="20"></el-input></el-col>
                <el-col :span="10" :offset="1"><span style="color:#999999" >中英文数字，限20个字符内</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('form')">保存</el-button>
              <el-button @click="goBack">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { editTeacher} from 'oa/api/teacher/index'
import { checkTeacherId } from 'oa/utils/dom'
const OK_CODE = '200'
export default {
  data () {
    return {
      form: {
        authGroupName: ''
      },
      rules: {
        authGroupName: [
          {required: true, message: '权限组名称不能为空', trigger: 'blur'},
          {validator: checkTeacherId, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 点击保存按钮
    submit (form) {
     this.$refs[form].validate((valid) => {
       console.log(this.teacherItem)
       // 验证通过
       if (valid) {
         let loading = this.loading()
         editTeacher(this.teacher.groupId, this.form.authGroupName, this.teacherItem.enrollLogicId).then(res => {
           loading.close()
           res = res.data
           if (res.state === OK_CODE) {
             this.MessageSuccess(res.message)
             this.goBack()
           } else {
             this.MessageError(res.message)
           }
         }).catch(_ => {
           loading.close()
           this.MessageError()
         })
       }
     })
    },
    goBack () {
      this.$router.push({path: '/yingxin/teacher'})
    },
  },
  computed: {
    ...mapGetters([
      'teacher', 'teacherItem'
    ])
  },
  created () {
    // 如果用户刷新页面，返回首页
    if (!this.teacher.groupName || this.teacher.groupName === '') {
       this.goBack()
       return
    }
    this.form.authGroupName = this.teacher.groupName
  }
}
</script>

<style lang="stylus" scoped>
@import '~oa/style/variable'
.vue-header
  padding 15px 0
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