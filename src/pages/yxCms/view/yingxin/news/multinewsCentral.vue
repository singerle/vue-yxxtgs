<template>
    <div class="newsCentral-wrapper">
      <el-table class="newstable" :data="tableData"  style="width: 100%">
        <el-table-column label="新闻封面">
          <template slot-scope="scope">
            <img :src="scope.row.bulletinUrl" alt="picture">
          </template>
        </el-table-column>
        <el-table-column prop="bulletinTitle" label="新闻标题"> </el-table-column>
        <el-table-column prop="sort" label="排序值" :render-header="renderProductId"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bulletinCount" label="阅读量" :render-header="rendernum"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="modifynews(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="sortNum(scope.row)" type="text" size="small">排序</el-button>
            <el-button @click="deletenew(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import { deletenews, sortNumber } from 'oa/api/statis/news'
import { mapMutations } from 'vuex'
const OK_CODE = '200'
  export default {
    props: {
      tableData: {
        type: Array,
        default: function () {
          return {
            eaaId: '',
            sort: '',
            bulletinLogicId: ''
          }
        }
      }
    },
    data() {
      return {
        modifypage: '/newsPublicity/addedNews'
      }
    },
    methods: {
      // 排序值解释弹框
      renderProductId(h, {column}) {
        return h('span', [
            h('span', column.label),
            h('i',
                {
                  class: 'el-icon-question',
                  style: 'margin-left: 5px; cursor: pointer;',
                  on: {
                      click: this.headerClick
                  }
            }),
        ])
      },
      headerClick () {
        const h = this.$createElement;
        this.$msgbox({
          title: '排序规则',
          message: h('p', null, [
            h('p', null, '1 排序值只能为正整数1-99 '),
            h('p', null, '2 数值越大 越优先显示'),
            h('p', null, '3 排序值不能重复设置')
          ]),
          // showCancelButton: true,
          confirmButtonText: '确定',
          center: true
        })
      },
      // 阅读量解释弹框
      rendernum(h, {column}) {
        return h('span', [
            h('span', column.label),
            h('i',
                {
                  class: 'el-icon-question',
                  style: 'margin-left: 5px; cursor: pointer;',
                  on: {
                      click: this.renderclick
                  }
            }),
        ])
      },
      renderclick () {
        const h = this.$createElement;
        this.$msgbox({
          title: '阅读量',
          message: h('p', null, [
            h('p', null, '1 阅读量目前统计PV值'),
            h('p', null, '2 同一个用户进入一次即统计1次')
          ]),
          confirmButtonText: '确定',
          center: true
        })
      },
      // 编辑按钮
      modifynews(row) {
        this.$emit('changeEdit', row)
      },
      ...mapMutations({
        '_setId': 'SET_NEWS_ID' 
      }),
      // 删除按钮
      deletenew(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loading = this.loading()
          console.info(row)
          deletenews(row.bulletinLogicId).then(res => {
            loading.close()
            res = res.data
            if(res.state = OK_CODE){
              console.info(res)
              this.MessageSuccess(res.message)
              this.$emit('update')
            } else {
              this.msg = res.message
            }
          })
        }).catch(() => {
          loading.close()
          // 捕获接口异常
          this.MessageError()
        });
      },
      // 排序按钮
      sortNum(row){
        console.info(row)
        this.eaaId = row.eaaId,
        this.sort = row.sort,
        this.bulletinLogicId = row.bulletinLogicId
        this.$prompt('排序值', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[1-9][0-9]?$/,
          inputErrorMessage: '排序值为1 ~ 99'
        }).then(({ value}) => {
          console.info(value)
          let sortvale = {
            eaaId: this.eaaId,
            sort: value,
            bulletinLogicId: this.bulletinLogicId
          }
          sortNumber(sortvale).then(res => {
            if(res.data.state = OK_CODE){
              this.MessageSuccess(res.data.message)
              this.$emit('update')
            } else {
              this.msg = res.message
            }
          }).catch(e => {
            console.log(e)
            // 捕获接口异常
            this.MessageError()    
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    },
    filters: {
      formatDate(val) {
        let date = new Date(val)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0'+m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        let minute = date.getMinutes()
        minute = minute < 10 ? ('0' + minute) : minute
        return `${y}-${m}-${d}  ${h}:${minute}`
      }
    }
  }
</script>
<style lang="stylus" scoped>
.newstable
  border 1px solid #F1F3F7
  border-radius 6px
  background-color #F1F3F7
.el-table .table-head-th
  background #F1F3F7 !important
img 
  width 58px
  height 58px
</style>
