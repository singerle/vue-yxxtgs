<template>
  <div class="container">
    <h2 class="title">{{content.title}}</h2>
    <ul class="item-wrapper" v-show="content.desc.length>0">
      <li class="item" v-for="(item, index) in content.desc">{{index+1}}、 {{item}}</li>
    </ul>
    <p class="title mt10">缴费信息</p>
    <div class="detail">
    		<ul>
    			<li>
    				<span>费用名称</span>
    				<span>应交金额</span>
    				<span>已交金额</span>
    				<span>欠费金额</span>
    			</li>
    			<li v-for="(item,index) in info">
    				<span>{{item.fymc}}</span>
    				<span>{{item.yjfy}}</span>
    				<span>{{item.yjje}}</span>
    				<span>{{item.qfje}}</span>
    			</li>
    		</ul>
    	</div>
  </div>
</template>

<script>
// import {fetchJfxx} from 'teacher/api/teacher.js'
export default {
  // data(){
  //   return {
  //     info:[]
  //   }
  // },
  props: {
    content: {
      type: Object,
      defalut: function() {
        return {
        }
      }
    },
    info: {
      type: Array,
      defalut: function() {
        return {
        }
      }
    },
  },
  // mounted(){
  //   fetchJfxx(11817010230).then((res) => {
  //     console.log(res.data.content)
  //     this.info = res.data.content
  //   })
  // }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .container
    width 100%
    padding 15px 10px
    background $color-background
    box-sizing border-box
    .title
      color $color-font-nav
      font-size $font-size-large
      font-weight bold
    .item-wrapper
      margin-top 15px
      .item
        color $color-font-nav
        font-size $font-size-medium
        margin-top 5px
  .detail
			margin-top:.1rem
			background:#fff
			ul
				li
					font-family:PingFang-SC-Medium
					color:#333
					font-size:.13rem
					height:.44rem
					text-align:center
					display:flex
					align-items:center
					border-bottom:.01rem solid #F5F5F5
					span
						width:25%
				li:first-child
					font-size:.14rem
					font-family:PingFang-SC-Bold
					span
						font-weight:bold
				li:last-child
					border:0
</style>

