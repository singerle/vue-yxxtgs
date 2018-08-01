<template>
    <div class="csLogin">
    	<input type="text" class="mt10" v-model="cszh">
    	<div class="csLogin-btn" @click="login">确定</div>
    </div>
</template>

<script type="ecmascript-6">
import {getDataApi} from 'student/api/getDataApi'
export default {
  name: '',
  data () {
    return {
    	cszh: ''
    }
  },
  methods: {
  	login(){
  		if(!this.cszh){
  			this.$Toast('请输入测试账号')
  			return false
  		}
      getDataApi('background/simulationLogin',{userid: this.cszh,identity: 0}).then((res) => {
        if(res.state == 200){
          this.$store.commit('SetUserInfo', val)
          this.$emit('refresh')
        }
      })
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/base'
.csLogin
	position: fixed
	top: 0
	bottom: 0
	width: 100%
	text-align: center
	input
		height: .28rem
		width: 80%
		border: 1px solid #ececec
		border-radius: 3px
	.csLogin-btn
		position: fixed
		bottom: 0
		width: 100%
		background: $color-theme
		color: white
		height: .44rem
		line-height: .44rem
</style>