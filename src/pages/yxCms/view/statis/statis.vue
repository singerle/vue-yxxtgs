<template>
  <el-container class="statis">
    <el-aside width="130px" class="aside">
      <el-menu :default-active="index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#777777" active-text-color="#2184C5" @select="selectItem">
        <el-menu-item index="0" v-if="rolesStatis[0]">
          <span slot="title">综合统计</span>
        </el-menu-item>
        <el-menu-item index="1" v-if="rolesStatis[1]">
          <span slot="title">业务数据查询</span>
        </el-menu-item>
        <el-menu-item index="2" v-if="rolesStatis[2]">
          <span slot="title">组合查询</span>
        </el-menu-item>
        <el-menu-item index="3" v-if="rolesStatis[3]">
          <span slot="title">报到交通统计</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>
  const PATH = ['/statis/index/synthesis', '/statis/index/business', '/statis/index/comb', '/statis/index/traffic']
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isCollapse: true,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      selectItem(key, keyPath) {
        this.$store.commit('SET_UPDATE', true)
        this.$router.push({
          path: PATH[key]
        })
      }
    },
    computed: {
      ...mapGetters([
        'index', 'rolesStatis'
      ])
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
