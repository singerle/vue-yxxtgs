<template>
	<div class="wrap">
	  	<div class="content">
	  		<div class="top">
	  			<h3>条形码</h3>
	  			<div class="code-1" :style="info.txm=='null'||info.txm==null? {background:''}: {background:'url('+info.txm+') no-repeat center center'}"></div>
	  			<h3>二维码</h3>
	  			<div class="code-2" :style="info.ewm=='null'||info.ewm==null? {background:''}: {background:'url('+info.ewm+') no-repeat center center'}"></div>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
import {getGrsfmData} from "student/api/grsfm.js"
export default {
  name: 'mycode',
  data(){
  	return {
  		info:'',
  		id:''
  	}
  },
  methods:{
  	getData(){
  		getGrsfmData().then((res)=>{
  			if(res.code == "40001"){
  				console.log(res.message)
  				this.info = res.content
  			}else{
  				console.log("getData error")
  			}
  		})
  	}
  },
  created(){
  	this.getData()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.wrap
		position:fixed
		width:100%
		top:0
		bottom:0
		background:#3DA8F5
		overflow:auto
		.content
			margin:.4rem auto 0
			width: calc(100% - .3rem)
			padding-bottom:1rem
			.top
				width:100%
				background:rgba(255,255,255,1)
				overflow:hidden
				border-radius:0.04rem
				h3,div	
					margin:0 auto
					text-align:center
				h3
					font-size:0.17rem
					font-family:PingFang-SC-Bold
					color:rgba(51,51,51,1)
					line-height:0.17rem	
					margin-top:0.4rem
					margin-bottom:0.2rem
				.code-1
					width:2.13rem
					height:1.1rem
					margin-bottom:0.1rem
				.code-2
					width:1.6rem
					height:1.6rem
					margin-bottom:0.4rem
</style>