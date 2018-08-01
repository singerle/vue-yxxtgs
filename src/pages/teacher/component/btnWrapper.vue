<template>
  <div class="btn-wrapper">
    <div class="btn" :style="{background: color, color: textcolor}" @click="dispose">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '确认办理'
    },
    btnstate: {
      type: Number,
      default: 0
    }
  },
  computed: {
    color() {
      // 撤销和办理
      if (this.btnstate === 0 || this.btnstate === 1) {
        return '#3DA8F5'
      } else {
        return '#CFCFCF'
      }
    },
    textcolor() {
            // 撤销和办理
      if (this.btnstate === 0 || this.btnstate === 1) {
        return '#FFFFFF'
      } else {
        return '#999999'
      }
    }
  },
  methods: {
    dispose() {
      this.$emit('dispose')
    }
  }
}
</script>


<style lang="stylus" scoped>
@import "~common/stylus/variable"
.btn-wrapper
  height 70px
  width 100%
  box-sizing border-box
  padding 10px
  background $color-background
  .btn
    height 46px
    line-height 46px
    font-size 20px
    border-radius 6px
    text-align center
</style>

