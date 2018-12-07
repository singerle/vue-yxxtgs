<template>
  <div class="addednews-wrapper">
    <div>
      <p class="header-wrap">{{title}}</p>
    </div>
    <div class="control-wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
        <el-form-item label="新闻封面" prop="cropImg">
          <el-upload
            class="avatar-uploader"
            :action="updataurl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.cropImg" :src="ruleForm.cropImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="setImageBtn">
            <div class="crop-demo-btn" @click="dialogTableVisible = true">预览</div>
            <div class="crop-demo-tip">备注：最佳分辨率200*200，支持JPG/GIF/PNG格式</div>
            <el-dialog title="预览图片" :visible.sync="dialogTableVisible" width="30%">
              <template>
                <p v-if="!ruleForm.cropImg">当前没有可预览图片</p>
                <img v-if="ruleForm.cropImg" :src="ruleForm.cropImg" alt="" style="width: 500px; height: 600px;"/>
              </template>
            </el-dialog>
          </div>
         </el-form-item>

        <el-form-item label="新闻标题" prop="title">
          <el-input class="newstitleInput" v-model="ruleForm.title" maxlength="40"></el-input>
          <span class="newstitleTip">限40个字符内，支持中英文数字</span>
        </el-form-item>
        <el-form-item prop="content" style="width: 80%;">
          <quill-editor class="quill-editor" ref="myQuillEditor"
            v-model="ruleForm.content" :options="editorOption" @change="onEditorChange($event)" @focus="onEditorFocus($event)"></quill-editor>
          <!-- <quill-editor ref="myQuillEditor" v-model="ruleForm.content" :options="editorOption"></quill-editor> -->
          <!-- <div class="limit">当前已输入 <span>{{nowLengthNum}}</span> 个字符，您还可以输入 <span>{{SurplusLengthNum}}</span> 个字符。</div> -->
          <div class="limit" style="border:0"></div>
          <!-- 文件上传input 将它隐藏-->
          <el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess'
            ref="upload" style="display:none">
            <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="backnews">返回</el-button>
          <el-button v-show='!isEdit' type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-show='isEdit' type="primary" @click="modify('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor';
import { fetchAddNews, modifylist, modifynews, updataUrl } from 'oa/api/statis/news'
import { mapGetters } from 'vuex'
import { saveMultiNews, fetchNewsInfo, editMultiNews } from 'oa/api/process/ruxue'
import { reg } from 'oa/utils/dom'
const SUCCESS_OK = '200'
  export default {
    components: {
      quillEditor,
      //  VueCropper
    },
    data() {
      let checkImg = (rule, value, callback) => {
        if(value === '') {
          return callback (new Error('新闻封面不能为空'))
        } else {
          callback();
        }
      }
      return {
        title: '走进理工-新增',
        uploadType : '',    // 上传的文件类型（图片、视频）
        uploadData : {},
        STATICDOMAIN: '',
        fullscreenLoading : false,
        updataurl: updataUrl,
        isEdit: '',
        ruleForm: {
          cropImg: '',
          title: '',
          content: '', // 富文本框内容
        },
        newsid: false,
        dialogTableVisible: false,
        nowLengthNum: '0',
        SurplusLengthNum: '2000',
        rules: {
          title: [
            { required: true, message: '新闻标题不能为空', trigger: 'blur' },
            { pattern: reg, message: '仅限中英文数字输入' },
            { max: 40, message: '限40个字符内', trigger: 'blur' }
          ],
          cropImg: [
            {required: true, validator: checkImg, trigger: 'blur'}
          ],
          content: [
            { required: true, message: '新闻内容不能为空', trigger: 'blur' },
            // { max: 2000, message: '限2000字符内', trigger: 'blur' }
          ]
        },
        defaultSrc: './static/img/nodata1.png',
        fileList: [],
        imgSrc: '',
        qnLocation: updataUrl,
        dialogVisible: false,
        editorOption: {},
        // editorOption: {
        //   placeholder: '这里是正文内容',
        //   modules: {
        //     ImageExtend: {
        //       name: 'file',
        //       size: 2,
        //       action: updataUrl,
        //       // headers: (xhr) => {},
        //       response: (res) => {
        //         console.info(res)
        //         return res.data.url
        //       }
        //     },
        //     toolbar: {
        //       container: container,
        //       handlers: {
        //         'image': function(){
        //           QuillWatch.emit(this.quill.id)
        //         }
        //       }
        //     }

        //   }
        // },
        backnewspage: '/yingxin/multiNews',
        imageList: [
          {width : 600, height: 600, url: './static/img/nodata1.png'}
          // { width: 600, height: 600, url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' }
        ]
      }
    },
    methods: {
      // 点击图片ICON触发事件
      imgHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      // 点击视频ICON触发事件
      videoHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'video'
      },
       // 编辑器获得光标
      onEditorFocus(editor) {
        console.info(editor)
        editor.enable(true)   // 实现达到上限字符可删除
        if (this.SurplusLengthNum === 2000){
          // editor.enable(false)   // 实现达到上限字符可删除
        }
      },
      // 图片上传之前调取的函数
      beforeUpload(file) {
        return this.qnUpload(file)
      },
      // 图片上传成功回调   插入到编辑器中
      upScuccess(e, file, fileList) {
        this.fullscreenLoading = false
        let vm = this
        let url = ''
        if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
          url = e.data.url
        } else if (this.uploadType === 'video') {
          // console.log(e)
          url = e.data.url
        }
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
          let value = url
          vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
          value = value.indexOf('http') !== -1 ? value : 'http:' + value
          vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
          this.MessageError(`${vm.uploadType}插入失败`)
        }
        this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
      },
      // 图片上传前获得数据token数据
      qnUpload(file) {
        this.fullscreenLoading = true
        const suffix = file.name.split('.')
        const ext = suffix.splice(suffix.length - 1, 1)[0]
        console.log(this.uploadType)
        if (this.uploadType === 'image') {  // 如果是点击插入图片
          this.uploadData = {
            key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
          }
        } else if (this.uploadType === 'video') {  // 如果是点击插入视频
          this.uploadData = {
            key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
          }
        }
      },
      // 富文本
      onEditorChange({ quill, html, text }) {
        this.ruleForm.content = html;
        let textLength = text.length - 1
        this.nowLengthNum = textLength
        let _totalNum = 2000
        let num = _totalNum - Number(textLength)
        if (num > 0) {
          this.SurplusLengthNum =  num
        } else {
          this.SurplusLengthNum = 0
        }
        if (textLength >= _totalNum) {
          // this.MessageError('最多输入2000个字符')
          // quill.enable(false)
          return
        }
      },
      // 新增 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 入学配置新增
            let loading = this.loading()
            saveMultiNews(this.eaaLogicId, this.ruleForm.cropImg, this.ruleForm.title, this.ruleForm.content).then(res => {
              loading.close()
              console.info(res)
              if(res.data.state == SUCCESS_OK){
                this.MessageSuccess(res.data.message)
                setTimeout(() => {
                  this.$router.push({path: this.backnewspage})
                }, 1500);
              } else {
                this.MessageError(res.data.message)
              }
            }).catch(_ => {
              loading.close()
              this.MessageError('链接数据库失败')
            })
            // this._fetchAddNews()
          } else {
            this.$message.error('数据没有写全，在检查一下')
            console.log('提交失败')
            return false;
          }
        });
      },
      // 新增提交数据接口
      _fetchAddNews(){
        let data = {
          cropImg: this.ruleForm.cropImg,
          title: this.ruleForm.title,
          content: this.ruleForm.content
        }
        let loading = this.loading()
        fetchAddNews(data).then(res => {
          loading.close()
          console.info(res)
          if(res.data.state === SUCCESS_OK){
            // console.log(this.ruleForm.content);
            this.MessageSuccess(res.data.message)
            setTimeout(() => {
              this.$router.push({path: this.backnewspage})
            }, 1500);
          } else {
            this.MessageError(res.data.message)
          }
        }).catch(_ => {
          loading.close()
          this.MessageError('链接数据库失败')
        })
      },
      // 修改内容回显 拉申获取数据
      _fetchNewsInfo(){
        if(this.bulletinLogicId === ''){
          // this.imageList[0].url = this.defaultSrc
          return
        } else {
          fetchNewsInfo(this.bulletinLogicId).then(res => {
            res = res.data
            if(res.state === SUCCESS_OK){
            console.info(res.data)
              this.ruleForm.cropImg = res.data.bulletinUrl
              this.ruleForm.title = res.data.bulletinTitle
              this.ruleForm.content = res.data.bulletinText
              // this.imageList[0].url = res.data.bulletinUrl  // 点击放大图片的路径
            } else {
              this.MessageError(res.message)
            }
          })
        }
      },
      // 修改提交数据按钮
      modify(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._modifynew()
          } else {
            this.$message.error('数据没有写全，在检查一下');
            console.log('提交失败');
            return false;
          }
        });
      },
      // 修改调用接口
      _modifynew(){
        let loading = this.loading()
        editMultiNews(this.bulletinLogicId,this.ruleForm.cropImg,this.ruleForm.title,this.ruleForm.content).then(res => {
          loading.close()
          console.info(res)
          if(res.data.state == SUCCESS_OK){
            this.MessageSuccess(res.data.message)
            setTimeout(() => {
              this.$router.push({path: this.backnewspage})
            }, 1500);
          } else {
            this.MessageError(res.data.message)
          }
        }).catch(_ => {
          loading.close()
          this.MessageError('链接数据库失败')
        })
      },
      // 返回新闻公式
      backnews() {
        this.$router.push({path: this.backnewspage})
      },
      // 上传图片封面
      handleAvatarSuccess(res, file) {
        console.info(res)
        this.ruleForm.cropImg = res.data.url
      },
      beforeAvatarUpload(file) {
        console.info(file)
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M;
        return isLt2M;
      },
      // 进行入口判断是入学配置还是现场配置
      judgeView () {
        this.ruxueSiteState = this.$store.getters.ruxueSiteState
        // this.appItem = this.$store.getters.appItem
        this.eaaLogicId = this.$store.getters.appItem.eaaId
        this.isEdit = this.$store.getters.newinfo.isEdit  // 判断是否新增修改
        // console.log(this.isEdit)
        this.title = this.$store.getters.newinfo.yxTitle
        this.bulletinLogicId = this.$store.getters.newinfo.bulletinLogicId
        // 根据isEdit去调用不同的接口 false => 新增， true => 修改
        if (this.isEdit === true) {
          // 调用回显
          this._fetchNewsInfo()
        } else {
          return false
        }


        if (this.ruxueSiteState === '') {
          this.MessageError('为获取到数据，将跳转到上一页面')
          this.$router.push({path: '/yingxin/ruxue/'})
        } else if (this.ruxueSiteState === 1) {
          
        } else if (this.ruxueSiteState === 3) {
          
        }
      },
      // 获取所有的列表
    },
    mounted () {
      // 为图片ICON绑定事件  getModule 为编辑器的内部属性
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)  // 为视频ICON绑定事件
      this.judgeView()
    }
  }
</script>
<style lang="stylus" scoped>
.addednews-wrapper
  width 98%
  margin 0 1%
.header-wrap
  width 100%
  height 49px
  line-height 50px
  font-size 14px
  border-bottom 1px solid #2184C5
  // display flex
  // justify-content space-between
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
.control-wrap
  margin-top 25px
  .newstitleInput
    width 50%
  .newstitleTip
    padding-left 12px
    font-size 12px
    color #999
  .quill-editor
    // width 60%
    // height 400px
    // margin 10px 0 0 -80px
    padding-bottom 58px
  .crop-demo
    display flex
    align-items flex-end
    .listImg
      overflow: hidden;
      width 100px
      height 100px
      margin 10px 0
      .pre-img
        width 100px
        height 100px
    .crop-demo-btn
      position relative
      top -40px
      width 68px
      height 24px
      line-height 24px
      padding 0 20px
      margin-left 30px
      // background-color #409eff
      color #999
      font-size 12px
      border-radius 12px
      border 1px solid #999
      box-sizing border-box
      &:hover
        background-color #409eff
        color: #fff
        border none
      .crop-input
        position absolute
        width 100px
        height 40px
        left 0
        top 0
        opacity 0
        cursor pointer
    .crop-demo-tip
      position relative
      left -70px
      color: #999999
      font-size 12px
.avatar-uploader
  width 100px
  height 100px
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
  display inline-block
  &:hover
    border-color #409EFF
.avatar-uploader-icon 
  font-size 28px
  color #8c939d
  width 100px
  height 100px
  line-height 100px
  text-align center
.avatar 
  width 100px
  height 100px
  display block
.crop-demo-btn
  width 68px
  height 24px
  line-height 24px
  padding 0 20px
  color #999
  font-size 12px
  border-radius 12px
  border 1px solid #999
  box-sizing border-box
  cursor pointer
  &:hover
    background-color #409eff
    color: #fff
    border none
.crop-demo-tip
  color: #999999
  font-size 12px
.setImageBtn
  display inline-block
  margin-left 20px
// .limit
//   position relative
//   left 35%
//   top -19px
//   display inline-block
.quill-editor {
  height: 745px;

  .ql-container {
    height: 680px;
  }
}

.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;

  span {
    color: #ee2a7b;
  }
}

.ql-snow .ql-editor img {
  max-width: 480px;
}

.ql-editor .ql-video {
  max-width: 480px;
}

</style>
