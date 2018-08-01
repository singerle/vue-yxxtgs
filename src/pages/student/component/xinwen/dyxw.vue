<template>
<!--单页新闻 -->
<div class="bgcolor">
  	<div class="notice-detail" v-for="item in info">
	  	<h3>{{item.tzbt}}</h3>
	  	<p class="shijian">
	  		<span>
	  			<span class="date">{{item.fbsj}}</span>
	  		</span>
	  		<span class="viewer">{{item.llcs}}</span>
	  	</p>
	  	<p class="detail" v-html="item.tznr"></p>
	</div>
  </div>
</template>

<script>
import { xGllcs } from 'student/api/tzgg'
import { getZjlgNewsData } from 'student/api/zjlg-xwcx'
import { completeProcess } from 'student/api/completeSendData'
export default {
  name: '',
  data(){
  	return {
  		info: '',
  		//data: this.$route.query.data
  	}
  },
  activated(){
		//this.data = this.$route.query.data
		completeProcess({pauId:this.$store.getters.getHjid})
  	getZjlgNewsData({id:this.$store.getters.getHjid}).then((res) => {
  			if(res.code=="40001"){
  				this.info = res.content
  				xGllcs({tzbh: res.content[0].tzbh})
  				completeProcess({pauId:this.$store.getters.getHjid})
          this.$nextTick(() => {
            let doms = document.getElementsByClassName('detail')[0].getElementsByTagName('img')
            for(let i=0;i<doms.length;i++){
              doms[i].style.width='100%'
            }
          })
  			}
  		})
  },
  computed: {
    notice_xq(){
      return this.info?JSON.parse(this.info):''
    }
  },
  updated(){
    let doms = document.getElementsByClassName('detail')[0].getElementsByTagName('img')
    for(let i=0;i<doms.length;i++){
      doms[i].style.width='100%'
    }
  },
  created(){
    console.log('created');
  },
  methods: {
    addLlcs() {
      xGllcs({tzbh: this.notice_xq.tzbh})
    }
  }
  // computed: {
  // 	notice_xq(){
  // 		return this.data?JSON.parse(this.data):''
  // 	}
  // },
  //methods: {
  	// addLlcs() {
  	// 	xGllcs({tzbh: this.lll})
  	// }
  	// addXwxx(){
  	// 	console.log(this.$store.getters.getHjid);
  	// 	getZjlgNewsData({id:this.$store.getters.getHjid}).then((res) => {
  	// 		if(res.code=="40001"){
  	// 			console.log(res.message);
  	// 			this.info = res.content
  	// 		}
  	// 	})
  	// }
  //},
  // created(){
  // 	this.addXwxx()
  // }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .bgcolor
    position:fixed
    top:0
    bottom:0
    background:#f7f7f7
    overflow-y: auto
    overflow-x: hidden
		.notice-detail
			padding:0 0.12rem
			border-top:0.01rem solid #ECECEC
			background:#fff  
			h3
				margin:0.2rem 0 0.14rem
				color:#333
				font-size:0.16rem
				font-family:PingFang-SC-Bold
				line-height:0.16rem
			.shijian
				display:flex
				justify-content:space-between
				font-family:PingFang-SC-Medium
				font-size:0.12rem
				color:#999
				line-height:0.12rem
				.viewer
					text-indent:0.18rem
					background:url(/yxxt/static/student-index-pictures/eye.png) no-repeat left center
					background-size:.14rem .09rem
			>.detail
				font-size:0.13rem
				line-height:0.24rem	
				font-family:PingFang-SC-Medium
				padding-bottom:0.13rem    
</style>
