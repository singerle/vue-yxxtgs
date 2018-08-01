<!-- 电子版通知书展示 -->
<template>
	<div class="bgcolor">
		<div class="centerShow">
			<div class="centerShow-img">
				<img src="static/student-index-pictures/offer.png">
			</div>
			<!-- url(/yxxt/static/student-index-pictures/offer.png) no-repeat center top  -->
			<div class="name">{{info.xm}}</div>
			<div class="xy">{{info.xy}}</div>
			<div class="zy">{{info.zy}}</div>
			<!-- <div class="cc">{{info.cc}}</div> -->
			<!-- <div class="lb">{{info.lb=="null"||info.lb==null?'':info.lb}}</div> -->
		</div>
	</div>
</template>

<script>
import {getDztzsData} from "student/api/dztzs.js"
export default {
  name: 'dztzs',
  data(){
  	return {
  		info:'',
  		time: ''
  	}
  },
  methods:{
  	getData(){
  		getDztzsData().then((res)=>{
  			if(res.code == "40001"){
  				console.log(res.message)
  				this.info = res.content
  			}else{
  				console.log("getData error")
  			}
  		})
  	}
  },
  activated(){
  	this.getData()
  	if(Number(this.time) == Number(this.$route.query.time)){
  		return false
  	}
  	if(!this.time || Number(this.time) != Number(this.$route.query.time)){
  		this.time = this.$route.query.time
  	}
  	this.timer = setTimeout(() => {
  		this.$router.push('/dztz')
  	},3000)
  },
  deactivated(){
  	this.timer && clearTimeout(this.timer)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@media screen and (min-width:412px)
		.bgcolor 
			font-size: 16px
	@media screen and (min-width:375px) and (max-width:411px)
		.bgcolor 
			font-size: 14px
	@media screen and (min-width:320px) and (max-width:374px)
		.bgcolor 
			font-size: 14px
	@media screen and (max-width:320px)
		.bgcolor
			font-size: 12px
	.bgcolor
		position:fixed
		top:0
		bottom:0
		left: 50%
		width:100%
		max-width: 414px
		background:#f7f7f7
		transform: translateX(-50%)
		.centerShow
			background: #ffebbe
			width: 100%
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%) translateZ(0);
			height: 100%
			background-size: contain
			.centerShow-img
				width: 100%
				img
					width: 100%
			div
				font-weight:700
				position:absolute
			.name
				top: 11.5em
				left: 2.5em
			.xy
				top: 17em
				left: 6em
			.zy	
				top: 20.6em
				left: 6em
			.cc
				top:60%
				left:30%
			.lb
				top:68%
				left:37%
</style>