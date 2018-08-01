<!-- 入学准备-报道交通 -->
<template>
	<div class="rxzb-bdjt">
    	<ul>
    		<li>
    			<div class="left">到达时间</div>
    			<div class="right" @click="$refs.picker.open()">{{ddsj?ddsj:'请选择'}}</div>
    		</li>
    		<li>
    			<div class="left">交通工具</div>
    			<div class="right" @click="jtgj=true">{{obj.jtgj?obj.jtgj:'请选择'}}</div>
    		</li>
    		<li>
    			<div class="left">班次信息</div>
    			<div class="rightBcxx"><input placeholder="请输入" style="text-align: right;font-size: 14px" v-model="obj.bcxx"></div>
    		</li>
    		<li>
    			<div class="left">到达站</div>
    			<div class="right" @click="showDdz">{{obj.ddz?obj.ddz:'请选择'}}</div>
    		</li>
    		<li>
    			<div class="left">陪同人数</div>
    			<div class="right" @click="ptrs=true">{{obj.ptrs?obj.ptrs:'请选择'}}</div>
    		</li>
    	</ul>
    	<div class="save" @click="handleSave">保存</div>
    	<div class="success" v-show="show">操作成功</div>
		<mt-datetime-picker
			ref="picker"
			type="datetime"
			:startDate="new Date()"
			@confirm="handleConfirm">
		</mt-datetime-picker>
		<!-- 交通工具 -->
    	<mt-popup
		  v-model="jtgj"
		  position="bottom">
		  	<div class="popupWidth">
		  		<p>
		  			<span class="fl" @click="closepopu('jtgj')">取消</span>
		  			<span class="fr" @click="confirm('jtgj')">确认</span>
		  			<div style="clear: both"></div>
		  		</p>
			  	<mt-picker :slots="jtgjSlots" ref="jtgj" :visibleItemCount="3"></mt-picker>
			</div>
		</mt-popup>
		<!-- 到达站 -->
    	<mt-popup
		  v-model="ddz"
		  position="bottom">
		  <div class="popupWidth">
		  	<p>
		  		<span class="fl" @click="closepopu('ddz')">取消</span>
		  		<span class="fr" @click="confirm('ddz')">确认</span>
		  		<div style="clear: both"></div>
		  	</p>
			<mt-picker :slots="ddzdSlots" ref="ddz" :visibleItemCount="3"></mt-picker>
		  </div>
		</mt-popup>
		<!-- 陪同人数 -->
    	<mt-popup
		  v-model="ptrs"
		  position="bottom">
		  <div class="popupWidth">
		  	<p>
		  		<span class="fl" @click="closepopu('ptrs')">取消</span>
		  		<span class="fr" @click="confirm('ptrs')">确认</span>
		  		<div style="clear: both"></div>
		  	</p>
			<mt-picker :slots="pdrs" ref="ptrs" :visibleItemCount="3"></mt-picker>
		</div>
		</mt-popup>
	</div>
</template>
<script type="text/ecmascript-6">
import station from 'common/js/station'
import {sendBdjtbc,getCxblData} from 'student/api/bdjt'
import {setHjStu} from 'student/api/getHjxx'
	export default {
		name:'rxzb-bdjt',
		data(){
			return {
				show:false,
				jtgj: false,
				bcxx: false,
				ddz: false,
				ptrs: false,
				slots: [],
				ddsj: '',
				obj: {
					ddsj: "",
					jtgj: "",
					bcxx: "",
					ddz: "",
					ptrs: ""
				},
				pdrs: [{
			          flex: 1,
			          values: ['0','1', '2', '3', '4', '5', '6']
			        }],
				station: station
			}
		},
		computed: {
			jtgjSlots() {
				let gj = []
				this.station.forEach((r, i) => {
					gj.push(r.name)
				})
				return [{values: gj}]
			},
			ddzdSlots() {
				let ddzd = []
				this.station.forEach((r, i) => {
					if(r.name == this.obj.jtgj){
						r.children.forEach((r1, i1) => {
							ddzd.push(r1.name)
						})
					}
				})
				return [{values: ddzd}]
			},
			check(){
				let stu=true
				for(var key in this.obj){
					if(!this.obj[key]){
						console.log(key+'/'+this.obj[key])
						stu = false
					}
				}
				return stu
			}
		},
		created(){
			getCxblData().then((res) => {
				if(res.code == '40001'){
					this.ddsj = new Date(res.content.ddsj).format('yyyy-MM-dd hh:mm')
					res.content.ddsj =  new Date(res.content.ddsj).format('yyyyMMddhhmm')
					this.obj = Object.assign(this.obj, res.content)
				}
			})
		},
		methods:{
			handleSave() {
				if(!this.check){
					this.$Toast('请完善信息')
					return false
				}
				sendBdjtbc({param: encodeURI(JSON.stringify(this.obj))}).then((res) => {
					if(res.code == '40001'){
						this.$Toast('保存成功')
						setHjStu({pauId: this.$store.getters.getHjid})
						this.$router.go(-1)
					}
				})
			},
			handleConfirm(val) {
				let d = new Date(val)
				this.ddsj = d.format('yyyy-MM-dd hh:mm')
				this.obj.ddsj = d.format('yyyyMMddhhmm')
			},
			confirm(key){
				this[key] = false
				this.obj[key] = this.$refs[key].values[0]
			},
			showDdz() {
				if(this.obj.jtgj){
					this.ddz = true
					return false
				}
				this.$Toast('请选择交通工具')
			},
			closepopu(popu) {
				this[popu] = false
			}
		}
 	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.rxzb-bdjt
		font-family:PingFang-SC-Medium
		position:fixed
		top:0
		bottom:0
		width:100%
		background:#f7f7f7
		border-top:.01rem solid #E9E9E9
		ul
			padding:0 .12rem
			background:#fff
			li
				border-bottom:.01rem solid #E9E9E9
				height:.44rem
				display:flex
				justify-content:space-between
				align-items:center
				.left
					color:#333333
					font-size:.16rem
				.right
					background:url(/yxxt/static/student-index-pictures/more-hui@2x.png) no-repeat right center
				.rightBcxx,.right
					color:#999999
					font-size:.14rem
					padding-right:.14rem
					text-align:right
			li:last-child
				border:0
		.save
			width:calc(100% - .24rem)
			margin:.2rem auto 
			background:#3DA8F5
			height:.46rem
			font-size:.17rem
			color:#fff
			text-align:center
			line-height:.46rem
			border-radius:.06rem
			box-shadow:.01rem .01rem .02rem rgba(85, 178, 245, 0.5)
		.success
			position:absolute
			transform:translateX(-50%) translateY(-50%) translateZ(0)
			top:20%
			left:50%
			width:calc(100% - 2.68rem)
			height:.4rem
			border-radius:.06rem
			background:rgba(0,0,0,.7)
			font-size:.16rem
			color:#fff
			text-align:center
			line-height:.4rem
		input
			outline: none
.mint-popup
	width: 100%
.popupWidth
	>p
		font-size: 16px
		padding: .1rem
		text-align: center
</style>