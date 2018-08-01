<!-- 保险购买-放弃购买 -->
<!-- 点击放弃购买过后显示的页面 -->
<template>
	<div class="wrap" style="font-size:.14rem">
		<h3>重庆市大学生城乡居民合作医疗保险介绍</h3>
		<div class="mt10" style="text-indent: 2em;line-height:.2rem;font-weight:600;">
			根据《关于将大学生纳入城乡居民合作医疗保险的实施意见》（渝人社发〔2009〕185号）和《关于印发重庆市城乡居民合作医疗保险市级统筹实施办法的通知》（渝人社发[2012]127号）有关精神，为保障大学生基本医疗需求，切实落实党中央对在校大学生的医疗优惠政策，减轻患病大学生家庭经济负担，特实施大学生城乡居民医疗保险。
		</div>
		<h3>
			（一）参保范围
		</h3>
		<div class="mt10" style="text-indent: 2em;line-height:.2rem;font-weight:600;">
			具有我校正式学籍的全日制本科生、全日制研究生（以下称简称大学生）均可在自愿原则的基础上参加大学生城乡居民合作医疗保险。享受待遇时间从当年的9月1日至次年的8月31日。
		</div>
		<h3>
			（二）缴费标准
		</h3>
		<div class="mt10" style="text-indent: 2em;line-height:.2rem;font-weight:600;">
			大学生参保个人缴费标准分为一档和二档。具体标准由市人力资源和社会保障局会同相关部门，于每年8月31日前报由市政府批准后发布。2018-2019学年大学生医保的费用为每人每年180元（暂定费用，准确费用待重庆市政府最终确定）。系统默认为一档标准，如有购买二档需求的同学，请于开学报到后在各学院辅导员处办理升档手续。
		</div>
		<div class="mt10" style="text-indent: 2em;line-height:.2rem;font-weight:600;">
    		对大学生中的困难群体，按照民政部门的相关规定给予参保资助。大一新生全部先按照重庆市统一标准收取保费，待入学贫困生认定工作开展后，再根据相关规定给予贫困同学医保减免。
		</div>
		<router-link to="/bxgmFqgmJh1">
			<div class="bottom">
		  		<span class="tip">确认不购买</span>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
  name: 'rxzb-bxgm-fqgm'
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.wrap
		background:#fff
		border-top:.01rem solid #F2F2F2
		padding:0 .06rem .58rem .06rem
		overflow:auto
		p:nth-last-of-type
			padding-bottom:1rem
		h3
			font-size:.18rem
			font-weight:bold
			height:.4rem
			line-height:.6rem
		.bottom
			position:fixed
			bottom:.1rem
			width:calc(100% - .24rem)
			// margin-left:.11rem
			left: 50%
			transform: translateX(-50%)
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
</style>