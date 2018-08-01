<template>
  <el-container>
    <el-header>
      <el-row class="vue-header">
        <el-col>
          <span>成员管理</span>
          <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{teacherItem.processName}}</el-breadcrumb-item>
            <el-breadcrumb-item>教师办公配置</el-breadcrumb-item>
            <el-breadcrumb-item>{{teacher.groupName}}</el-breadcrumb-item>
            <el-breadcrumb-item>成员管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="8">
          <el-form :model="form" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
            <el-form-item label="教师职工号" prop="teacherId">
              <el-input type="text" v-model="form.teacherId" placeholder="请输入教师职工号" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('form')">添加</el-button>
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
import { addMember} from 'oa/api/teacher/index'
const OK_CODE = '200'
export default {
  data () {
    return {
      form: {
        teacherId: ''
      },
      rules: {
        teacherId: [{required: true, message: '教师职工号不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    // 点击保存按钮
    submit (form) {
      this.$refs[form].validate((valid) => {
        // 验证成功
        if (valid) {
          let loading = this.loading()
          addMember(this.teacherItem.enrollLogicId,this.teacher.groupId, this.form.teacherId).then(res => {
            loading.close()
            res = res.data
            if (res.state === OK_CODE){
              this.MessageSuccess(res.message)
              this.goBack()
            } else {
              this.MessageError(res.message)
            }
          }).catch(() => {
            loading.close()
            this.MessageError
          })
        }
      })
    },
    goBack () {
      this.$router.push({path: '/yingxin/member'})
    }
  },
  mounted () {
    // 如果用户刷新页面，返回首页
    if (!this.teacher.groupName || this.teacher.groupName === '') {
       this.goBack()
       return
    }
  },
  computed: {
    ...mapGetters([
      'teacher', 'teacherItem'
    ])
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
