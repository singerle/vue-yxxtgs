<template>
  <el-table :data="rows" border style="width: 100%" v-show="rows.length>0">
    <el-table-column align="center" v-for="col in cols" :prop="col.prop" :key="col.prop" :label="col.label">
    </el-table-column>
  </el-table>
</template>

<script>
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
