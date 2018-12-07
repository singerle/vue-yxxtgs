<template>
  <el-container>
    <el-header>
      <el-row class="vue-header">
        <el-col>
          <span class="vue-title">新增权限组</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-form :model="form" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
            <el-form-item label="权限组名称" prop="teacherId">
              <el-row>
                <el-col :span="6">
                  <el-input type="text" v-model="form.teacherId" placeholder="请输入权限组名称" auto-complete="off" maxlength="20"></el-input>
                </el-col>
                <el-col :span="10" :offset="1"><span style="color:#999999">限20字符内中英文数字</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('form')" >添加</el-button>
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
import { addTeacher} from 'oa/api/teacher/index'
import { mapGetters } from 'vuex'
import { checkTeacherId } from 'oa/utils/dom'
const OK_CODE = '200'
export default {
  data () {
    return {
      show: false,
      form: {
        teacherId: ''
      },
      rules: {
        teacherId: [
          {required: true, message: '权限组名称不能为空', trigger: 'blur'},
          {validator: checkTeacherId, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 点击添加按钮
    submit (form) {
      this.$refs[form].validate((valid) => {
        // 验证通过
        if (valid) {
          // 处理边界情况
          if (!this.teacherItem.enrollLogicId || this.teacherItem.enrollLogicId === '') {
            this.$router.push({
              path: '/yingxin/process'
            })
            return
          }
          let loading = this.loading()
          addTeacher(this.teacherItem.enrollLogicId, this.form.teacherId).then(res => {
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
    }
  },
  computed: {
    ...mapGetters([
      'teacherItem'
    ])
  },
}
</script>
