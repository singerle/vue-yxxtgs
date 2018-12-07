<template>
  <el-container>
    <el-header style="margin-top:35px">
      <el-row>
        <el-col :span="6">
          <el-select v-model="appSel" placeholder="请选择" @change="change">
            <el-option v-for="item in allAppSel" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="13">
          <el-button @click="addapp" v-if="viewState">新增应用</el-button>
        </el-col>
      </el-row>    
    </el-header>
    <el-main style="padding: 20px">
      <el-table :data="tableData" :stripe="true" style="width: 100%">
        <el-table-column align="center" prop="applicationName" label="应用名" width="600">
        </el-table-column>
        <el-table-column align="center" prop="taskType" label="应用类型" width="600">
        </el-table-column>
        <el-table-column v-if="viewState" align="center" label="操作栏">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-col :span="4" :offset="10">
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-col>
      <!-- <el-col :span="6" :offset="4">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="size"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col> -->
    </el-footer>
  </el-container>
</template>
<script>
import { fetchAllApp, delRuxueApp, delSceneApp, fetchSiteApp } from 'oa/api/process/ruxue'
const SUCCESS_OK = '200'
export default {
  data () {
    return {
      ruxueSiteState: '',
      viewState: true,
      ruxueItem: {},
      appSel: 0,
      allAppSel: [{id: 0, name:'全部类型'}, 
                  {id: 1, name: '通过型'}, 
                  {id: 2, name: '选择型'},
                  {id: 3, name: '阅读型'},
                  {id: 4, name: '现场型'}],
      tableData: [],
      // page: 1,
      // size: 10,
      // total: 20
    }
  },
  methods: {
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    // },
    // 下拉框改变类型选值后
    change () {
      console.log(111)
      // 进行判断，如果ruxueSiteState是1和2，则启用入学配置加载列表，否则加载现场配置的列表
      if (this.ruxueSiteState === 1) {
        // 这是入学配置和查看入学配置的
        this._fetchAllApp()
      } else if (this.ruxueSiteState === 2) {
        // 这是入学配置和查看入学配置的
        this._fetchAllApp()
      } else if (this.ruxueSiteState === 3) {
        this._fetchSiteApp()
        // 预留现场配置
      } else if (this.ruxueSiteState === 4) {
        // 预留查看现场配置
        this._fetchSiteApp()
      }
    },
    // 点击新增应用
    addapp () {
      this.$router.push({path: '/yingxin/addapp'})
    },
    // 获取入学配置所有的应用列表
    _fetchAllApp () {
      fetchAllApp(this.ruxueItem.enrollLogicId, this.appSel).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.tableData = res.data
        } else {
          this.$MessageError(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 获取现场配置所有的应用列表
    _fetchSiteApp () {
      fetchSiteApp(this.ruxueItem.enrollLogicId, this.appSel).then(res => {
        res = res.data
        if (res.state === SUCCESS_OK) {
          this.tableData = res.data
        } else {
          this.$MessageError(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 删除入学配置 应用列表中的应用
    _delRuxueApp (eaaLogicId) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
           // 删除
          delRuxueApp(eaaLogicId).then(res => {
            res = res.data
            if (res.state === SUCCESS_OK) {
              this.MessageSuccess('删除操作成功')
              this._fetchAllApp()
            } else {
              this.MessageError(res.message)
            }
          }).catch(() => {
            this.MessageError()
          })
        }  
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    },
    // 删除现场配置 应用列表中的应用
    _delSceneApp (saaLogicId) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
           // 删除
          delSceneApp(saaLogicId).then(res => {
            res = res.data
            console.info(res)
            if (res.state === SUCCESS_OK) {
              this.MessageSuccess('删除操作成功')
              // this._fetchAllApp()
              this._fetchSiteApp()
            } else {
              this.MessageError(res.message)
            }
          }).catch(() => {
            this.MessageError()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      })
    },
    del (item) {
      if (this.ruxueSiteState === 1) {
        // 入学配置的删除
        this._delRuxueApp(item.eaaId)
      } else if (this.ruxueSiteState ===3) {
        // 现场配置的删除
        this._delSceneApp(item.eaaId)
      }
    },
    // 返回迎新配置页面
    goBack () {
      this.$router.push({path: '/yingxin/process'})
    },
    // 点击编辑，跳转编辑页面
    edit (item) {
      // 首先判断是现场配置还是入学配置
      // 入学配置配置
      if ( this.ruxueSiteState === 1) {
        // 判断type的类型，然后进行跳转页面
        if (item.type === 0) {
          this.$store.commit('appItem', item)
          this.$router.push({path: '/yingxin/editapp'})
        } else if (item.type === 1) {
          this.$store.commit('appItem', item)
          this.$router.push({path: '/yingxin/singleNews'})
        } else if (item.type === 2) {
          this.$store.commit('appItem', item)
          this.$router.push({path: '/yingxin/multiNews'})
        }
        // 这里是现场配置
      } else if (this.ruxueSiteState === 3) {
        if (item.type === 0) {
          this.$store.commit('appItem', item)
          this.$router.push({path: '/yingxin/editapp'})
        } else if (item.type === 1) {
          this.$store.commit('appItem', item)
          this.$router.push({path: '/yingxin/singleNews'})
          // 保存状态为单页应用
        } else if (item.type === 2) {
          this.$store.commit('appItem', item)
          this.$router.push({path: '/yingxin/multiNews'})
          // 保存状态为列表新闻

        }
      }
      
    },
    // 首先获取是否为编辑的状态，然后获取相应的state数据
    judgeView () {
      let state = this.$store.getters.ruxueSiteState
      this.ruxueSiteState = state
      if ( state === '') {
        this.MessageError ('未获取到数据，为您跳回到上一页面')
        this.$router.push({path: '/yingxin'})
      } else if ( state === 1) {
        // 此处为入学配置
        this.viewState = true
        // 如果是查看页面，隐藏所有按钮
        this.getruxueItem()
        this._fetchAllApp()
      } else if ( state === 2) {
        // 2为查看入学配置
        this.getruxueItem()
        this._fetchAllApp()
        this.viewState = false
      } else if ( state === 3) {
        // 3为现场配置
        this.viewState = true
        this.getruxueItem()
        this._fetchSiteApp()
      } else if ( state === 4) {
        // 4为查看现场配置
        this.viewState = false
        this.getruxueItem()
        this._fetchSiteApp()
      }
    },
    // 获取vuex存取的整条数据,包括id
    getruxueItem () {
      this.ruxueItem = this.$store.getters.ruxueItem
      console.log(this.ruxueItem)
    }
  },
  mounted () {
    // this.getruxueItem()
    // this._fetchAllApp()
    this.judgeView()
  }
}
</script>