<template>
  <div class="synSelect">
    <!-- 第一行 -->
    <el-row type="flex">
      <el-col :span="3" class="yxxt-col" v-if="options.year" >
        <label>所在年度 </label>
        <el-select v-model="option.year" placeholder="请选择" class="yxxt-select" size="mini"  @change="changeYear">
          <el-option v-for="item in options.year" :key="item" :label="item" :value="item" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="yxxt-col" v-if="options.title">
        <label>迎新系统 </label>
        <el-select v-model="option.title" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.title" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="3" class="yxxt-col" v-if="options.school">
        <label>所在院校 </label>
        <el-select v-model="option.school" placeholder="请选择" class="yxxt-select" size="mini" @change="changeSchool">
          <el-option v-for="item in options.school" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="yxxt-col" v-if="options.majon">
        <label>所在专业 </label>
        <el-select v-model="option.majon" placeholder="请选择" class="yxxt-select" size="mini" @change="changeMajon">
          <el-option v-for="item in options.majon" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="yxxt-col" v-if="options.class">
        <label>所在班级 </label>
        <el-select v-model="option.classes" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.class" :key="item.id" :label="item.name" :value="item.id" class="yxxt-option">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="yxxt-col"  v-if="options.soucre">
        <label>生源类型 </label>
        <el-select v-model="option.soucre" placeholder="请选择" class="yxxt-select" size="mini">
          <el-option v-for="item in options.soucre" :key="item" :label="item" :value="item" class="yxxt-option">
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
  import { fetchCondition, fetchMajon, fetchClass, fetchYear} from 'oa/api/statis/synthesis'
  import { mapMutations } from 'vuex'
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
          soucre: ''
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
            this.option.year = this.options.year.length > 0 ? this.options.year[0] : ''
            this.option.title = this.options.title.length > 0 ? this.options.title[0].id : ''
            this.option.majon = this.options.majon.length > 0 ? this.options.majon[0].id : ''
            this.option.school =this.options.school.length > 0 ? this.options.school[0].id : ''
            this.option.classes = this.options.class.length > 0 ? this.options.class[0].id :''
            this.option.soucre = this.options.soucre.length > 0 ? this.options.soucre[0] : ''
            this.search()
          }
        }).catch(_ => {
          loading.close()
          this.MessageError()
        })
      },
      // 选中值过后
      search() {
        this.$emit('change', this.option)
      },
      //获取迎新系统 
      changeYear() {
        let loading = this.loading()
        fetchYear(this.option.year).then(res => {
          loading.close()
          res = res.data
          if (res.state === OK_CODE) {
            this.options.title = res.data.title
            this.option.title = this.options.title.length > 0 ? this.options.title[0].id : ''
          } else {
            this.MessageError(res.message)
          }
        }).catch(() => {
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
            this.options.classes = res.data.class // 重置班级
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
            this.options.classes = res.data.class // 重置班级
            this.option.classes = this.options.length > 0 ? this.options.class[0].id : ''
          }
        }).catch(_ => {
          loading.close()
          this.MessageError()
        })
      },
      ...mapMutations({
        '_setIndex': 'SET_INDEX'
      })
    },
  created () {
    this._setIndex('0')
    this._fetchCondition()
  },
  activated () {
    this._setIndex('0')
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

