<template>
  <el-container class="statis">
    <el-aside width="130px" class="aside">
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#777777" active-text-color="#2184C5">
        <el-menu-item index="0">
          <span slot="title">统计查看权限</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
  const PATH = ['/statis/index/synthesis', '/statis/index/business', '/statis/index/comb']
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }

</script>

<style lang="stylus" scoped>
.statis
  height 100%
  .aside
    border-right 1px solid  #E8EBED
    .is-active
      background #E1EFF8
</style>
