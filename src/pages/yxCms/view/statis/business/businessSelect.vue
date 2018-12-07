<template>
  <div class="synSelect">
    <!-- 第一行 -->
    <el-row type="flex">
      <el-col :span="4" class="yxxt-col">
        <label>所在年度 </label>
        <el-select v-model="option.year" placeholder="请选择" class="yxxt-select" size="mini" @change="changeYear()">
          <el-option v-for="item in options.year" :key="item" :label="item" :value="item" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <label>迎新统计 </label>
        <el-select v-model="option.title" placeholder="请选择" class="yxxt-select" size="mini" @change="changSys()">
          <el-option v-for="item in options.title" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <label>迎新环节 </label>
        <el-select v-model="option.type" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.type" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="4" class="yxxt-col">
        <label>所在院校 </label>
        <el-select v-model="option.school" placeholder="请选择" class="yxxt-select" size="mini" @change="changeSchool">
          <el-option v-for="item in options.school" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <label>所在专业 </label>
        <el-select v-model="option.majon" placeholder="请选择" class="yxxt-select" size="mini" @change="changeMajon">
          <el-option v-for="item in options.majon" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <label>所在班级 </label>
        <el-select v-model="option.classes" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.class" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <label>生源类型 </label>
        <el-select v-model="option.soucre" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.soucre" :key="item" :label="item" :value="item" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="4" class="yxxt-col">
        <label>状态 </label>
        <el-select v-model="option.state" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.state" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <el-select v-model="option.search" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.search" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <el-input v-model="option.input" placeholder="请输入内容" class="" size="mini"></el-input>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <span class="search" @click="search">搜索</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const OK_CODE = '200'
  // import { busintitle } from 'oa/api/statis/bus'
  import {fetchCondition, fetchMajon, fetchClass, fetchLink, fetchYear } from 'oa/api/statis/synthesis'
  import { mapGetters, mapMutations } from 'vuex'
  import Statis from 'oa/utils/statis'
  export default {
    data() {
      return {
        options: {},
        option:{
          year: '', // 年
          title: '', // 迎新系统
          type: '', // 迎新环节
          majon: '', // 专业
          school: '', // 院系
          classes: '', // 班级
          soucre: '', // 学生来源地
          state: '' , // 状态
          search: '', // 搜索类型
          input: '', // 输入类型
        }
      }
    },
    methods: {
      // 获取业务数据查询条件
      _busintitle() {
        let loading = this.loading()
        // 获取业务查询条件
        fetchCondition().then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.options = res.data
            // 设置默认值
            this.option.year = this.options.year.length > 0 ? this.options.year[0] : ''
            this.option.title = this.options.title.length > 0 ? this.options.title[0].id : ''
            this.option.majon = this.options.majon.length > 0 ? this.options.majon[0].id : ''
            this.option.school =this.options.school.length > 0 ? this.options.school[0].id : ''
            this.option.classes = this.options.class.length > 0 ? this.options.class[0].id : ''
            this.option.soucre = this.options.soucre.length > 0 ? this.options.soucre[0] : ''
            this.option.state = this.options.state.length > 0 ? this.options.state[0].id : ''
            this.option.search = this.options.search.length > 0 ? this.options.search[0].id : ''
            this.option.type = this.options.type.length > 0 ? this.options.type[0].id : ''

            // 如果从synthesis页面过来
            if(this.statis.id && this.statis.id !== '') {
              this.option = Object.assign(this.option, new Statis(this.statis), {state: this.options.state[1].id})
              // 去获取迎新系统
              this.changeYear(true)
              this.changSys(true)
              return
            }
            // 初始化值
            this.$emit('search', this.option)
          } else {
            this.MessageError(res.message)
          }
        }).catch((error) => {
          console.log(error)
          loading.close()
          this.MessageError()
        })
      },
      // 改变院校
      changeSchool() {
        // 获取所有专业和班级
        let loading = this.loading()
        fetchMajon(this.option.school).then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.options.majon = res.data.majon // 重置专业
            this.options.class = res.data.class // 重置班级
            this.option.majon = this.options.majon.length > 0 ? this.options.majon[0].id : ''
            this.option.classes = this.options.class.length > 0 ? this.options.class[0].id :''
          }
        }).catch(_ => {
          loading.close()
          this.MessageError()
        })
      },
      // 改变专业
      changeMajon() {
        // 改变专业
        let loading = this.loading()
        fetchClass(this.option.school ,this.option.majon).then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.options.class = res.data.class // 重置班级
            this.option.classes = this.options.class.length > 0 ? this.options.class[0].id :''
          }
        }).catch(_ => {
          loading.close()
          this.MessageError()
        })
      },
      // 选择迎新统计获取迎新环节
      changSys(bole) {
        console.log(bole)
        let loading = this.loading()
        fetchLink(this.option.title).then(res => {
          res = res.data
          loading.close()
          if (res.state === OK_CODE) {
            this.options.type = res.data.process
            if (!bole) {
              this.option.type = this.options.type.length > 0 ? this.options.type[0].id : ''
            }
            if (bole) {
              this.search()
            }
          }
        }).catch((e) => {
          loading.close()
          this.MessageError()
        })
      },
      //获取迎新系统 
      changeYear(bole) {
        let loading = this.loading()
        fetchYear(this.option.year).then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.options.title = res.data.title
            if (!bole) {
              this.option.title = this.options.title.length > 0 ? this.options.title[0].id : ''
            }
          } else {
            this.MessageError(res.message)
          }
        }).catch(() => {
          loading.close()
          this.MessageError()
        })
      },
      // 点击搜索
      search() {
        this.$emit('search', this.option)
      },
      ...mapMutations({
        '_setIndex' : 'SET_INDEX'
      })
    },
    computed: {
      ...mapGetters([
        'statis','update', 'index'
      ])
    },
    activated () {
      this._setIndex('1')
      console.log(this.index)
      // 从查看页面返回到上级不刷新页面
      if (this.update) {
        this._busintitle()
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '~oa/style/variable'
  .synSelect
    .yxxt-col
      display flex
      margin-left 10px
      margin-top 5px
      label
        width 70px
        line-height 30px
      .yxxt-select
        flex 1
      // &>>>input 
      //   height $input-heigt
      //   line-height $input-heigt
      .search
        display inline-block
        height 28px
        padding 0 15px
        box-sizing border-box
        line-height 28px
        border 1px solid $color-theme
        border-radius 3px
        color $color-theme
        cursor pointer
</style>

