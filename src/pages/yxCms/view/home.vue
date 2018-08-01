<template>
<el-container style="height:100%">
  <el-header style="padding:0;">
    <header-oa></header-oa>
  </el-header>
  <el-container>
    <el-aside style="background:#224B95;width:140px">
      <aside-oa></aside-oa>
    </el-aside>
    <el-main style="padding:0; margin-top:5px">
      <main-oa></main-oa>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import mainOa from 'oa/view/layout/main'
import asideOa from 'oa/view/layout/aside'
import headerOa from 'oa/view/layout/header'
export default {
  components: {
    mainOa, asideOa, headerOa
  }
}
</script>
<style lang="stylus" scoped>

</style>
