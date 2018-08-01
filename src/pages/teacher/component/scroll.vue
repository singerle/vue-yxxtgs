<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    listenScroll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    initScroll() {
      // 如果不存在元素跳出
      if (!this.$refs.scroll) {
        return
      }
      // 实例化滚动
      this.scroll = new BScroll(this.$refs.scroll, {
        click: true, // 是否点击
        // 下拉刷新
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        probeType: 3
      })
      // 监听事件
      if (this.listenScroll) {
        this.scroll.on('pullingDown', pos => {
          console.log('下拉刷新')
        })
        this.scroll.on('pullingUp', () => {
          console.log('上来加载')
        })
      }
    },
    update() {
      this.$nextTick(() => {
        this.initScroll()
      })
    }
  },
  created () {
    this.update()
  }
}
</script>

