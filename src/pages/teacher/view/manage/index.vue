<template>
  <transition name="register">
    <div class="register-wrapper">
      <!-- <my-header :title="title" @back="back"></my-header> -->
    </div>
  </transition>
</template>

<script>
import myHeader from 'teacher/component/header'
export default {
  components: {
    myHeader
  },
  data () {
    return {
      title: '权限管理'
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.register-enter-active, .register-leave-active
  transition all .3s
.register-enter, .register-leave-to
  transform translate3d(100%, 0, 0)
.register-wrapper
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  overflow-y auto
  background $color-background-d
  padding-bottom 75px
  .margin
    margin-top 5px
  .btn-wrapper
    position fixed
    bottom 0
</style>
