<template>
  <div class="navbar">
    <img src="static/logo.png">
    <span class="systemName">迎新管理系统</span>
    <span class="schoolName">重庆工商大学</span>
    <el-dropdown class="el-dropdown">
      <span class="el-dropdown-link">
        <img class="avatar"
             :src="isavatar" />
        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isavatar: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  mounted () {
    if (this.avatar.substring(this.avatar.length - 4) == 'null') {
      this.isavatar = 'static/person.png'
    } else {
      this.isavatar = this.avatar
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('FedLogout').then(() => {
        console.log('退出登录')
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.navbar {
  box-sizing: border-box;
  height: 100%;
  text-align: right;
  background: #224B95;
  width: 100%;
  box-shadow: 5px 5px 5px #224b95;

  .schoolName {
    &:after {
      content: '';
      width: 1px;
      height: 20px;
      top: 19px;
      right: 14px;
      background: #DBE3F1;
      position: absolute;
    }

    color: #FFFFFF;
    position: relative;
    padding: 20px 30px;
    font-size: 15px;
  }

  .systemName {
    &:before {
      content: '';
      width: 1px;
      height: 20px;
      top: 16px;
      left: 10px;
      background: #DBE3F1;
      position: absolute;
    }

    color: #FFFFFF;
    font-weight: bold;
    float: left;
    position: relative;
    padding: 20px 30px;
  }

  >img {
    // &:after
    // content ""
    // width 50px
    // height 200px
    // background #DBE3F1
    // position absolute
    float: left;
    margin: 8px;
    // position relative
  }

  .el-dropdown {
    height: 60px;
    line-height: 60px;
    color: #ffffff;

    .el-dropdown-link {
      cursor: pointer;

      .avatar {
        width: 30px;
        height: 30px;
        display: inline-block;
        vertical-align: top;
        margin-top: 15px;
        border-radius: 50%;
      }
    }
  }
}
</style>
