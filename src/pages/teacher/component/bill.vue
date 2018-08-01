<template>
  <div>
    <table class="bill-table">
      <tr>
        <th>费用名称</th>
        <th>应交金额</th>
        <th>已交金额</th>
        <th>欠费金额</th>
      </tr>
      <tr v-for="(item, index) in billTable" :key="index">
        <td>{{ item.title }}</td>
        <td>{{ item.amountDue }}</td>
        <td>{{ item.amountPaid }}</td>
        <td>{{ item.Arrears }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    billTable: {
      type: Array
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.bill-table
  width 100%
  background-color $color-background
  box-sizing border-box
  color $color-font-nav
  text-align center
  tr
    width 100%
    height 51px
    line-height 51px
    border-bottom #F5F5F5 1px solid
    th
     font-weight bold
</style>
