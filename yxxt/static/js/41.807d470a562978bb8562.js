webpackJsonp([41],{1325:function(t,n,e){"use strict";e.d(n,"a",function(){return r});var a=e(36),i=e.n(a),A=e(90),d=e.n(A),o=e(1326),r=function(t,n){var a=d()({},n);return new i.a(function(n){e.i(o.a)({headers:{"Content-Type":"multipart/form-data"},method:"post",url:window.REQUEST_URL+t,params:a}).then(function(t){n(t.data)})})}},1326:function(t,n,e){"use strict";var a=e(36),i=e.n(a),A=e(89),d=e.n(A),o=e(308),r=d.a.create({baseURL:e.i({NODE_ENV:"production"}).BASE_API,timeout:1e4});r.interceptors.request.use(function(t){return t.headers.token=o.a.getters.getuser.userid,t},function(t){i.a.reject(t)}),n.a=r},1496:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(1563);n.default={name:"bdlc-xcjf",data:function(){return{info:[]}},computed:{total:function(){for(var t=0,n=0;n<this.info.length;n++)t+=this.info[n].yjfy;if(t>=1e3){var e=t.toString();t=Math.floor(t/1e3)+","+e.substring(e.length-3)}return 0==t?0:t+".00"},yijiaoqian:function(){for(var t=0,n=0;n<this.info.length;n++)t+=this.info[n].yjje;if(t>=1e3){var e=t.toString();t=Math.floor(t/1e3)+","+e.substring(e.length-3)}return 0==t?0:t+".00"}},methods:{getData:function(){var t=this;e.i(a.a)().then(function(n){"40001"===n.code&&(t.info=n.content)})}},created:function(){this.getData()}}},1563:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var a=e(1325),i=function(t){return e.i(a.a)("student/jfdt",t)}},1639:function(t,n,e){n=t.exports=e(1322)(!0),n.push([t.i,".bdlc-xcjf[data-v-e2d20012]{position:fixed;bottom:0;top:0;width:100%;background:#f7f7f7;overflow:auto;padding-bottom:2rem}.bdlc-xcjf .top[data-v-e2d20012]{padding:0 .12rem;background:#3fb4ff;text-align:center}.bdlc-xcjf .top .text[data-v-e2d20012]{display:-webkit-box;display:-ms-flexbox;display:flex;font-family:PingFang-SC-Bold;font-size:.16rem;font-weight:700;color:hsla(0,0%,100%,.7);padding:.14rem 0}.bdlc-xcjf .top .text p[data-v-e2d20012]{width:50%}.bdlc-xcjf .top .money[data-v-e2d20012]{display:-webkit-box;display:-ms-flexbox;display:flex;font-family:PingFang-SC-Medium;font-size:.3rem;color:#fff;padding-bottom:.3rem}.bdlc-xcjf .top .money p[data-v-e2d20012]{width:50%}.bdlc-xcjf .detail[data-v-e2d20012]{margin-top:.1rem;background:#fff}.bdlc-xcjf .detail ul li[data-v-e2d20012]{font-family:PingFang-SC-Medium;color:#333;font-size:.13rem;height:.44rem;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:.01rem solid #f5f5f5}.bdlc-xcjf .detail ul li span[data-v-e2d20012]{width:25%}.bdlc-xcjf .detail ul li[data-v-e2d20012]:first-child{font-size:.14rem;font-family:PingFang-SC-Bold}.bdlc-xcjf .detail ul li:first-child span[data-v-e2d20012]{font-weight:700}.bdlc-xcjf .detail ul li[data-v-e2d20012]:last-child{border:0}.bdlc-xcjf .prement[data-v-e2d20012]{padding:0 .12rem}.bdlc-xcjf .prement h3[data-v-e2d20012]{color:#333;font-family:PingFang-SC-Bold;font-weight:700;font-size:.16rem;margin:.3rem 0 .07rem}.bdlc-xcjf .prement p[data-v-e2d20012]{font-family:PingFang-SC-Medium;font-size:.13rem;line-height:.24rem}.bdlc-xcjf .qwjf[data-v-e2d20012]{width:calc(100% - 2 * .57rem);background:#3da8f5;height:.46rem;border-radius:.23rem;margin:0 auto;text-align:center;font-size:.17rem;margin-top:.2rem}.bdlc-xcjf .qwjf span[data-v-e2d20012]{color:#fff;line-height:.45rem}","",{version:3,sources:["D:/vue-yxxt/src/pages/student/component/jfdt.vue"],names:[],mappings:"AACA,4BACE,eAAgB,AAChB,SAAU,AACV,MAAO,AACP,WAAY,AACZ,mBAAoB,AACpB,cAAe,AACf,mBAAqB,CACtB,AACD,iCACE,iBAAmB,AACnB,mBAAoB,AACpB,iBAAmB,CACpB,AACD,uCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,6BAA8B,AAC9B,iBAAmB,AACnB,gBAAkB,AAClB,yBAA6B,AAC7B,gBAAmB,CACpB,AACD,yCACE,SAAW,CACZ,AACD,wCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,+BAAgC,AAChC,gBAAkB,AAClB,WAAY,AACZ,oBAAuB,CACxB,AACD,0CACE,SAAW,CACZ,AACD,oCACE,iBAAmB,AACnB,eAAiB,CAClB,AACD,0CACE,+BAAgC,AAChC,WAAY,AACZ,iBAAmB,AACnB,cAAgB,AAChB,kBAAmB,AACnB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,kCAAqC,CACtC,AACD,+CACE,SAAW,CACZ,AACD,sDACE,iBAAmB,AACnB,4BAA8B,CAC/B,AACD,2DACE,eAAkB,CACnB,AACD,qDACE,QAAU,CACX,AACD,qCACE,gBAAmB,CACpB,AACD,wCACE,WAAY,AACZ,6BAA8B,AAC9B,gBAAkB,AAClB,iBAAmB,AACnB,qBAAyB,CAC1B,AACD,uCACE,+BAAgC,AAChC,iBAAmB,AACnB,kBAAqB,CACtB,AACD,kCACE,8BAAgC,AAChC,mBAAoB,AACpB,cAAgB,AAChB,qBAAuB,AACvB,cAAe,AACf,kBAAmB,AACnB,iBAAmB,AACnB,gBAAmB,CACpB,AACD,uCACE,WAAY,AACZ,kBAAqB,CACtB",file:"jfdt.vue",sourcesContent:["\n.bdlc-xcjf[data-v-e2d20012] {\n  position: fixed;\n  bottom: 0;\n  top: 0;\n  width: 100%;\n  background: #f7f7f7;\n  overflow: auto;\n  padding-bottom: 2rem;\n}\n.bdlc-xcjf .top[data-v-e2d20012] {\n  padding: 0 0.12rem;\n  background: #3fb4ff;\n  text-align: center;\n}\n.bdlc-xcjf .top .text[data-v-e2d20012] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-family: PingFang-SC-Bold;\n  font-size: 0.16rem;\n  font-weight: bold;\n  color: rgba(255,255,255,0.7);\n  padding: 0.14rem 0;\n}\n.bdlc-xcjf .top .text p[data-v-e2d20012] {\n  width: 50%;\n}\n.bdlc-xcjf .top .money[data-v-e2d20012] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-family: PingFang-SC-Medium;\n  font-size: 0.3rem;\n  color: #fff;\n  padding-bottom: 0.3rem;\n}\n.bdlc-xcjf .top .money p[data-v-e2d20012] {\n  width: 50%;\n}\n.bdlc-xcjf .detail[data-v-e2d20012] {\n  margin-top: 0.1rem;\n  background: #fff;\n}\n.bdlc-xcjf .detail ul li[data-v-e2d20012] {\n  font-family: PingFang-SC-Medium;\n  color: #333;\n  font-size: 0.13rem;\n  height: 0.44rem;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 0.01rem solid #f5f5f5;\n}\n.bdlc-xcjf .detail ul li span[data-v-e2d20012] {\n  width: 25%;\n}\n.bdlc-xcjf .detail ul li[data-v-e2d20012]:first-child {\n  font-size: 0.14rem;\n  font-family: PingFang-SC-Bold;\n}\n.bdlc-xcjf .detail ul li:first-child span[data-v-e2d20012] {\n  font-weight: bold;\n}\n.bdlc-xcjf .detail ul li[data-v-e2d20012]:last-child {\n  border: 0;\n}\n.bdlc-xcjf .prement[data-v-e2d20012] {\n  padding: 0 0.12rem;\n}\n.bdlc-xcjf .prement h3[data-v-e2d20012] {\n  color: #333;\n  font-family: PingFang-SC-Bold;\n  font-weight: bold;\n  font-size: 0.16rem;\n  margin: 0.3rem 0 0.07rem;\n}\n.bdlc-xcjf .prement p[data-v-e2d20012] {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.13rem;\n  line-height: 0.24rem;\n}\n.bdlc-xcjf .qwjf[data-v-e2d20012] {\n  width: calc(100% - 2 * 0.57rem);\n  background: #3da8f5;\n  height: 0.46rem;\n  border-radius: 0.23rem;\n  margin: 0 auto;\n  text-align: center;\n  font-size: 0.17rem;\n  margin-top: 0.2rem;\n}\n.bdlc-xcjf .qwjf span[data-v-e2d20012] {\n  color: #fff;\n  line-height: 0.45rem;\n}"],sourceRoot:""}])},1713:function(t,n,e){var a=e(1639);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(1323)("482ad13c",a,!0,{})},1797:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"bdlc-xcjf"},[e("div",{staticClass:"top"},[t._m(0),t._v(" "),e("div",{staticClass:"money"},[e("p",[t._v(t._s(t.total))]),t._v(" "),e("p",[t._v(t._s(t.yijiaoqian))])])]),t._v(" "),e("div",{staticClass:"detail"},[e("ul",[t._m(1),t._v(" "),t._l(t.info,function(n,a){return e("li",[e("span",[t._v(t._s(n.fymc))]),t._v(" "),e("span",[t._v(t._s(n.yjfy))]),t._v(" "),e("span",[t._v(t._s(n.yjje))]),t._v(" "),e("span",[t._v(t._s(n.qfje))])])})],2)]),t._v(" "),t._m(2)])},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"text"},[e("p",[t._v("应交金额（元）")]),t._v(" "),e("p",[t._v("已交金额（元）")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("li",[e("span",[t._v("费用名称")]),t._v(" "),e("span",[t._v("应交金额")]),t._v(" "),e("span",[t._v("已交金额")]),t._v(" "),e("span",[t._v("欠费金额")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"prement"},[e("h3",[t._v("新同学：你好！")]),t._v(" "),e("p",[e("span",{staticStyle:{display:"inline-block","text-indent":"2em"}},[t._v("欢迎加入重庆工商大学，当你看到本页面缴费数据后即可进行缴费,学校为你提供以下3种缴费方式:")]),t._v(" "),e("br"),t._v("\n\t\t\t\t1、按照入学须知要求，把学费打入指定银行卡，通过银行代扣；"),e("br"),t._v("\n\t\t\t\t2、网上自助缴费:"),e("br"),t._v("\n\t\t\t\t（1）关注“重庆工商大学财务处”公众号，通过微信缴费"),e("br"),t._v("\n\t\t\t\t（2）登录学校门户（网址：http://portal.ctbu.edu.cn）进入“财务系统”中的“统一支付平台”自主进行网上缴费，支付方式有银联卡支付、微信支付两种方式；"),e("br"),t._v("\n\t\t\t\t3、到校后到指定地点缴费（费时费力，不推荐）。"),e("br"),t._v("\n\t\t\t\t注：新生编学号后就有正式帐户了，用户名为学号，密码统一为ctbu+身份证后六位(如 ctbu123456)\n\t    \t")])])}]}},308:function(t,n,e){"use strict";var a=e(8),i=e(9);a.default.use(i.a);var A=new i.a.Store({state:{user:"",hjid:"",qsxx:"",wsxxPage1:"",wsxxPage2:"",wsxxPage3:"",getWsxxData:""},mutations:{SetUserInfo:function(t,n){t.user=n},saveTime:function(t,n){t.pickerValue=n},savewsxxPage1:function(t,n){t.wsxxPage1=n},savewsxxPage2:function(t,n){t.wsxxPage2=n},savehjid:function(t,n){t.hjid=n},saveqsxx:function(t,n){t.qsxx=n},saveWsxxDate:function(t,n){t.getWsxxData=n}},actions:{},getters:{getHjid:function(t){return t.hjid},getqsxx:function(t){return t.qsxx},getuser:function(t){return t.user}}});n.a=A},520:function(t,n,e){function a(t){e(1713)}var i=e(4)(e(1496),e(1797),a,"data-v-e2d20012",null);t.exports=i.exports}});
//# sourceMappingURL=41.807d470a562978bb8562.js.map