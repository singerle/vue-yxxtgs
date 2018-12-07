<template>
	<div>
    <div class="bgcolor" v-if="showYdy==2||showYdy==0">
    	<!-- 弹出窗口的组件 -->
    	<popup v-show="jiesuo">
    		<div slot="top">
    			<p>完成“安全知识测试”、“完善信息”后解锁</p>
    		</div>
    		<p slot="bottom" @click="jiesuo=false">我知道了</p>
    	</popup>
<!--     	<popup v-show="wancheng">
    		<div slot="top">
    			<h3>恭喜您完成入学准备</h3>
    			<p>到校后可进行报到流程</p>
    		</div>
    		<p slot="bottom" @click="wancheng=false,flag=1">我知道了</p>
    	</popup> -->
      <popup1 class="tc" v-show="wancheng" @event="wancheng=false">
        <div>
          <img src="static/student-index-pictures/gs.png" :style="{'width':'100%'}">
          <!-- <h3><img src="static/student-index-pictures/gs.png" class="tcpic"></h3> -->
        </div>
        <div class="mt15 mb10">恭喜您完成入学准备任务</div>
        <p slot="bottom" @click="wancheng=false,flag=1">我知道了</p>
      </popup1>
    	<!-- 弹出窗口的组件 -->

    	<!-- 未完成入学准备点击到报道流程后，点击了app要显示的解锁提示遮罩 -->
    	<div class="weijiesuo" v-show="weijiesuo"><div class="text">请先完成入学准备后解锁</div></div>
    	<!-- 未完成入学准备点击到报道流程后，点击了app要显示的解锁提示遮罩 -->

    	<!-- 以下是用户无操作页面部分 -->
    	<div class="header">
    		<div class="pic">
    			<div class="picbg">
    				<img :onerror="logo" :src="info.tx==null||info.tx=='null'?'static/student-index-pictures/pic.png':info.tx">
    			</div>
    		</div>
    		<div class="student-info">
    			<h3 class="student-name">
    				<span class="xingming">{{info.xm}}</span>
    				<span class="ico-1" :style="info.xb === '男'?'background-image:url(static/student-index-pictures/man.png)':'background-image:url(static/student-index-pictures/woman.png)'"></span>
    				<span class="ico-2" @click="toShowCode"></span>
    				<span class="ico-3" @click="toDztzs"></span>
    			</h3>
    			<p class="yuan" @click="topMyInfo">
    				<span class="yuan-name">{{info.xy}}</span>
    				<span class="ico-4"></span>
    			</p>
    			<p class="xi">
    				<span>{{info.zy}}&nbsp;&nbsp;<span v-if='info.xi'>({{info.zy}})</span></span>
    			</p>
    		</div>
    	</div>
    	<div class="contain">
    		<div class="price" @click='toPageJfdt'>
    			<h3>缴费信息</h3>
    			<p class="need-price" :style="info.jfzt?'color:#3DA8F5':''">{{info.jfzt?'0.00':info.zfy}}</p>
    			<p class="jfqk" style="padding-top:0.06rem">查看明细</p>
    		</div>
    		<div class="room" @click="toSzqs">
    			<h3>所在寝室</h3>
    			<!-- <p class="fpqk" :style="info.qszt==2?'color:#3DA8F5':''">{{info.qszt == 2?"已分配":"尚未分配"}}</p> -->
    			<p class="fpqk" style="color:#3DA8F5">查看详情</p>
    		</div>
    		<div class="tongzhishu" @click="toLuqu"><h3>录取通知书</h3><p class="tzsqk">查看快递</p></div>
    	</div>
    	<div class="tongzhi" @click="toNotice">
    		<div class="tongzhi-pic"></div>
    		<div class="tognzhi-content">
    			<p>{{info?info.tzgg[0]:''}}</p>
    			<p>{{info?info.tzgg[1]:''}}</p>
    		</div>
    	</div>
<!--     	<ul class="app-list">
    		<li v-for="(item,index) in applist" @click="toPage(item)" :style="{'background-image':'url('+item.bgImage+')'}">
    			<div><img v-show="item.finish" src="static/student-index-pictures/app-yiwancheng.png"></div>
    			<p>{{item.title}}</p>
    		</li>
    		
    	</ul> -->
		  <ul class="app-list" v-if="process.length>0">
    		<li v-for="(item, index) in process" @click="togo(item.pauId, item.state, item.studentJumpPath)" :style="{'background-image':'url('+item.imgUrl+')','background-size': 'cover'}">
    			<div><img v-show="item.state==0" src="static/student-index-pictures/app-yiwancheng.png"></div>
    			<p>{{item.eaaName}}</p>
    		</li>
    	</ul>
    	<ul class="app-list app-list-href" v-show="type=='left'">
<!--     		<div class="app-list-content" v-show="showHref">
    			<span class="app-list-ts">请先完成绿色通道后解锁</span>
    		</div> -->
    		<li v-for="(item,i) in gdArr" @click="jump(item.path)" :style="{'background-image':'url('+item.logo+')','background-size': 'cover'}">
    			<p>{{item.name}}</p>
    		</li>
    	</ul>
    	<div class="footer-fixed" style="z-index:999">
    		<div :class="{'left':type=='left'}" @click="changeApp('left')">
    			<p>入学准备</p>
    		</div>
    		<div :class="{'right':type=='right'}" @click="changeApp('right')">
    			<p>报到流程</p>
    		</div>
    	</div>
    </div>
    <div v-else-if="showYdy==1" class="home-ydy">
    	<yindaoye @hiden="hiden" :data="ydyPicture"></yindaoye>
    </div>
    <div v-else-if="showYdy==4">
    	<csLogin @refresh="refresh"></csLogin>
    </div>
</div>
</template>

<script type="ecmascript-6">
import {getIndexData} from "student/api/indexInfo"
import yindaoye from './yindaoye'
import popup1 from "student/component/common/popup-test"
import popup from "student/component/common/popup"
import csLogin from 'student/component/csLogin'
import { getYdyStu,setYdyStu,getHjxx,setHjStu,getBdLc } from 'student/api/getHjxx'
var applistRxzb = []
var applistBdlc = []

export default {
  name: '',
  data () {
    return {
    	//是否显示引导页
    	showYdy: 0,
      ydyPicture: [],
    	//弹出提示信息插件popup，点击未解锁的应用时显示，
    	jiesuo: false,
    	process: [],
    	//弹出提示信息插件popup，入学准备完成后的提示信息。
    	wancheng: false,
    	
    	//首页默认显示的入学准备的app列表信息
    	applist: applistRxzb,
    	//用来记录入学准备里app的完成状态，假设值为1时代表已完成
    	flag: '',
    	//点击“入学准备”切换样式，默认为left
    	type: 'left',
    	clickLeft: 'left',
    	//点击“报道流程”切换样式，默认为right
    	clickRight: 'right',
    	//后台数据
    	info: '',
    	//入学准备未完成，去报道流程里点击app，弹出未解锁遮罩
    	weijiesuo: '',
      logo: 'this.src="' + require('./pic.png') + '"',
    	//理工
      // gdArr: [{name: '校园VR',path: 'http://720yun.com/t/x77yp9e447hao9w803',logo: 'static/student-index-pictures/xyvr@2x.png'},
      //   {name: '校园文化',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=3&sn=a5b1e84ad75b4806199815957a64ae3a&uin=&key=&devicetype=Windows',logo: 'static/student-index-pictures/xywh@2x.png'},
      //   {name: '校园生活',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=3&sn=a5b1e84ad75b4806199815957a64ae3a&uin=&key=&devicetype=Windows',logo: 'static/student-index-pictures/xyxx@2x.png'},
      //   {name: '校园安全',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA%3D%3D&hid=15&sn=896dafbc4b2a0be6a168700ee97baa16',logo: 'static/student-index-pictures/whcp@2x.png'}],
      // gdArr1: [{name: '迎新志愿者报名',path: 'http://cn.mikecrm.com/x422BLo',logo: 'static/student-index-pictures/jgbbm@2x.png'},
      // {name: '通讯连报名',path: 'http://cn.mikecrm.com/cQhZeEo',logo: 'static/student-index-pictures/jgbbm@2x.png'},
      // {name: '教改班报名',path: 'http://jgbbm.cqut.edu.cn/',logo: 'static/student-index-pictures/jgbbm@2x.png'}]

    	// gdArr: [{name: '校园文化',path: 'http://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=7&sn=707ffe76916b370895a3348932cae8db&scene',logo: 'static/student-index-pictures/xywh@2x.png'},{name: '校园学习',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=2&sn=2bd67be331c5b787441df10b8906115a&uin=&key=&devicetype=Windows',logo: 'static/student-index-pictures/xyxx@2x.png'},{name: '两江直播间',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=1&sn=a0309ab99815a0e832bb1c030cce434f&uin=&key=&devicetype=Windows+7&version=6204014f&lang=zh_CN&winzoom=1',logo: 'static/student-index-pictures/ljzbj@2x.png'},{name: '文化产品',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=6&sn=09b288475b8d8269110385006082807a&uin=&key=&devicetype=Windows',logo: 'static/student-index-pictures/whcp@2x.png'},{name: '学长寄语',path: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MjA5NDU3MA==&hid=5&sn=38032617a4dae1c805791136ce373854&uin=&key=&devicetype=Windows+7&version=6204014f&lang=zh_CN&winzoom=1',logo: 'static/student-index-pictures/xzjy@2x.png'},{name: '迎新志愿者报名',path: 'http://cn.mikecrm.com/x422BLo',logo: 'static/student-index-pictures/yxzyzbm@2x.png'},{name: '军训师通讯连报名',path: 'http://cn.mikecrm.com/cQhZeEo',logo: 'static/student-index-pictures/jxstxlbm@2x.png'},{name: '教改班报名',path: 'http://jgbbm.cqut.edu.cn/',logo: 'static/student-index-pictures/jgbbm@2x.png'},
    	// 	{name: '校园VR',path: 'http://720yun.com/t/x77yp9e447hao9w803',logo: 'static/student-index-pictures/xyvr@2x.png'}]
    	//工商
    	gdArr: [{name: '美丽工商',path: 'http://msf.ctbu.edu.cn/ydyx/html/mlgs.jsp?userid=2017171129&ticket=D531F901290C76ED8D0C663BFF7D4A4E',logo: 'static/student-index-pictures/mlgs@2x.png'},
    			{name: '模拟迎新',path: 'http://msf.ctbu.edu.cn/ydyx/html/index.jsp?userid=2017171129&ticket=D531F901290C76ED8D0C663BFF7D4A4E',logo: 'static/student-index-pictures/mnyx@2x.png'}]
    }
  },
  activated(){
  	this.getData().then(() => {
  		this.getBdLc()
  	})
  	this.getZTxx()
  },
  computed: {
  	showHref(){
  		let obj
  		this.process.length>0 && (obj = this.process.filter(item => item.eaaName!=='报到交通')[0])
  		return obj && obj.state !== '0'
  	},
  	lastHj(){
  		return this.process[(this.process.length-1)].pauId
  	},
  	//是否完成报道流程
  	bdlcStu(){
  		// console.log(this.process.filter(item => Number(item.state)!=0))
  		return this.process.length>0 && this.process.filter(item => Number(item.state)!=0).length==0
  	}
  },
  methods:{
  	getZTxx(){
  		getYdyStu().then((res) => {
	  		if(res.state == 200) {
	  			res.data.enrollConfiguration 
	  			&& (this.showYdy = res.data.bootPageAndUser.bootPageCondition);
	  			// && (this.showYdy = 2) 
	  			this.type=='left' && this.getHjxx();
	  			res.data.enrollConfiguration 
	  			&& res.data.enrollConfiguration.state==3
	  			&& (this.showYdy = 4);
          res.data.bootPageAndUser && (this.ydyPicture = res.data.bootPageAndUser.bootPagePicture)
	  		}
	  	})
  	},
  	refresh(){
  		this.getZTxx()
  	},
  	getHjxx(){
  		getHjxx().then((res) => {
			if(res.state == 200) {
        console.log(res.data.process)
				this.process = res.data.process
				if(this.lastHj == this.$store.getters.getHjid && this.process.filter(item => item.state!=0).length==0){
          this.wancheng = true
          this.$store.commit("savehjid","")
				}
			}else{
        this.process = ''
			}
		});
  	}, 
  	getBdLc(){
  		getBdLc().then((res) => {
  			if(res.state == 200) {
  				if(this.bdlcStu) {
  					this.weijiesuo = res.data.registration?false:true
  				}
  				this.process = res.data.registration?res.data.registration:''
  			}else{
          this.process = ''
  			}
  		})
  	},
  	hiden(){
  		this.showYdy = false
  		setYdyStu() 
  	},
  	jump(path){
  		window.location.href=path
  	},
  	tip(){//只是用点击事件先测试完成入学准备后的组件能否正常显示，没有实际意义
  		this.wancheng=!this.wancheng
  	},
  	toShowCode(){//点击第二个二维码小图标，跳转到我的二维码信息页面
  		this.$router.push('/mycode')
  	},
  	topMyInfo(){//点击学院和“更多”图标那一栏，跳转到显示我的信息页面
  		this.$router.push('/myinfo')
  	},
  	toDztzs(){//点击通知书图标到通知书页面
  		this.$router.push({path:'/dztzs',query:{time: Date.parse(new Date())}})
  	},
  	toLuqu(){//点击录取通知书下的“查看快递”，跳转到展示快递物流信息页面
  		this.$router.push('/indexLqtzs')
  	},
  	toNotice(){//点击通知公告栏，跳转到通知列表页
  		this.$router.push('/noticeList')
  	},
  	puptip(){//点击到未解锁应用时，弹出提示未解锁
  		this.jiesuo = true
  	},
  	toAqzscs(){//跳转到“安全知识测试”页面
  		this.$router.push('/rxzb/aqzscs')
  	},
  	toWsxx(){//跳转到“完善信息”页面
  		this.$router.push('/rxzb/wsxx')
  	},
  	toPage(item){//解决v-for中@click的函数名不能是变量，从而导致的无法循环给每个li添加不同的点击事件的问题
  		//循环添加同一个点击事件，函数名为toPage,然后在这个里面执行各个li应当绑定的不同事件
  		this[item.toPage]()
  	},
  	toXcbd(){//跳转到“现场报道”页面
  		this.$router.push('/bdlc/xcbd')
  	}, 
  	toSxbl(){//跳转到“宿舍办理”页面
  		this.$router.push('/bdlc/ssbl')
  	},
  	toXcjf(){//跳转到“现场缴费”页面

  	},
  	toSzqs(){//点击跳转到所在寝室
  		this.$router.push('/szqs')
  	},
  	toZjlg(){//跳转到走进理工
  		this.$router.push('/rxzb/zjlg')
  	},
  	changeApp(t){
  		if(t==this.type){
  			return false
  		}
  		this.$store.commit('savehjid','')
  		if(t=='right'){
  			// this.getBdLc()
	  		getBdLc().then((res) => {
	  			if(res.state == 200) {
	  				this.weijiesuo = res.data.registration?false:true
	  				this.process = res.data.registration?res.data.registration:''
	  			}
	  		})
  		}else if(t=='left'){
  			this.weijiesuo = false
  			this.getHjxx()
  		}
  		this.type = t
  	},
  	// changeAppListLeft(){
  	// 	if(this.clickLeft=='right'){
  	// 		var temp = this.clickLeft
  	// 		this.clickLeft = this.clickRight
  	// 		this.weijiesuo = false
  	// 		this.clickRight = temp
  	// 		this.getHjxx()
  	// 	}
  	// },
  	// changeAppListRight(){
  	// 	if(this.clickLeft=='left'){//防止再次点击同一个选项仍然会改变样式
  	// 		var temp = this.clickLeft  //点击时切换两个选项卡的样式
  	// 		this.clickLeft = this.clickRight
  	// 		this.clickRight = temp
  	// 	}
  	// 	if(this.flag==1){//已判定完成了“入学准备”，然后点击“报道流程”的流程

  	// 	}else{//未完成“入学准备”就点击了“报道流程”的流程
  	// 		this.getBdLc() //切换默认的报道流程未解锁的数据
  	// 	}
  	// },
  	toPageJfdt(){//点击跳转到缴费大厅
  		this.$router.push('/jfdt')
  	},
  	getData(){
  		return new Promise((resolve) => {
			if(this.type == 'left') {
		  		getIndexData().then((res) => {
		  			if(res.code==='40001'){
		  				this.info = res.content
              console.log(res);
		  			}else{
		  				console.log("data error")
		  			}
		  			resolve()
		  		})
	  		}else if(this.type=='right'){
	  			getBdLc()
	  		}
  		})
  	},
  	togo(hjid, state, path){
  		this.$store.commit('savehjid', hjid)
  		this.$router.push(state!=2?path:'')
  	}
  },
  // created(){
  // 	this.getData()
  // 	this.getZTxx()
  // },
  components: {yindaoye, popup,popup1, csLogin}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.bgcolor
  position:fixed
  top:0
  bottom: 0
  width:100%
  background:#f7f7f7
  z-index:2
  padding-bottom: .5rem
  overflow-y:auto
  .weijiesuo //未完成入学准备点击到报道流程后，点击app要显示的解锁提示遮罩
    z-index:2
    width:100%
    display:flex
    justify-content:center
    align-items:center
    background:rgba(0,0,0,.5)
    height:calc(100% - 3rem)
    position:fixed
    bottom:.5rem
    font-family:PingFang-SC-Bold
    font-weight:bold
    color:#fff
    font-size:.17rem
  .header //头部显示的学生详细信息
    overflow:hidden
    font-family:PingFang-SC-Medium
    color:#333333
    padding-top:.1rem
    font-size:0.13rem
    background-color:#3FB4FF
    padding-bottom:0.48rem
    .pic //学生头像
      float:left
      margin-left:0.14rem
      width:0.75rem
      height:0.75rem
      display:flex
      justify-content:center
      align-items:center
      .picbg
        width:.65rem
        height:.65rem
        border-radius:50%
        background:#fff
        display:flex
        justify-content:center
        align-items:center
      img
        width:.6rem
        height:.6rem
        border-radius:50%
        background:#ececec
    .student-info //学生缴费信息等突出显示栏
      float:left
      width:calc(100% - 1rem)
      margin-top:0.03rem
      margin-left:0.10rem
      .student-name //学生基本信息
        font-size:0
        .xingming //学生姓名
          display:inline-block
          font-size:0.17rem
          font-family:PingFang-SC-Bold
          color:#fff
          margin-top:0.04rem
          vertical-align:top
        .ico-1 //学生性别图标
          display:inline-block
          margin-left:0.06rem
          margin-top:0.06rem
          width:0.14rem
          height:0.14rem
          vertical-align:top
          background-size:.14rem .14rem
          //background-image:url(../../../../static/student-index-pictures/woman.png)
          background-repeat:no-repeat
        .ico-2,.ico-3
          display:inline-block
          width:0.24rem
          height:0.24rem
        .ico-2 //学生信息二维码
          margin-left:0.14rem
          margin-right:0.09rem
          background:url(/yxxt/static/student-index-pictures/iOS.png) no-repeat
          background-size:.24rem .24rem
        .ico-3 //通知书图标
          background:url(/yxxt/static/student-index-pictures/book.png)
          background-size:.24rem .24rem
      .yuan //学生所在学院
        font-size:0.14rem
        color:#fff
        margin-top:0.05rem
        margin-bottom:0.08rem
        padding-left:0.2rem
        background:url(/yxxt/static/student-index-pictures/yuan.png) no-repeat
        background-size:.12rem .12rem
        .ico-4
          float:right
          margin-right:0.12rem
          width:0.08rem
          height:0.13rem
          background:url(/yxxt/static/student-index-pictures/more.png)
          background-size:.08rem .13rem
      .xi //学生所在系
        font-size:0.13rem
        color:#fff
        padding-left:0.2rem
        background:url(/yxxt/static/student-index-pictures/xi.png) no-repeat
        background-size:.12rem .12rem
        span
          span
            display:inline-block
            text-align:center
            vertical-align:top
            width:1.3rem
            overflow:hidden
            text-overflow:ellipsis
            white-space:nowrap
  .contain
  //学生缴费信息等突出显示栏
    margin:-0.37rem auto 0
    display:flex
    justify-content:space-around
    width:calc(100% - .3rem)
    height:0.8rem
    background:rgba(255,255,255,1)
    border-radius:0.04rem
    box-shadow:0.01rem 0.01rem 0.05rem rgba(80,113,159,0.5)
    div
      width:33%
      text-align:center
      h3
        font-family:PingFang-SC-Medium
        font-size:0.14rem
        color:#333333
        margin-top:0.14rem
        margin-bottom:0.1rem
    .price
      .need-price
        font-size:0.12rem
        font-family:PingFang-SC-Medium
        color:rgba(239,90,83,1)
        line-height:0.12rem
        margin-bottom:0.07rem
      .jfqk
        font-size:0.12rem
        font-family:PingFang-SC-Medium
        color:rgba(61,168,245,1)
        line-height:0.12rem
    .room
      .fpqk
        font-size:0.12rem
        font-family:PingFang-SC-Medium
        color:rgba(153,153,153,1)
        line-height:0.12rem
        padding-top:0.06rem
    .tongzhishu
      .tzsqk
        font-size:0.12rem
        font-family:PingFang-SC-Medium
        color:rgba(61,168,245,1)
        line-height:0.12rem
        padding-top:0.06rem
  .tongzhi //通知栏
    padding:0.16rem 0 0 0.12rem
    height:0.48rem
    margin-top:0.1rem
    background:#fff
    .tongzhi-pic//通知图标
      float:left
      width:0.37rem
      height:0.32rem
      background:url(/yxxt/static/student-index-pictures/notice.png)
      background-size: .37rem .32rem
    .tognzhi-content //通知内
      float:left
      width:calc(100% - .53rem)
      margin-left:0.16rem
      font-size:0.13rem
      font-family:PingFang-SC-Medium
      line-height:0.13rem
      color:rgba(51,51,51,1)
      background:#fff
      p //控制通知消息，超出隐藏并显示...
        width: 100%
        overflow:hidden
        text-overflow:ellipsis
        white-space:nowrap
      p:first-child
        margin-bottom:0.09rem
        margin-top:-0.03rem
  .app-list //应用入口图标列表
    display:flex
    flex-wrap:wrap
    margin-top:0.11rem
    width:100%
    // padding-bottom: .48rem
    li
      width:33%
      height:1.22rem
      margin-bottom:0.01rem
      background-color:#fff
      background-repeat:no-repeat
      background-position:center center
      position:relative
      div
        position:absolute
        top:0.1rem
        right:0.1rem
        display:block
        img
          width:.16rem
          height:.11rem
      p
        margin-top:0.8rem
        text-align:center
        font-size:0.14rem
        line-height:0.14rem
        font-family:PingFang-SC-Medium
        color:rgba(51,51,51,1)
    li:nth-of-type(3n+2)
      margin:0 .01rem
      .app-list-href
        position:relative
      .app-list-content
        position:absolute
        top:0
        bottom:0
        left:0
        width:100%
        background:rgba(0,0,0,.5)
        z-index:999
      .app-list-ts
        position:absolute
        color:white
        font-size:18px
        top:50%
        left:50%
        transform:translate(-50%, -50%)
        white-space:nowrap
  .footer-fixed //底部固定两栏
    width:100%
    height:0.49rem
    display:flex
    position:fixed
    align-items:center
    justify-content:center
    text-align:center
    bottom: 0
    background: #fff
    z-index: 999
    >div
      flex: 1
      font-size:0.15rem
      font-family:PingFang-SC-Bold
    .left
    .right
      width:50%
      color:rgba(51,51,51,1)
      p
        font-weight:bold
    .left
      color:rgba(51,51,51,1)
      line-height:0.15rem
      p
        font-weight:bold
    .right
      font-size:0.15rem
      font-family:PingFang-SC-Bold
      line-height:0.15rem
.home-ydy
  position:fixed
  top:0
  bottom:0
  width:100%
</style>