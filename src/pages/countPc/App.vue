<template>
  <div id="app">
    <container></container>
  </div>
</template>

<script>
import container from './view/container'
export default {
  name: 'app',
  components: {
    container
  }
}
</script>

<style lang="stylus" scoped>
html, body
  width 100%
  height 100%
  #app
    width 100%
    height 100%
    display flex
</style>

