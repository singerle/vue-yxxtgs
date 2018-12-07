<template>
  <div>
    <div>
      <p class="header-wrap">{{headerTitle.yxTitle}}</p>
      <el-row :gutter="20" style="padding-top: 10px;">
        <el-col :span="12">
          <div>
            <el-form class="newsnameform" :model="headerTitle" ref="headerTitle" label-width="100px" :rules="rules">
              <el-form-item 
                label="应用名称"
                prop="appItem.enrollName">
                <el-input class="newstitleInput" v-model="headerTitle.appItem.enrollName" :placeholder="headerTitle.appItem.enrollName" style="width: 30%;" maxlength="12"></el-input>
                <el-button type="primary" @click="changeName('headerTitle')">修改应用名称</el-button>
                <span class="newstitleTip">中英文数字，限12个字符内</span>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="3" :offset="5">
          <el-form>
            <el-form-item>
              <!-- <el-checkbox v-model="headerTitle.checked" @change="isShow">教师端可见</el-checkbox> -->
               <el-tooltip  content="请新增列表新闻后方可以勾选" placement="top" :disabled="!headerTitle.disabled">
                <el-checkbox v-model="headerTitle.checked" @change="isShow" :disabled="headerTitle.disabled">教师端可见</el-checkbox>
              </el-tooltip>
            </el-form-item>
          </el-form>

        </el-col>
        <el-col :span="2" :offset="2">
          <div>
            <el-row style="text-align: right;">
              <el-button type="primary" plain class="button" @click="toPage">{{headerTitle.button}}</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { fetchAppInfo, editAPP, editSiteAPP, changeShow } from 'oa/api/process/ruxue'
import { reg } from 'oa/utils/dom'
export default {
  data () {
    return {
      ruxueSiteState: '',
      rules: {
        'appItem.enrollName': [
          { required: true,  message: '应用名称不能为空', trigger: 'blur'},
          { pattern: reg, message: '仅限中英文数字输入', trigger: 'blur' },
          { max: 12, message: '限12个字符内', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    page:{
      type: String,
      default: function () {
        return {
          newpage: 'addedNews'
        }
      }
    },
    headerTitle: {
      type: Object,
      default: function () {
        return {
          title: '新闻公示',
          button: '新增',
          yxTitle: '新闻列表',
          eaaLogicId: '',
          // yinxin:'迎新'
        }
      }
    },
  },
  methods: {
    toPage() {
      this.headerTitle.isEdit = false
      this.headerTitle.bulletinLogicId = ''
      this.$store.commit('set_new_info', this.headerTitle)
      
      this.$router.push({
        path: '/yingxin/addMultiNews'
      })
    },
    // 输入框变化出发后台事件
    changeName (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruxueSiteState = this.$store.getters.ruxueSiteState
          if (this.ruxueSiteState === 1) {
            // 入学配置 调用入学接口 只传前四个参数
            editAPP (this.eaaLogicId, this.headerTitle.appItem.enrollName, '2', '2').then(res => {
              res = res.data
              if (res.state === '200') {
                this.MessageSuccess('修改名称成功')
                this.headerTitle.yxTitle = this.headerTitle.appItem.enrollName
              } else {
                this.MessageError(res.message)
              }
            }).catch(() => {
              this.MessageError()
            })
          } else if (this.ruxueSiteState === 3) {
            // 现场配置 调用现场接口 只穿前四个参数
            // 入学配置 调用入学接口 只传前四个参数
            editSiteAPP (this.eaaLogicId, this.headerTitle.appItem.enrollName, '2', '2').then(res => {
              res = res.data
              if (res.state === '200') {
                this.MessageSuccess('修改名称成功')
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
    // 教师端可见
    isShow () {
      var show
      if (this.headerTitle.checked === false) {
        show = 0
      } else {
        show = 1
      }
      changeShow (this.eaaLogicId, show).then(res =>{
        res = res.data
        if (res.state === '200') {
          this.MessageSuccess('修改成功')
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError()
      })
    },
    // 进行入口判断是入学配置还是现场配置
    judgeView () {
      this.ruxueSiteState = this.$store.getters.ruxueSiteState
      this.appItem = this.$store.getters.appItem
      this.eaaLogicId = this.$store.getters.appItem.eaaId
      if (this.ruxueSiteState === '') {
        this.MessageError('为获取到数据，将跳转到上一页面')
        this.$router.push({path: '/yingxin/ruxue/'})
      } else if (this.ruxueSiteState === 1) {
        
      } else if (this.ruxueSiteState === 3) {
        
      }
    }
  },
  mounted() {
    this.judgeView()
  },
}
</script>
<style lang="stylus" scoped>
.header-wrap
  width 100%
  height 49px
  line-height 50px
  font-size 14px
  border-bottom 1px solid #2184C5
  display flex
  justify-content space-between
  p
    color #555
    font-weight bold
    font-family MicrosoftYaHei-Bold
  .button
    height 26px
    width 82px
    line-height 2px
    color #2184C5
    background-color transparent
    font-family FZLTZCHK--GBK1-0
    font-weight Regular
    &:hover
      color: #fff
      background-color #2184C5
.newstitleTip
  padding-left 12px
  font-size 12px
  color #999
</style>
