<template>
	<div class="wrap">
    <scroll ref="scroll" 
        class="scroll"
        :isWXGD="true"
        :loadUrl="'student/tzgg'"
        :loadParams="loadParams"
        @getMore="getMore"
        :probeType="3" 
        :pullup="true"
        :listenScroll="true"
        :data="notices"
        >
  		 <div class="notice-list">
          <ul class="list">
            <li v-for="(item,index) in notices" :key="index" @click="$router.push({path: '/bdlc/jlsy/jxsj',query: {data: JSON.stringify(item)}})">
              <div class="left">
                <p class="default">通知</p>
                <img :src=item.fmtp v-show="item.fmtp===''?false:true">
              </div>
              <div class="right">
                <div class="biaoti">
                  <h4>{{item.tzbt}}</h4>
                  <span>{{item.timeInterval}}</span>
                </div>
                <!-- <p class="jianjie" v-html="item.tznr"></p> -->
                <p class="showtime">
                  <span>
                    <span>{{item.fbsj}}</span>
                  </span>
                  <span class="viewer">{{item.llcs}}</span>
                </p>
              </div>
            </li>
          </ul>
      </div>
    </scroll>
	</div>
</template>
<script>
import {getZjlgNewsData} from 'student/api/zjlg-xwcx'
import scroll from '@/base/scroll/scroll'
import { getTzggData } from 'student/api/tzgg'
export default {
  name: 'notice-list',
  data () {
    return {
      loadParams: {
        page: 1,
        pagesize: 10
      },
      notices: []
    }
  },
  activated(){

    let t = this.loadParams.page*this.loadParams.pagesize
    this.getNoticeData({page: 1,pagesize: t})
  },
  created(){
  	let t = this.loadParams.page*this.loadParams.pagesize
    this.getNoticeData({page: 1,pagesize: t})
    console.log(this.$store.getters.getHjid);
    getZjlgNewsData({id:this.$store.getters.getHjid}).then((res) => {
        	if(res.code=="40001"){
        		console.log(res.message)
        		console.log(res)
        	}else{
        		console.log("data error")
        	}
        })
  },
  methods: {
    addTime(data){
      data.forEach((r, i) => {
        let fbsj = r.fbsj.replace(/-/g,'/')
        let date = new Date().format('yyyyMMddhhmm') - new Date(fbsj).format('yyyyMMddhhmm')
        if(date>60){
          date = (date/60).toFixed(1)
          if(date>24){
            date = (date/24).toFixed(1) + '天前'
          }else{
            date = date+'小时前'
          }
        }else if(date<60){
          date = date+'分钟前'
        }else if(data<10){
          date = date+ '刚刚'
        }
        this.$set(r,'timeInterval', date)
      })
      return data
    },
    getNoticeData(p){
      getTzggData(p).then((res) => {
        if(res.code == '40001') {
          this.notices = this.addTime(res.content.rows)
        }
      })
    },
    getMore(data){
      this.notices = this.notices.concat(this.addTime(data.rows))
    }
  },
  components: {scroll}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.wrap
  position:fixed
  top:0
  bottom:0
  width:100%
  background:#f7f7f7
  border-top:0.01rem solid #ECECEC
  .scroll
    height: 100%
    .notice-list
      .list
        li
          display: flex
          overflow:hidden
          margin-bottom:0.1rem
          padding:0.15rem 0.12rem
          background:#fff
          align-items: center
          .left
            width:0.72rem
            height:0.72rem
            border:0.01rem solid #F3F3F3
            border-radius:0.03rem
            display:flex
            justify-content:center
            align-items:center
            position:relative
            .default
              position:absolute
              font-size:0.16rem
              line-height:0.16rem
              font-family:PingFang-SC-Bold
              font-weight:bold
              color:#999
              z-index:2
            img
              position:absolute
              z-index:5
              width:0.72rem
              height:0.72rem
          .right
            flex: 1
            margin-left:0.15rem 
            .biaoti 
              display:flex
              margin-bottom: .15rem
              justify-content:space-between
              h4
                font-size:0.16rem
                font-family:PingFang-SC-Bold
                font-weight:bold
                color:#333
              span
                font-size:0.12rem
                color:#999999
                font-family:PingFang-SC-Regular;
            .jianjie
              width:2.46rem
              font-size:0.13rem
              color:#333
              line-height:0.18rem
              margin-top:0.05rem
              margin-bottom:0.08rem
              font-family:PingFang SC
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
            .showtime
              font-size:0.12rem
              font-family:PingFang-SC-Medium
              color:#999
              line-height:0.12rem
              display:flex
              justify-content:left  
              .viewer
                margin-left:0.25rem
                text-indent:0.18rem
                background:url(/yxxt/static/student-index-pictures/eye.png) no-repeat left center  
</style>
