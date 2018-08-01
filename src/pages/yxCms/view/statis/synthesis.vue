<template>
  <div class="synthesis-wrapper">
    <header class="header">
      <span class="title header-item h-left">综合统计</span>
      <span class="btn-excel header-item h-right" @click="downExcel">导出excel</span>
    </header>
    <syn-select @change="change"></syn-select>
    <syn-content class="syn-content" :rows="rows" @selItem="selItem" id="rebateSetTable" :cols="cols"></syn-content>
  </div>
</template>

<script>
import synSelect from './synthesis/synSelect'
import synContent from './synthesis/synContent'
import { fetchSynthesis, down } from 'oa/api/statis/synthesis'
import { mapMutations, mapGetters } from 'vuex'
const OK_CODE = '200'
export default {
  components: {
    synSelect, synContent
  },
  data () {
    return {
      rows: [],
      cols: [],
      options: {}
    }
  },
  methods: {
    change(options) {
      this.options = options // 选中的条件
      this._fetchSynthesis(options)
    },
    // 获取列表数据
    _fetchSynthesis(options) {
      let loading = this.loading()
      fetchSynthesis(options).then(res => {
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
      })
    },
    // 跳转到业务数据查询
    selItem(item) {
      let obj = Object.assign(item, this.options)
      // 把综合统计数据存到vuex中
      this._setOptions(obj)
      this._setIndex('1')
      // 跳转到业务数据查询页面,只有有权限的时候才可以跳转到business页面
      if (this.rolesStatis[1] && item.id !== '0') {
        this.$store.commit('SET_UPDATE', true)
        this.$router.push({
          path: '/statis/index/business'
        })
      }
    },
    // 下载文件用axios
    downExcel() {
      let loading = this.loading()
      down(this.options, '1').then(res => {
        loading.close()
        let fileName = '综合统计.xls'
        let blob = new Blob([res.data], { type: 'application/x-xls' })
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
      }).catch(() => {
        loading.close()
        this.MessageError()
      })
    },
    ...mapMutations({
      '_setOptions': 'SET_STATIS_OPTIONS',
      '_setIndex': 'SET_INDEX'
    })
  },
  computed: {
    ...mapGetters([
      'rolesStatis'
    ])
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
