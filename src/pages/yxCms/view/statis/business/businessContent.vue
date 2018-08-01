<template>
  <el-table :data="rows" border style="width: 100%" v-show="rows.length>0">
    <el-table-column align="center" v-for="col in cols" :prop="col.prop" :key="col.prop" :label="col.label">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <p class="operate">
          <span class="btn" @click="look(scope.row)">查看</span>
          <span class="btn">表单预览</span>
        </p>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      rows: {
        type: Array,
        default: function() {
          return []
        }
      },
      cols: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    methods: {
      look (item) {
        this._setInfo(item)
        this.$router.push({
          path: '/statis/index/businfo'
        })
      },
      ...mapMutations({
        '_setInfo': 'SET_INFO'
      })
    }
  }

</script>

<style lang="stylus" scoped>
@import '~oa/style/variable'
  .btn
    color $color-theme
    border-bottom 1px solid $color-theme
    cursor pointer
</style>
