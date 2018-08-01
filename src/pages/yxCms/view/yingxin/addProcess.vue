<template>
  <el-container style="padding:20px">
    <el-header>
      <el-row class="vue-header">
        <!-- <span class="vue-title">{{title}}</span> -->
        <p>{{title}}</p>
        <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: backpage }">迎新配置</el-breadcrumb-item>
          <el-breadcrumb-item v-if='this.title==="新增"? true: false'>新增</el-breadcrumb-item>
          <el-breadcrumb-item v-if='this.title==="编辑"? true: false'>编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-header>
    <el-main>
      <el-col :span="8">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px">
            <el-form-item label="迎新流程名称" prop="enrollName">
              <el-input type="textarea" v-model="ruleForm.enrollName" placeholder="限20字符中英文数字" auto-complete="off"></el-input>
            </el-form-item>
          <el-form-item label="迎新年限" prop="enrollYear">
            <template slot-scope="scope">
              {{ruleForm.enrollYear}}
            </template>
          </el-form-item>
          <el-form-item label="开始时间" prop="beginTime">
            <el-date-picker
              v-model="ruleForm.beginTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择开始日期时间"
              default-time="12:00:00"
              @change="changeStart">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              placeholder="选择结束日期时间"
              value-format="timestamp"
              @change="changeEnd"
              default-time="12:00:00">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="生源类型" prop="originType">
              <el-radio-group v-model="ruleForm.originType">
                <el-radio v-for="(item, index) in stuOptions" :key="index" :label="item.id">{{item.name}}</el-radio>
              </el-radio-group>
          </el-form-item> -->
          <el-form-item label="生源类型" prop="originType">
            <el-checkbox-group v-model="ruleForm.originType">
              <el-checkbox v-for="(item, index) in stuOptions" :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">返回</el-button>
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-main> 
  </el-container>
</template>
<script>
import { addProcess, editProcess } from 'oa/api/process/ruxue'
const SUCCESS_OK = "200"
export default {
  data () {
    return {
      title: '新增',
      backpage: '/yingxin/process',
      ruleForm: {
        enrollName: '',
        enrollYear: '',
        beginTime: '',
        endTime: '',
        originType: [1, 2, 3]
      },
      stuOptions: [ {id: 1, name: '本科生'},{id: 2, name: '专科生'} ,{id: 3, name: '研究生'}],
      rules: {
        enrollName: [{
          required: true, message: '迎新流程名称不能为空', trigger: 'blur'
        }],
        // year: [{
        //   required: true, message: '迎新年限不能为空', trigger: 'blur'
        // }],
        beginTime: [{
          required: true, message: '开始时间不能为空', trigger: 'blur'
        }],
        endTime: [{
          required: true, message: '结束时间不能为空', trigger: 'blur'
        }],
        originType: [{
          required: true, message: '请选择生源类型', trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    back () {
      this.$router.push({path: 'process'})
    },
    submit (formName) {
      // 判断是编辑还是新增，进行相应的新增或者编辑操作
      if (this.title === '新增') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addProcess(this.ruleForm).then(res =>{
              this.ruleForm.originType = [1,2,3]
              res = res.data
              if (res.state === SUCCESS_OK) {
                this.MessageSuccess(res.message)
                this.$router.push({path: '/yingxin/process'})
                this.$refs[formName].resetFields()
              } else {
                this.MessageError(res.message)
              }
            }).catch(() => {
              this.ruleForm.originType = [1,2,3]
              this.MessageError()
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editProcess(this.ruleForm).then(res =>{
              this.ruleForm.originType = [1,2,3]
              res = res.data
              if (res.state === SUCCESS_OK) {
                this.MessageSuccess(res.message)
                this.$router.push({path: '/yingxin/process'})
              } else {
                this.MessageError(res.message)
              }
            }).catch(() => {
              this.ruleForm.originType = [1,2,3]
              this.MessageError()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      
    },
    // 检验时间的大小
    changeStart () {
      if ((this.ruleForm.beginTime < this.ruleForm.endTime) || (this.ruleForm.endTime === '')) {
        return true
      } else {
        this.MessageError('结束时间必须大于开始时间')
        this.ruleForm.endTime = ''
      }
    },
    changeEnd () {
      if ((this.ruleForm.beginTime < this.ruleForm.endTime)) {
        return true
      } else {
        this.MessageError('结束时间必须大于开始时间')
        this.ruleForm.endTime = ''
      }
    },
    getYear () {
      var myDate = new Date()
      this.ruleForm.enrollYear = myDate.getFullYear()
    },
    // 判断是否是编辑
    judgeEdit () {
      let item = this.$store.getters.processItem
      if (item.endTime) {
        this.title = '编辑'
        console.log(item)
        this.ruleForm.enrollName = item.processName
        this.ruleForm.enrollYear = item.year
        this.ruleForm.beginTime = Date.parse(new Date(item.creatTime))
        this.ruleForm.endTime = Date.parse(new Date(item.endTime))
        this.ruleForm.originType = item.originType
        this.ruleForm.enrollLogicId = item.enrollLogicId
      }
    }
  },
  created () {
    this.getYear()
    this.judgeEdit() 
  }  
}
</script>
<style lang="stylus" scoped>
.vue-header
  width 100%
  height 49px
  line-height 50px
  font-size 14px
  border-bottom 1px solid #2184C5
  p
    color #555
    font-weight bold
    display inline-block
    font-family MicrosoftYaHei-Bold
  .crumbs
    display inline-block
    position relative
    top 2px
    left 11px
    font-size 10px
    border-left 2px solid #a7a7a7
    padding-left 10px
</style>
