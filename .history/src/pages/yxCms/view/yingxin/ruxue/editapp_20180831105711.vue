<template>
  <el-container>
    <el-header>
      <el-row class="vue-header">
        <el-col>
          <p>{{ enrollName }}</p>
          <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/yingxin/process' }">{{breadcrumb}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/yingxin/ruxue' }">{{ruxueSite}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item v-if='this.title==="新增"? true: false'>新增</el-breadcrumb-item> -->
            <el-breadcrumb-item v-if='title==="编辑"? true: false'>编辑</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="14">
          <el-form :model="form" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
            <el-form-item label="应用名称" prop="enrollName">
              <el-row>
                <el-col :span="11"><el-input type="text" v-model="form.enrollName" auto-complete="off" maxlength="12" disabled></el-input></el-col>
                <el-col :span="10" :offset="1"><span style="color:#999999">中英文数字，限12个字符内</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item v-if="form.eaaRevoke !== '2'" label="是否撤销">
              <el-radio-group v-model="form.eaaRevoke">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
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
import { delRuxueApp, fetchAppInfo,  fetchSiteAppInfo, editAPP, editSiteAPP } from 'oa/api/process/ruxue'
import { reg } from 'oa/utils/dom'
const SUCCESS_OK = '200'
export default {
  data () {
    return {
      enrollName: '',
      title: '编辑',
      breadcrumb: '2018年夏季迎新配置',
      show: false,
      ruxueSite: '',
      ruxueSiteState: '',
      eaaLogicId: '',
      form: {
        enrollName: '',
        eaaRevoke: "0",
        eaaLogicId: '',
        type: '0'
      },
      rules: {
        enrollName: [
          {required: true, message: '应用名称不能为空', trigger: 'blur'},
          { pattern: reg, message: '仅限中英文数字输入' },
          { max: 12, message: '限12个字符内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取app的ID,放到表单里
    getAppItem () {
      this.eaaLogicId = this.$store.getters.appItem.eaaId
    },
    // 点击保存按钮
    submit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // 表单验证通过以后，根据ruxueSiteState的状态判断是现场还是入学的编辑
            if (this.ruxueSiteState === 1) {
              // 入学配置
              editAPP(this.form.eaaLogicId, this.form.enrollName, this.form.eaaRevoke, this.form.type).then(res => {
                res = res.data
                if (res.state === SUCCESS_OK) {
                  this.MessageSuccess('编辑成功，将返回上一页面')
                  this.$router.push({path: '/yingxin/ruxue/'})
                } else {
                  this.MessageError(res.message)
                }
              }).catch(() => {
                this.MessageError()
              })
            } else if (this.ruxueSiteState === 3) {
              // 现场配置
              editSiteAPP(this.form.eaaLogicId, this.form.enrollName, this.form.eaaRevoke, this.form.type).then(res => {
                res = res.data
                if (res.state === SUCCESS_OK) {
                  this.MessageSuccess('编辑成功，将返回上一页面')
                  this.$router.push({path: '/yingxin/ruxue/'})
                } else {
                  this.MessageError(res.message)
                }
              }).catch(() => {
                this.MessageError()
              })
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    goBack () {
      this.$router.push({path: '/yingxin/ruxue'})
    },
    // 判断是否为有撤销栏的5类应用
    cancelShow () {
      if (this.form.eaaRevoke !== 2) {
        return false
      } else {
        return true
      }
    },
    // 判断是否有title
    hasTitle () {
      if (this.appName === '') {
        this.$alert('未获取到内容，将返回上一页面', '错误提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({path: '/yingxin'})
          }
        })
      }
    },
    // 获取对应ID
    // 首先获取是否为编辑的状态，然后获取相应的state数据
    judgeView () {
      // 获取app的Id
      this.getAppItem()
      let state = this.$store.getters.ruxueSiteState
      this.ruxueSiteState = state
      this.breadcrumb = this.$store.getters.ruxueItem.processName
      if ( state === 1) {
        // 此处为入学配置
        this.ruxueSite = '入学配置'
        // 入学配置的内容回显
        this._fetchAppInfo()
      } else if ( state === 3) {
        // 3为现场配置
         this.ruxueSite = '现场配置'
         this._fetchSiteAppInfo()
      }
    },
    // 入学配置根据上级路由传进来的id 加载相关的内容
    _fetchAppInfo () {
      fetchAppInfo(this.eaaLogicId).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.form = res.data.enrollAndApplication
          console.log(this.form)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError()
      })
    },
    // 现场配置配置根据上级路由传进来的id 加载相关的内容
    _fetchSiteAppInfo () {
      fetchSiteAppInfo(this.eaaLogicId).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.form = res.data.enrollAndApplication
          console.log(this.form)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError()
      })
    },
  },
  mounted () {
    this.judgeView()
    this.hasTitle()
  }
}
</script>
<style lang="stylus" scoped>
.vue-header
  padding-top 21px
  padding-bottom 15px
  p
    color #555
    font-size 18px
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
