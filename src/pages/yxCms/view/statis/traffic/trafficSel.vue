<template>
  <div class="synSelect">
    <!-- 第一行 -->

    <el-row type="flex">
      <el-col :span="3" class="yxxt-col" v-if="options.title">
        <label>迎新系统 </label>
        <el-select v-model="option.title" placeholder="请选择" class="yxxt-select" clearable size="mini">
          <el-option v-for="item in options.title" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="yxxt-col" v-if="options.majon">
        <label>报到时间 </label>
        <el-date-picker
          v-model="option.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini">
        </el-date-picker>
      </el-col>
      <el-col :span="3" class="yxxt-col" v-if="options.class">
        <label>交通方式 </label>
        <el-select v-model="option.classes" placeholder="请选择" class="yxxt-select" clearable size="mini">
          <el-option v-for="item in options.class" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="yxxt-col"  v-if="options.soucre">
        <label>到达站 </label>
        <el-select v-model="option.source" placeholder="请选择" class="yxxt-select" clearable size="mini">
          <el-option v-for="item in options.soucre" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="yxxt-col">
        <span class="search" @click="search">搜索</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { fetchCondition } from 'oa/api/statis/synthesis'
  const OK_CODE = '200'
  export default {
    data() {
      return {
        options: {},
        option:{
          year: '', // 年
          title: '', // 迎新系统
          majon: '', // 专业
          school: '', // 院系
          classes: '', // 班级
          soucre: '', // 学生来源地
          time: '', // 时间
        }
      }
    },
    methods: {
      // 获取综合统计头部查询条件
      _fetchCondition() {
        let loading = this.loading() // 打开加载的中...
        fetchCondition().then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.options = res.data
            this.option.year = this.options.year[0]
            this.search()
          }
        }).catch(_ => {
          loading.close()
          this.MessageError('链接数据库失败.........')
        })
      },
      // 选中值过后
      search() {
        this.$emit('search', this.option)
      }
    },
  created () {
    this._fetchCondition()
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
        width 60px
        line-height 30px
      .yxxt-select
        flex 1
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

