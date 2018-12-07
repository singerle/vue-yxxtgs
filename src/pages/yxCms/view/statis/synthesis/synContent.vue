<template>

  <el-table :data="rows" border style="width: 100%" v-show="rows.length>0">
    <el-table-column align="center" v-for="col in cols" :prop="col.prop" :key="col.prop" :label="col.label">
      <template slot-scope="scope">
        <p class="item" @click="selItem(scope.row[col.prop])">
          <span>{{scope.row[col.prop].value}}</span>
        </p>
      </template>
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
    },
    methods: {
      selItem(item) {
        this.$emit('selItem', item)
      }
    }
  }

</script>

<style lang="stylus" scoped>
@import '~oa/style/variable'
.item
  color $color-theme
  span
    border-bottom 1px solid $color-theme
    cursor pointer
</style>
