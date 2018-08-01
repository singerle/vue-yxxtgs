<template>
  <el-container class="manage-wrapper">
    <el-header class="header">
      <span class="title header-item h-left">权限范围</span>
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>迎新配置</el-breadcrumb-item>
        <el-breadcrumb-item>教师办公设置</el-breadcrumb-item>
        <el-breadcrumb-item>{{teacher.groupName}}</el-breadcrumb-item>
        <el-breadcrumb-item>权限范围</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="manage-content">
      <el-row class="head-wrapper">
        <div class="head-bg head-l">操作范围</div>
        <div class="head-bg head-r">操作</div>
      </el-row>
      <!-- 线 -->
      <!-- <div class="line-border"></div> -->
      <el-tree :data="dataall" :expand-on-click-node="false" v-if="data.length>0">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="node-item node-item-left">{{ node.label }}</span>
          <span class="node-item node-item-right">
            <el-checkbox label="1" v-model="data.checked" @change="changeall(data)">可操作</el-checkbox>
            <el-checkbox label="2" v-model="data.checked"  @change="changeall(data)">可分配</el-checkbox>
          </span>
        </span>
      </el-tree>
      <el-tree :data="data" :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="node-item node-item-left">{{ node.label }}</span>
          <span class="node-item node-item-right">
            <el-checkbox label="1" v-model="data.checked" @change="operate(node, data)">可操作</el-checkbox>
            <el-checkbox label="2" v-model="data.checked" v-show="data.children" @change="operate(node, data)">可分配</el-checkbox>
          </span>
        </span>
      </el-tree>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :offset="10" :span="2">
          <el-button @click="goBack">返回</el-button> 
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="save">保存</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { fetchRange, savaRange } from 'oa/api/teacher/index'
const OK_CODE = '200'
const OPT = ['1', '2']
export default {
  data () {
    return {
      dataall: [{
        id: 999,
        label: '全部',
        checked: [],
      }],
      data: []
    }
  },
  computed: {
    ...mapGetters([
      'teacher', 'teacherItem'
    ])
  },
  methods: {
    goBack () {
      this.$router.push({path: '/yingxin/teacher'})
    },
    // 保存权限范围
    save() {
      let loading = this.loading()

      savaRange(this.teacherItem.enrollLogicId, this.teacher.groupId, encodeURI(JSON.stringify(this.data))).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
    },
    // 获取其中的列表值
    _fetchRange() {
      // 如果用户刷新页面，返回首页
      if (!this.teacher.groupName || this.teacher.groupName === '') {
        this.goBack()
        return
      }
      let loading = this.loading()
      fetchRange(this.teacher.groupId, this.teacherItem.enrollLogicId).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.data = res.data
          this.dataall[0].checked = this.isAllCheck(this.data)
        } else {
          this.MessageError(res.message)
        }
      }).catch(e => {
        loading.close()
        this.MessageError()
      })
    },
    // 点击可操作
    operate(node, data) {
      let parent = node.parent.data
      // 子集向父集传递
      if (Array.isArray(parent)) {
        // 选中是一级
        this.dataall[0].checked = this.setparent(parent)
      } else {
        // 选中是二级
        // console.log(parent.children)
        parent.checked = this.setparent(parent.children)
        this.dataall[0].checked = this.setparent(this.data)
      }
      // 父级向子集传递消息
      if (data.children && data.children.length > 0) {
        if (data.checked.length === 0) {
          this.setCheck(data.children, [])
          // 所有的chenked都变成空
        } else if(data.checked.length === 1){
          if (data.checked[0] === '1') {
            this.setCheck(data.children, ['1'])
            // 可操作
          } else {
            // 可分配
            this.setCheck(data.children, ['2'])
          }
        } else {
          this.setCheck(data.children, ['1', '2'])
          // 所有chenked都变成勾选
        }
      }
    },
    // 全部中可操作，可分配
    changeall(data) {
      if (data.checked.length === 0) {
        this.setCheck(this.data, [])
        // 所有的chenked都变成空
      } else if(data.checked.length === 1){
        if (data.checked[0] === '1') {
          this.setCheck(this.data, ['1'])
          // 可操作
        } else {
          // 可分配
          this.setCheck(this.data, ['2'])
        }
      } else {
        this.setCheck(this.data, ['1', '2'])
        // 所有chenked都变成勾选
      }
      console.log(this.data)
    },
    // 设置父集的勾选
    setparent(data) {
      let left = 0, right = 0,chil = 0
      for(let i = 0; i < data.length; i++) {
        // 如果子集中只要有一个是空数组就返回空
        if (data[i].checked.length === 0) {
          if (data[i].children) {
            chil ++
          }
        } else if (data[i].checked.length === 1) {
          // 如果只有一个的时候就记录是对应的可操作还是可分配
          // data[0].checked[0] === '1' ? left++ :right++
          // 如果有可分配
          if (data[i].children) { 
            chil ++ 
            data[i].checked[0] === '1' ? left++ :right++
          } else {
            // 没有分配的情况下
            data[i].checked[0] === '1' ? left++ :right++
          }
        } else if (data[i].checked.length === 2) {
          left ++
          right ++
          chil ++
        }
      }
      // 如果全部是 可操作, 分配
      if (left === data.length && right === chil) {
        return ['1', '2']
      } else if (left<data.length && right === chil){
        return ['2']
      } else if (left<data.length && right < chil){
        return []
      } else if (left === data.length && right< chil) {
        return ['1']
      }
    },
    // 操作勾选项
    setCheck(data, checked) {
      data.forEach(item => {
        // 有分配才设置分配
        if (item.children) {
          // 有子集
          item.checked = checked
        } else {
          console.log(checked)
        // 没有子集
          if (checked.length === 1) {
            if (checked[0] === '1') {
              item.checked  = ['1']
            } else{
              item.checked = []
            }
          } else if(checked.length === 2){
            item.checked = ['1']
          } else {
            item.checked = []
          }
        }
 
        if (item.children && item.children.length > 0) {
          this.setCheck(item.children, checked)
        }
      })
    },
    // 判断是否勾选
    isAllCheck(data) {
      // 只判断一级就可以了
      let left = 0, right = 0
      for(let i = 0; i < data.length; i++) {
        if (data[i].checked.length === 0) {
          return []
        } else if(data[i].checked.length === 2) {
          left++
          right++
        } else {
          data[i].checked[0] === '1' ? left++ : right ++
        }
      }
      if(left === data.length && right === data.length) {
        return ['1', '2']
      } else if (left === data.length && right < data.length) {
        return ['1']
      } else if (left < data.length && right === data.length) {
        return ['2']
      } else if (left < data.length && right < data.length) {
        return []
      }
    }
  },
  mounted () {
    this._fetchRange()
  }
}
</script>
<style lang="stylus" scoped>
@import '~oa/style/variable'
.manage-wrapper
  padding 0 11px
  box-sizing border-box
  width 100%
  height 100%
  .header
    border-bottom 1px solid $color-theme
    padding 20px 0
    .crumbs
      display inline-block
      position relative
      top 2px
      left 11px
      font-size 10px
      border-left 2px solid #a7a7a7
      padding-left 10px
    .header-item
      display inline-block
      font-size $font-size-large
    .h-left
      float left
    .h-right
      float right 
      padding 5px
      border 1px solid $color-theme
      border-radius 3px
      color $color-theme
      cursor pointer
      margin-right 5px
    .title
      color #555555
      font-weight bold
  .list-content
    padding 0
    margin-top 10px
    .item
      .click
        cursor pointer
        padding 5px
  .manage-content
    padding 0
    margin-top 10px
    .head-wrapper
      display flex
      .head-bg
        text-align center
        height 45px
        line-height 45px
        background-color #F1F3F7
        font-size 18px
        font-weight bold
        &.head-r
          width 900px
        &.head-l
          flex 1
    .custom-tree-node
      flex: 1
      display: flex
      align-items: center
      justify-content: space-between
      font-size: 14px
      padding-right: 8px
      .node-item
        display flex
        &.node-item-left
          flex 1
        &.node-item-right
          width 900px
          padding-left 80px
          box-sizing border-box
  .footer
    text-align right 
</style>