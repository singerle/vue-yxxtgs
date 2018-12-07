<template>
  <div class="synthesis-wrapper">
    <header class="header">
      <span class="title header-item h-left">综合统计</span>
      <span class="btn-excel header-item h-right">导出excel</span>
    </header>
    <traffic-sel @search="search"></traffic-sel>
    <traffic-con class="syn-content" :rows="rows" :cols="cols"></traffic-con>
  </div>
</template>

<script>
import trafficSel from './traffic/trafficSel'
import trafficCon from './traffic/trafficCon'
import { fetchComb } from 'oa/api/statis/comb'
import { mapMutations } from 'vuex'
const OK_CODE = '200'
export default {
  components: {
    trafficSel, trafficCon
  },
  data () {
    return {
      rows: [],
      cols: []
    }
  },
  methods: {
    search(options) {
      this.options = options
      this._fetchComb()
    },
    _fetchComb() {
      let loading = this.loading() // 加载中的
      fetchComb(this.options).then(res => {
        loading.close()
        res = res.data
        if (res.state === OK_CODE) {
          this.rows = res.data.rows
          this.cols = res.data.cols
        } else {
          this.MessageError(res.message)
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
    this._setIndex('3')
  }
}
</script>


<style lang="stylus" scoped>
@import '~oa/style/variable'
.synthesis-wrapper
  padding 0 11px
  box-sizing border-box
  width 100%
  height 100%
  .header
    border-bottom 1px solid $color-theme
    padding-bottom 5px
    height 25px
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
    .title
      color #555555
      font-weight bold
  .syn-content
    margin-top 10px
</style>
