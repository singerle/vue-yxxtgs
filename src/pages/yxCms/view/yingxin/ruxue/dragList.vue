<template>
  <el-container class="draglist">
    <el-main>
    <!-- 拖拽层级 -->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
              <draggable v-model="application" @remove="removeHandle" :options="dragOptions1" @change="updata">
                <transition-group tag="div" id="application" class="item-ul">
                  <div v-for="(item,index) in application" class="drag-list" :key="index">
                    <el-button class="dragbutton" type="primary" v-if="item.content">{{item.content}}</el-button>
                    <div class="nodata" v-if="item.nodatalist">{{item.nodatalist}}</div>
                  </div>
                </transition-group>
              </draggable>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light" v-for="(item,index) in hierarchy" :key="index">
            <div v-if="controlState" class="item-title layerNum"><span>{{item.hierarchyNumber}}</span><span class="deletelayer" @click="deletelayer(item, index)">删除层级</span></div>
            <draggable v-model="item.hierarchyContent" @remove="removeHandle" :options="dragOptions2"  @start="disabled=false">
              <transition-group tag="div" class="item-ul hierarchy">
                <div v-for="(itemContent,index) in item.hierarchyContent" class="drag-list" :key="index">
                    <el-button class="dragbutton" type="primary">{{itemContent.content}}</el-button>
                    <span v-if="controlState" @click="hierarchydelete(itemContent, index, item.hierarchyContent)"><i class="el-icon-close hierarchydelete"></i></span>
                    <el-checkbox :disabled="checkboxState" class="unlock" v-model="itemContent.unlockChecked">解锁任务</el-checkbox>
                </div>
              </transition-group>
            </draggable>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <div class="addlayer" @click="judgeAddlayer"><i class="el-icon-circle-plus"></i>添加层级</div>
          </div>
        </el-col>
      </el-row>
      <el-footer>
      <el-row>
        <el-col :span="2" :offset="10">
          <el-button @click="goBack">返回</el-button>
        </el-col>
        <el-col :span="2">
          <el-button v-if="controlState" type="primary" @click="keepLayerdata">保存</el-button>
        </el-col>
      </el-row>
    </el-footer>
    </el-main>
  </el-container>
</template>
<script>
import draggable from 'vuedraggable'
import { SectionToChinese } from 'oa/utils/SectionToChines'
// import { fetchdragList, fetchAddDraglist } from 'oa/api/process/draglist'
import { processConfig, processCommit } from 'oa/api/process/ruxue'
const SUCCESS_OK = '200'
export default {
    components: {
        draggable
    },
  data () {
    return {
      enrollLogicId: '',
      controlState: true,
      checkboxState: false,
      ruxueSiteState: '',
      dragOptions1:{
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style',
        forceFallback: true, // 忽略HTML5 DND行为并强制撤退
        disabled: false // 设置是否拖拽 false为拖拽 true为不拖拽
      },
      dragOptions2:{
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style',
        forceFallback: true, // 忽略HTML5 DND行为并强制撤退
        disabled: false // 设置是否拖拽 false为拖拽 true为不拖拽
      },
      application: [ {nodatalist: "无可用应用 您可以前去应用管理添加"} ], // 应用列表应用存放处
      hierarchy: [],  // 层级列表数据存放处
    }
  },
  methods: {
    // 返回按钮
    goBack () {
      this.$router.push({path: '/yingxin/process'})
    },
    // 获取流程配置内容数据列表, 其中type为1时为入学配置，2时为现场配置
    _processConfig(type){
      let loading = this.loading()
      processConfig(this.enrollLogicId, type).then(res => {
        loading.close()
        res = res.data
        if(res.state === SUCCESS_OK){
          console.info(res)
          if ( res.data.application.length === 0 && res.data.hierarchy.length === 0 ) {
            this.hierarchy = res.data.hierarchy
          } else {
            this.application = res.data.application
            this.hierarchy = res.data.hierarchy
          }
          // console.info('this.application'+this.application)
          // console.info( res.data.application.length === 0 && res.data.hierarchy.length === 0 )

        } else {
          this.MessageError(res.message)
        }
      }).catch(()=> {
        loading.close()
        this.MessageError('链接数据库失败')
      })
    },
    // 保存提交层级内容数据
    keepLayerdata(){
      let loading = this.loading()
      // 使用ruxueSiteState进行判断，是入学配置的提交数据还是现场配置的提交数据
      if (this.ruxueSiteState === 1) {
        // 入学配置的提交数据
        for (let i = 0; i++; i< this.hierarchy.length) {
          this.hierarchy[i].enrollId = this.enrollLogicId
          // type为"1",代表入学配置 2代表现场配置
          this.hierarchy[i].type = "1"
        }
        console.info(this.hierarchy)
        // let addlist = {
        //   enrollId: this.enrollLogicId,
        //   type: "1",
        //   // application: encodeURI(JSON.stringify(this.application)),
        //   hierarchy: encodeURI(JSON.stringify(this.hierarchy))
        // }
        processCommit(this.enrollLogicId, "1", encodeURI(JSON.stringify(this.hierarchy))).then(res => {
          loading.close()
          res = res.data
          // console.info(res)
          if(res.state === SUCCESS_OK) {
            this.MessageSuccess('提交流程配置成功')
            this._processConfig(1)
          } else {
            this.MessageError(res.message)
          }
        }).catch(e => {
          console.log(e)
          loading.close()
          this.MessageError('链接数据库失败')
        })
      } else if (this.ruxueSiteState === 3) {
        // 现场配置的提交数据
        // type为"1",代表入学配置 2代表现场配置
        for (let i = 0; i++; i< this.hierarchy.length) {
          this.hierarchy[i].enrollId = this.enrollLogicId
          this.hierarchy[i].type = "2"
        }
        // let addlist = {
        //   enrollId: this.enrollLogicId,
        //   type: "2",
        //   // application: encodeURI(JSON.stringify(this.application)),
        //   hierarchy: encodeURI(JSON.stringify(this.hierarchy))
        // }
        processCommit(this.enrollLogicId, "2", encodeURI(JSON.stringify(this.hierarchy))).then(res => {
          loading.close()
          res = res.data
          // console.info(res)
          if(res.state === SUCCESS_OK){
            console.info(res)
            console.info(res.message)
            this.MessageSuccess('提交流程配置成功')
            this._processConfig(2)
          } else {
            this.MessageError(res.message)
          }
        }).catch(() => {
          loading.close()
          this.MessageError('链接数据库失败')
        })
      }
      console.info('提交')
    },
    removeHandle(event){
      console.log(event);
      // this.$message.success(`从 ${event.from.id} 移动到 ${event.to.className} `);
      console.info(event.to)
    },
    updata(index){
      // 可用应用区添加应用统一设置解锁任务为false
      if(index.added){
        index.added.element.unlockChecked = false
      }
    },
    // 删除当前层级内容
    deletelayer(layerdata,index){
      layerdata.hierarchyContent.forEach(item => {
        // console.info(item.unlockChecked)
        item.unlockChecked = false
        this.application.push(item)
      })
      this.hierarchy.splice(index,1)
      // 删除设置层级数
      this.hierarchy.forEach((hierarchyItem, index) => {
        let LayerNum = SectionToChinese(index + 1)
        hierarchyItem.hierarchyNumber = '第'+ LayerNum +'层'
      })
      // console.info(this.hierarchy)
    },
    // 删除单个应用数据
    hierarchydelete(itemContent, index, hierarchyContent){
      itemContent.unlockChecked = false
      this.application.push(itemContent)
      hierarchyContent.splice(index,1)
    },
    // 添加层级
    addlayer(){
      // console.info(this.hierarchy.length)
      // 需要添加的层级数
      const newLayer = this.hierarchy.length + 1
      let newLayerNum = SectionToChinese(newLayer)
      let layerobj = {
        hierarchyNumber: '第'+ newLayerNum +'层',
        hierarchyContent: []
      }
      this.hierarchy.push(layerobj)
    },
    // 根据是现场配置，入学配置和查看判断是否进行添加层级的操作
    judgeAddlayer () {
      if (this.ruxueSiteState === 1) {
        this.addlayer()
      } else if (this.ruxueSiteState === 2) {
        return false
        this.MessageError('当前页面只能进行查看')
      } else if (this.ruxueSiteState === 3) {
        this.addlayer()
      } else if (this.ruxueSiteState === 4) {
        return false
        this.MessageError('当前页面只能进行查看')
      } else {
        return false
      }
    },
    // 首先获取是否为编辑的状态，然后获取相应的state数据
    judgeView () {
      let state = this.$store.getters.ruxueSiteState
      this.ruxueSiteState = state
      // 获取保存流程的全部内容
      this.ruxueItem = this.$store.getters.ruxueItem
      // 获取保存流程的Id
      this.enrollLogicId = this.ruxueItem.enrollLogicId
      // this.breadcrumb = this.$store.getters.ruxueItem.processName
      if ( state === '') {
        this.MessageError ('未获取到数据，为您跳回到上一页面')
        this.$router.push({path: '/yingxin/process'})
      } else if ( state === 1) {
        // 此处为入学配置
        this.viewState = true
        this._processConfig(1)
      } else if ( state === 2) {
        // 2为查看入学配置,查看只能看不能进行拖拽和编辑
        this.dragOptions1.disabled = true
        this.dragOptions2.disabled = true
        this.controlState = false
        this.checkboxState = true
        this._processConfig(1)
      } else if ( state === 3) {
        // 3为现场配置
        this.viewState = true
        this._processConfig(2)
      } else if ( state === 4) {
        // 4为查看现场配置，只能查看，不能拖拽和编辑
        this.dragOptions1.disabled = true
        this.dragOptions2.disabled = true
        this.controlState = false
        this.checkboxState = true
        this._processConfig(2)
      }
    }
  },
  created () {
    // 
    this.judgeView()
  }
}
</script>
<style lang="stylus" scoped>
.draglist
  padding 0 20px
.el-row 
  margin-bottom 20px
  &:last-child
    margin-bottom 0
.el-col
  border-radius 4px
.bg-purple-dark
  background #F8F8F8
.bg-purple
  background #d3dce6
.bg-purple-light
  background #fff
.grid-content
  border-radius 4px
  min-height 74px
.row-bg 
  padding 10px 0
  background-color #f9fafc
.item-ul
  // padding-top 20px
  margin 0 20px
  min-height 96px
  position relative
.drag-list
  display inline-block
  margin 15px 0 10px 10px
.nodata
  color #999
  font-size 12px
  position absolute
  top calc(50% - 6px)
  left calc(50% - 97px)
.item-title
  border-left 2px solid #2184c5
  padding-left 8px
.unlock
  display block
  padding-top 12px
.hierarchydelete
  position: relative;
  top -13px
  left -18px
  background #ffffff8c
  width 14px
  height 13px
  color #fff
.layerNum
  display flex
  justify-content space-between
  .deletelayer
    font-size 12px
    color #999999
    cursor pointer
    &:hover
      text-decoration underline
      color #2184c5
.addlayer
  border 1px dotted #ececec
  border-radius 6px
  height 30px
  color #999999
  font-size 12px
  text-align center
  line-height 30px
  cursor pointer
  i
    width 14px
    height 14px
    color #ececec

</style>
