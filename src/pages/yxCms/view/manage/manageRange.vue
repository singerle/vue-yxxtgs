<template>
  <el-container class="manage-wrapper">
    <el-header class="header" height="35px">
      <span class="title header-item h-left">权限范围</span>
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/manage/index/list">查看统计权限</el-breadcrumb-item>
        <el-breadcrumb-item to="/manage/index/list">{{manage.groupName}}</el-breadcrumb-item>
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
      <el-tree :data="dataall" :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="node-item node-item-left">{{ node.label }}</span>
          <span class="node-item node-item-right">
            <el-checkbox-group v-model="data.checked" @change="change(data)">
              <el-checkbox label="可查询"></el-checkbox>
              <!-- <el-checkbox label="可分配"></el-checkbox> -->
            </el-checkbox-group>
          </span>
        </span>
      </el-tree>
      <el-tree :data="data" :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="node-item node-item-left">{{ node.label }}</span>
          <span class="node-item node-item-right">
            <el-checkbox-group v-model="data.checked" @change="changechil(node,data)">
              <el-checkbox label="可查询"></el-checkbox>
              <!-- <el-checkbox v-show="data.children" label="可分配"></el-checkbox> -->
            </el-checkbox-group>
          </span>
        </span>
      </el-tree>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :offset="10" :span="2">
          <el-button type="primary" @click="save">保存</el-button> 
        </el-col>
        <el-col :span="2">
          <el-button @click="goBack">返回</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { manageRange, saveRange } from 'oa/api/manage/index'
import { RangeData } from 'oa/utils/manage'
const OK_CODE = '200'
export default {
  data () {
    return {
      dataall: [{
        id: 999,
        label: '全部',
        checked: false,
      }],
      data: []
    }
  },
  computed: {
    ...mapGetters([
      'manage'
    ])
  },
  methods: {
    // 点击返回按钮
    goBack () {
      this.$router.push({path: '/manage/index/list'})
    },
    // 子集中可操作
    changechil(node, data) {
      let parent = node.parent.data // 存放节点
      let checked = data.checked
      // 只要子集中有个不勾选则父级不勾选
      if (!checked) {
        this.dataall[0].checked = false // 设置全部不勾选
        // 如果不是最顶层的父级了
        // 只有两级的情况下， 能给使用，如果超过有多级会存在bug
        if (!Array.isArray(parent)) {
          parent.checked = false
        }
      } else {
        // 如果子集是勾选的
        // 如果是一级
        if (Array.isArray(parent)) {
          this.dataall[0].checked = this.isCheck(this.data)
          console.log(this.isCheck(this.data))
        } else {
          // 如果不是是一级
          parent.checked = this.isCheck(parent.children)
          this.dataall[0].checked = this.isCheck(this.data)
        }

      }
      // 设置子集中可选中，不可选中
      if (data.children && data.children.length > 0) {
        this.setCheck(data.children, checked)
      }
    },
    // 操作勾选项
    setCheck(data, checked) {
      data.forEach(item => {
        item.checked = checked
        if (item.children && item.children.length > 0) {
          this.setCheck(item.children, checked)
        }
      })
    },
    // 勾选全部
    change(data) {
      let checked = data.checked
      this.setCheck(this.data, checked)
    },
    // 获取树形的数据
    _manageRange() {
      // 处理边界,如果页面刷新,则从新返回列表
      if (!this.manage.roleId || this.manage.roleId === '') {
        this.$router.push({
          path: '/manage/index/list'
        })
        return
      }
      let loading = this.loading()
      manageRange(this.manage.roleId).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.data = res.data
          this.dataall[0].checked = !this.isAllCheck(this.data)
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        this.MessageError(res.message)
        loading.close()
      })
    },
    // 点击保存按钮
    save() {
      let loading = this.loading()
      saveRange(this.manage.roleId, RangeData(this.data)).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.MessageSuccess(res.message)
          this._manageRange()
        } else {
          this.MessageError(res.message)
        }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
    },
    // 判断同级或者下级是否全部勾选
    isCheck(data) {
      for(let i = 0; i < data.length; i++) {
        if(data[i].checked === false) {
          return false
        }
      }
      return true
    },
    // 判断下级是否都全选
    isAllCheck(data) {
      for(let i = 0; i < data.length; i++) {
        if(data[i].checked === false) {
          return true
        }
        if(data[i].children && data[i].children.length > 0) {
          this.isAllCheck(data[i].children)
        }
      }
    }
  },
  mounted () {
    this._manageRange()
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
    padding-bottom 5px
    height 25px
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