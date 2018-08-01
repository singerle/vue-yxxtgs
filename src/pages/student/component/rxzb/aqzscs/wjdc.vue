<!-- 入学准备-安全知识测试 -->
<!-- 通过display显示隐藏实现默认，对，错显示图标 -->
<template>
  <div v-if="info[num] && info[num].title" class="wrap" :style="errorShow?'background:#fff':'background:#f7f7f7'" >
  	<div class="contents" v-if="!completeShow">
  		<h3 class="title">{{num+1+'.'+info[num].title}}</h3>
  		<ul>
  			<li v-for="(item,index) in info[num].options" v-if="item.text=='null'||item.text==null?false:true" @click="flag && compare(item,index)">
  				<div class="option-ico">
  					<div class="noselect"></div>
  					<img class="right errorpic"  v-show="item.yes" src="static/student-index-pictures/yes.png">
  				</div>
  				<span class="value">{{item.text}}</span>
  			</li>
  		</ul>
  	</div>
  	<div class="bottom" v-show="pageShow" v-if="!completeShow">
  		<p class="showPage">
    		<span class="currentPage">{{num+1}}</span>/<span class="totalPage">{{info.length}}</span>
    	</p>
  	</div>
  	<div class="completePage" v-show="completeShow">
		<img src="static/student-index-pictures/rxzb-aqzscs-complete.png">
		<p>恭喜您&nbsp;完成&nbsp;问卷调研&nbsp;&nbsp;</p>
		</p>
	  	<div class="return" @click = "$router.go(-1)">
	  		<span>返回首页</span>
	  	</div>
	</div>
  </div>
</template>

<script>
import {completeProcess} from "student/api/completeSendData.js"
import {getWjdcData,sendWjdcData} from 'student/api/aqzscs.js'
//import {sendAqzscsData} from 'student/api/aqzscs.js'
var obj = {} //空对象用来装答错的页码
var optionsArr = ['A','B','C','D','E','F','G'] //对应给出的正确答案选项
export default {
  name: 'aqzscs',
  data(){
  	return {
  		//通过数组索引控制页面内容切换
  		num:0,
  		//控制底部页码的显示
  		pageShow:true,
  		//控制错误显示的全部内容,以及背景的切换
  		errorShow:'',
  		//控制错误下的底部灰色倒计时
  		bottomShow:'',
  		//控制3秒倒计时结束后的重做按钮显示
  		replayShow:'',
  		//绑定与解绑点击事件
  		flag:true,
  		//3秒倒计时显示
  		second:3,
  		//完成所有题后显示的完成页面
  		completeShow:false,
  		//错题数
  		countFalse:0,
  		//后台真实数据
  		info:'',
  		//判定是否做过
  		jg:'',
  		//保存要传到后台的数据
  		saveSelect:''
  	}
  },
  methods:{
  	compare(item,index){
  		var pageObj = this.info[this.num] //该页面内的整个数据对象
  		//var key = pageObj.options[optionsArr.indexOf(pageObj.key.toUpperCase())] //key为正确选项的那个对象
  			item.yes = 1	//正确答案图标显示
  			this.flag = false
  			this.saveSelect += `{"id":"${this.num+1}","result":"${item.value}"},`
  			if(this.info[this.num+1] == undefined){
  				//选择正确的条件下，判断是否是最后一题了，如果是最后一题了，直接跳转到完成页面
  				//并且调用接口，保存对错题数，防止下次刷新重做
  				let updateData = '[' + this.saveSelect.substring(0,this.saveSelect.length-1) +']'
  				console.log(updateData);
  				sendWjdcData({param:updateData}).then((res) => {
  					if(res.code==='40001'){
  						console.log(res.message)
  						completeProcess({pauId: this.$store.getters.getHjid})
  						this.completeShow = true
  					}else{
  						console.log('上传错误 error')
  					}
  				})
  			}else{
	  			setTimeout(()=>{//刷新数据延迟半秒跳到下一题
	  				this.num++
	  				this.flag = true
	  			},500)
  			}
  	},
  	getData(){
  		getWjdcData().then((res) => {
  			if(res.code==='40001'){
  				console.log(res);
  				this.info = res.content.tk
  				console.log(this.info[0].options);
  				if(res.content.jg===false){//每次刷新就会判定是否已完成
  					this.completeShow = false
  				}else{//后台已被我传入已做完数据，再次点击进来显示最后已做完的页面
  					this.completeShow = true
  				}
  			}else{
  				console.log('data error')
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
		background:#f7f7f7
		width:100%
		top:0
		bottom:0
		border-top:.01rem solid #e9e9e9
		overflow:auto
		.contents
			padding:0 .12rem .16rem
			background:#f7f7f7
			.title
				font-size:.17rem
				line-height:.3rem
				color:#333333
				font-family:PingFang-SC-Bold
				padding:.13rem 0 .1rem
			ul
				li
					height:.48rem
					font-size:.17rem
					display:flex
					.option-ico
						position:relative
						margin:0 .15rem 0 .2rem	
						width:.18rem
						height:.18rem
						.noselect
							position:absolute
							display:block
							width:.16rem
							height:.16rem
							border-radius:50%
							border:.01rem solid #ccc9c9	
						.error
							position:absolute
						.right
							position:absolute
						.errorpic
							width:.18rem
							height:.18rem
		.bottom
			position:fixed
			bottom:0
			background:#fff
			width:100%
			.showPage
				width:100%
				height:.2rem
				font-size:.1rem
				font-family:PingFang-SC-Medium
				color:#333333
				line-height:.2rem
				display:flex
				justify-content:center
		.error
			.wrap-key
				width:calc(100% - .24rem)
				margin-left:.12rem
				color:#333333
				font-size:.17rem
				font-family:PingFang SC
				padding-bottom:1rem
				.key
					height:.56rem
					line-height:.56rem
					border-bottom:.01rem solid #ececec
				.jieshi
					line-height:.31rem
					padding-top:.13rem
					display:flex
					flex-wrap:wrap
					.text
						width:calc(100% - .6rem)
			.bottom
				position:fixed
				bottom:.1rem
				width:calc(100% - .24rem)
				margin-left:.11rem
				height:.46rem
				display:flex
				justify-content:center
				align-items:center
				border-radius:.06rem
				border: .01rem solid #cfcfcf
				.tip
					color:#999999
					font-size:0.17rem
					font-family:PingFang-SC-Medium
			.replay
				position:fixed
				bottom:.1rem
				width:calc(100% - .24rem)
				margin-left:.11rem
				height:.46rem
				display:flex
				justify-content:center
				align-items:center
				border-radius:.06rem
				box-shadow:.01rem .01rem .02rem rgba(85, 178, 245, 0.5)
				background:#3DA8F5
				.tip
					font-size:0.17rem
					font-family:PingFang-SC-Medium
					color:#fff
		.completePage
			position:fixed
			background:#f7f7f7
			width:100%
			top:0
			bottom:0
			border-top:.01rem solid #e9e9e9
			text-align:center
			font-size:.17rem
			z-index:999999
			img
				display:block
				margin:.84rem auto .45rem
				width:1rem
				height:1rem
			p
				color:#333333
				line-height:.17rem	
			p:nth-of-type(1)
				font-family:PingFang-SC-Medium
			p:nth-of-type(2)
				font-family:PingFang SC
				margin:.15rem 0 .45rem
				.green
					color:#00B90C
				.red
					color:#FE4124
			.return
				width:calc(100% - 2 * .57rem)
				background:#3DA8F5
				height:.46rem
				border-radius:.23rem
				margin:0 auto
				span
					color:#fff
					line-height:.45rem
</style>