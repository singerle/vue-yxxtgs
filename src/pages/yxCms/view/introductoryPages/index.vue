<template>
  <div name="introductoryPage">
    <div class="header-wrap">
      <p>{{title}}</p>
    </div>
    <div class="content-wrap">
      <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
        <el-form-item label="引导页条件">
          <el-select v-model="sizeForm.condition">
            <el-option label="不使用" value="0"></el-option>
            <el-option label="新生首次" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加图片">
          <el-upload 
          :action="importFileUrl"
          :file-list="fileArray" list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :onSuccess="uploadSuccess"
          multiple
          :limit="6"
          :on-exceed="handleExceed">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="dialogTableVisible = true">预览</el-button>
          <el-dialog title="预览" :visible.sync="dialogTableVisible" width="30%">
          <template>
            <el-carousel trigger="click" indicator-position="outside" height="600px">
              <el-carousel-item v-for="(item, index) in fileArray" :key="index">
                <img :src="item.url" alt="" style="width: 500px; height: 600px;"/>
              </el-carousel-item>
            </el-carousel>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchintroductory, updataUrl, fetchaddIntroductory } from 'oa/api/introductoryPage/introductorypage'
const OK_CODE = '200'
export default {
    components: {
    },
    data() {
      return {
        title: '引导页配置',
        importFileUrl: updataUrl,
        imgArr: [],
        sizeForm: {
          condition: '0',
          type: [],
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        fileArray: [],
        dialogTableVisible: false,
      }
    },
    methods: {
      // 保存当前引导页配置
      onSubmit() {
        for (let i=0; i < this.fileArray.length; i++) {
          this.imgArr[i] = this.fileArray[i].url
        }
        let imgArr = this.imgArr.join(',')
        console.log('imgArr', imgArr)
        let addData = {
          condition: this.sizeForm.condition,
          fileList: imgArr
        }
        console.info(addData)
        let loading = this.loading()
        fetchaddIntroductory(addData).then(res => {
          loading.close()
          console.info(res.data)
          res = res.data
          if( res.state === OK_CODE ){
            this.MessageSuccess(res.message)
          } else {
            this.msg = res.message
          }
        }).catch(_ => {
          loading.close()
          // 捕获接口异常
          this.MessageError()
        })
        console.log('submit!');
      },
      // 获取当前引导页的图片数据
      _fetchintroductory(){
        let loading = this.loading()
        fetchintroductory().then(res => {
          loading.close()
          res = res.data
          if(res.state = OK_CODE){
            console.info(res.data)
            console.info(this.fileList)
            this.fileArray = res.data.fileList
            this.sizeForm.condition = res.data.condition
            console.info(this.fileArray)
          } else {
            this.msg = res.message
          }
        }).catch(_ => {
          loading.close()
          // 捕获接口异常
          this.MessageError()
        })
      },
      // 上传图片成功
      uploadSuccess(res, file, fileList){
        // console.log('上传文件', res.data)
        // console.log(file)
        // console.log(fileList)
        console.log(res.data)
        let objurl = res.data
        this.fileArray.push(objurl)

      },
      // 删除图片
      handleRemove(file, fileList) {
        this.fileArray.forEach((item,index)=>{
          if( item.url === file.url ){
            this.fileArray.splice(index,1)
          }
        })
      },
      // 放大查看单个图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 限制上传个数
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，当前已经选择了 ${fileList.length} 个文件`);
      }
    },
    created () {
      this._fetchintroductory()
      console.info(this.importFileUrl)
    }
}
</script>
<style lang="stylus" scoped>
div[name = 'introductoryPage']
  width 98%
  margin 0 1%
.header-wrap
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
.content-wrap
  padding 20px 0
.el-carousel__item img {
    color: #475669;
    margin: 0 auto;
    margin-left calc(50% - 250px)
    width 500px
    // height 600px
  }
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
// .el-carousel__container{
//   position: relative;
//   height: 350px !important
// }
// .el-carousel {
//   height: 400px
// }
// 中间包裹区域
.el-dialog__body {
  height: 600px
}
</style>
