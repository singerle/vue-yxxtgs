<template>
    <div class="sqyy">
    	<div class="sqyy-ts">提示：一经提交无法更改，请按真实情况选择</div>
    	<div class="sqyy-checks">
    		<div class="mb10" v-for="(item,i) in yy">
    			<input :id="i" type="radio" v-model="msg" name="item" :value="item.name" checked>
    			<label :for="i"></label>
    			<span style="margin-left: 10px;">{{item.name}}</span>
    		</div>
    		<div v-if="showText" class="sqyy-textarea">
	    		<textarea maxlength="100" v-model="qtyy"></textarea>
	    		<span>{{qtyy.length}}-100</span>
	    	</div>
    	</div>
    	<div class="sqyy-btn" @click="submit">
    		确认
    	</div>
    </div>
</template>

<script type="ecmascript-6">
import {sendLstdsq} from "student/api/lstd.js"
import {setHjStu} from "student/api/getHjxx.js"
export default {
  name: '',
  data () {
    return {
    	msg: '',
    	showText: false,
    	qtyy: '',
    	yy: [{name: '已申请生源地助学贷款'},
    	{name: '申请校园地助学贷款'},
    	{name: '其他原因'}]
    }
  },
  watch: {
  	msg(val, old){
  		if(val == this.yy[2].name){
  			this.showText = true
  		}else{
  			this.showText = false
  		}
  	}
  },
  computed: {
  	param(){
  		let p = (this.msg === this.yy[2].name?this.qtyy:this.msg)
  		return encodeURI(p)
  	}
  },
  methods: {
  	submit(){
  		if(!this.param){
  			this.$Toast('请选择原因')
  			return false
  		}
	  	sendLstdsq({type: 0,id: this.$store.getters.getHjid,sqyy: this.param}).then((res) => {
			if(res.code == '40001'){
				setHjStu({pauId: this.$store.getters.getHjid})
				this.$router.go(-1)
			}else{
				this.$Toast('操作失败')
			}
		})
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.sqyy
	position: fixed
	top: 0
	bottom: 0
	width: 100%
	background: #f7f7f7
	.sqyy-ts
		font-size: 14px
		background: #FFFCD1
		color: #555555
		padding: .15rem .12rem
	.sqyy-checks
		padding: .15rem .1rem
		background: white
		>div
			position: relative
			line-height: .3rem
			input[type="radio"]
				width: .2rem
				height: .2rem
				opacity: 0
			label
				position: absolute
				left: 0.05rem
				top: 50%
				transform: translateY(-50%)
				width: .16rem
				height: .16rem
				border: 1px solid #999
				border-radius: 3px
			input:checked+label
				border-color: #43adf5
			input:checked+label::after
				position: absolute
				content: ""
				width: 0.05rem
				height: 0.08rem
				top: 0.03rem
				left: 0.06rem
				border: 1px solid #43adf5
				border-top: none
				border-left: none
				transform: rotate(45deg)
		.sqyy-textarea
			position: relative
			textarea
				height: 1.73rem
				border-radius: 3px
				padding: .1rem
				width: calc(100% - .22rem)
				background: #f8fafc
			>span
				position: absolute
				bottom: 0.06rem
				right: 0.06rem
				color: #bbbbbb
	.sqyy-btn
		position: fixed
		bottom: 0
		width: 100%
		height: .44rem
		line-height: .44rem
		background: #3DA8F5
		color: white
		text-align: center
</style>