<template>
    <div class="notice-list">
        <ul class="list">
          <li v-for="(item,index) in getData" :key="index">
            <div class="left">
              <p class="default">{{item.backgroundLetter}}</p>
              <img :src=item.imgSrc v-show="item.imgSrc===''?false:true">
            </div>
            <div class="right">
              <div class="biaoti">
                <h4>{{item.title}}</h4>
                <span>{{item.timeInterval}}</span>
              </div>
              <p class="jianjie">{{item.describe}}</p>
              <p class="showtime">
                <span>
                  <span>{{item.datetime}}</span>&nbsp;<span>{{item.secondtime}}</span>
                </span>
                <span class="viewer">{{item.viewer}}</span>
              </p>
            </div>
          </li>
        </ul>
    </div>
</template>

<script type="ecmascript-6">
// import './testData.js'
let getData = [
  {
    backgroundLetter:'通知',
    imgSrc:'static/student-index-pictures/notice-show.png',
    title:'英语四级考试咨询',
    timeInterval:'刚刚',
    describe:'根据学校规定，今年英语四级考试出了最新的规定，面对这些新的规定与的 ...',
    datetime:'05-21',
    secondtime:'09:36',
    viewer:'1285'
  },
  {
    backgroundLetter:'通知',
    imgSrc:'static/student-index-pictures/notice-show.png',
    title:'英语四级考试咨询',
    timeInterval:'刚刚',
    describe:'根据学校规定，今年英语四级考试出了最新的规定，面对这些新的规定与的 ...',
    datetime:'05-21',
    secondtime:'09:36',
    viewer:'1285'
  },
  {
    backgroundLetter:'通知',
    imgSrc:'static/student-index-pictures/notice-show.png',
    title:'英语四级考试咨询',
    timeInterval:'刚刚',
    describe:'根据学校规定，今年英语四级考试出了最新的规定，面对这些新的规定与的 ...',
    datetime:'05-21',
    secondtime:'09:36',
    viewer:'1285'
  },
  {
    backgroundLetter:'通知',
    imgSrc:'static/student-index-pictures/notice-show.png',
    title:'英语四级考试咨询',
    timeInterval:'刚刚',
    describe:'根据学校规定，今年英语四级考试出了最新的规定，面对这些新的规定与的 ...',
    datetime:'05-21',
    secondtime:'09:36',
    viewer:'1285'
  }
]
export default {
  name: 'box',
  components:{},
  props:['getData'],
  data () {
    return {
      // 左侧无背景图要显示的文字
      backgroundLetter:'通知',
      //图片src的值为''时不显示img
      imgSrc:'static/student-index-pictures/notice-show.png',
      //右侧通知的标题
      title:'英语四级考试咨询',
      //发布通知的时间和现在的时间间隔
      timeInterval:'刚刚',
      //通知的简介内容
      describe:'根据学校规定，今年英语四级考试出了最新的规定，面对这些新的规定与的 ...',
      //发布时间，几月几日
      datetime:'05-21',
      //发布时间，具体的几点几分
      secondtime:'09:36',
      //阅览过这条通知的人数
      viewer:'1285',
      //获取到后台数组数据
      getData:getData
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .notice-list
      .list
        li
          overflow:hidden
          margin-bottom:0.1rem
          padding:0.15rem 0.12rem
          background:#fff
          .left
            float:left
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
            float:right
            margin-left:0.15rem 
            .biaoti 
              display:flex
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
              font-weight:Regular
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