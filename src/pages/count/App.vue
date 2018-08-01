<template>
  <div id="app">
	<transition :name="name">
      <keep-alive>
        <router-view class="router-view" v-wechat-title="$route.meta.title"></router-view>
      </keep-alive>
	</transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
  	return {
		name: 'register',
		map: {}
  	}
  },
  watch: {
  	'$route'(to, from){
	  	if (!this.map[to.path]) {
	        this.map[to.path] = +new Date() + 1
	    }
	    if (!this.map[from.path]) {
	        this.map[from.path] = +new Date()
	    }
	    if (this.map[to.path] > this.map[from.path]) {
	        this.name = 'slide-forward'
	    } else {
	        this.name = 'slide-back'
	    } 
  	}
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.router-view 
  position: absolute
  width: 100%
  top: 0
  left: 0
.slide-forward-enter 
  transform: translate(100%)
.slide-forward-enter-active 
  transition: all .3s ease-in-out
.slide-forward-leave-active 
  transform: translate(-100%)
  transition: all  .3s ease-in-out
.slide-back-enter
  transform: translate(-100%)
.slide-back-enter-active
  transition: all .3s ease-in-out
.slide-back-leave-active 
  transform: translate(100%)
  transition: all  .3s ease-in-out
</style>
