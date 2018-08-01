<template>
  	<div class="content">
  		<div class="top">
  			<div class="code-2"></div>
	  		<div class="xzewm" @click="download">
				<!-- <router-link to="/index"> -->
					<span>下载二维码</span>
				<!-- </router-link> -->
	  		</div>
	  		<div class="prement">
	  			<h3>缴费方式：</h3>
	  			<p v-if="info.length>0">报到时前往{{info[info.length-1].jffs}}进行线下缴费</p>
	  		</div>
  		</div>
  	</div>
</template>

<script>
//import {getGrsfmData} from "student/api/grsfm.js"
//import {getJfdtData} from '@/pages/student/api/jfdt.js'
import jsAndroid from '@/common/js/jsAndroid.js'
export default {
  name: 'xcbdPopup',
  data () {
  	return {
  		//isshow:false,
  		info:[
  			{fymc:"学费",yjje:4000,yjfy:"0",qfje:4000,hjje:0,jffs:"现场"},
  			{fymc:"书费",yjje:500,yjfy:"0",qfje:500,hjje:0,jffs:"现场"},
  			{fymc:"伙食费",yjje:1000,yjfy:"0",qfje:1000,hjje:0,jffs:"现场"},
  			{fymc:"补课费",yjje:1000,yjfy:"0",qfje:1000,hjje:0,jffs:"现场"},
  			{fymc:"聚餐费",yjje:250,yjfy:"0",qfje:250,hjje:0,jffs:"现场"},
  			{fymc:"住宿费",yjje:1250,yjfy:"0",qfje:1250,hjje:0,jffs:"现场"}
  			]
  	}
  },
  methods:{
    download(){
      jsAndroid.saveImage.save(JSON.stringify({path: ''}))
      // console.log(jsAndroid.saveImage.save)
    }
  },
  // methods:{
  // 	getData(){
  // 		getJfdtData().then((res) => {
  // 			if(res.code==='40001'){
  				
  // 				console.log(res.message)
  // 				this.info = res.content
  // 			}else{
  // 				console.log('data error')
  // 			}
  // 		})
  // 	}
  // },
  // created(){
  // 	this.getData()
  // }

  // methods:{
  // 	cancle(){
  // 		this.$emit("event",this.isshow)
  // 	},
  // 	getData(){
  // 		getGrsfmData().then((res)=>{
  // 			if(res.code == "40001"){
  // 				console.log(res.message)
  // 				this.info = res.content
  // 			}else{
  // 				console.log("getData error")
  // 			}
  // 		})
  // 	},
  // },
  // created(){
  // 	this.getData()
  // }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.content
		position:fixed
		top: 0
		bottom:0
		width:100%
		.top
			width:100%
			margin-bottom: 1px
			height: calc(100% - .46rem)
			background:rgba(255,255,255,1)
			overflow:hidden
			.code-2
				width:1.6rem
				height:1.6rem
				background:url(/yxxt/static/student-index-pictures/erwei-code.png)
				margin:.8rem auto 0.4rem
			.xzewm
				width:calc(100% - 2 * .57rem)
				background:#3DA8F5
				height:.46rem
				border-radius:.23rem
				margin:.2rem auto
				text-align:center
				font-size:.17rem
				span
					color:#fff
					line-height:.45rem
			.prement
				padding:.3rem .12rem
				h3
					color:#333
					font-family:PingFang-SC-Bold
					font-weight:bold
					font-size:.16rem
					margin:0 0 .07rem
				p
					font-family:PingFang-SC-Medium
					font-size:.13rem
					line-height:.24rem
</style>