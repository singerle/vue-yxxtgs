webpackJsonp([31],{1325:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var a=n(36),r=n.n(a),o=n(90),i=n.n(o),A=n(1326),s=function(e,t){var a=i()({},t);return new r.a(function(t){n.i(A.a)({headers:{"Content-Type":"multipart/form-data"},method:"post",url:window.REQUEST_URL+e,params:a}).then(function(e){t(e.data)})})}},1326:function(e,t,n){"use strict";var a=n(36),r=n.n(a),o=n(89),i=n.n(o),A=n(308),s=i.a.create({baseURL:n.i({NODE_ENV:"production"}).BASE_API,timeout:1e4});s.interceptors.request.use(function(e){return e.headers.token=A.a.getters.getuser.userid,e},function(e){r.a.reject(e)}),t.a=s},1329:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n(1325),r=function(e){return n.i(a.a)("/studentManage/completeProcess",e)}},1393:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return o}),n.d(t,"d",function(){return i}),n.d(t,"c",function(){return A});var a=n(1325),r=function(e){return n.i(a.a)("student/aqzscs",e)},o=function(e){return n.i(a.a)("student/aqcstj",e)},i=function(e){return n.i(a.a)("student/wjdc",e)},A=function(e){return n.i(a.a)("student/wjdctj",e)}},1501:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1329),r=n(1393),o={},i=["A","B","C","D","E","F","G","H","I","J","K"];t.default={name:"aqzscs",data:function(){return{num:0,pageShow:!0,errorShow:"",bottomShow:"",replayShow:"",flag:!0,second:3,completeShow:!1,countFalse:0,info:"",jg:""}},methods:{compare:function(e,t){var A=this,s=this.info[this.num],c=s.options[i.indexOf(s.key.toUpperCase())];if(c.text===e.text)c.yes=1,void 0==this.info[this.num+1]?(this.completeShow=!0,n.i(r.a)({zq:this.info.length-this.countFalse,cw:this.countFalse,id:"1"}).then(function(e){"40001"===e.code&&n.i(a.a)({pauId:A.$store.getters.getHjid})})):setTimeout(function(){A.num++},500);else{void 0===o[this.num]&&(o[this.num]=this.countFalse+1,this.countFalse++),e.no=1,c.yes=1,this.flag=!1,this.errorShow=!0,this.bottomShow=!0,this.pageShow=!1;var l=setInterval(function(){--A.second<=0&&(A.second=0,A.replayShow=!0,A.bottomShow=!1,clearInterval(l),A.second=3)},1e3)}},replay:function(){this.errorShow=!1,this.flag=!0,this.pageShow=!0,this.bottomShow=!1,this.replayShow=!1;for(var e=this.info[this.num].options,t=0;t<e.length;t++)e[t].yes="",e[t].no=""},getData:function(){var e=this;n.i(r.b)().then(function(t){"40001"===t.code&&(e.info=t.content.tk,e.jg=t.content.jg,null===e.jg?e.completeShow=!1:(e.completeShow=!0,e.countFalse=e.jg.cw))})}},created:function(){this.getData()}}},1601:function(e,t,n){t=e.exports=n(1322)(!0),t.push([e.i,".wrap[data-v-4ecbce48]{position:fixed;background:#f7f7f7;width:100%;top:0;bottom:0;border-top:.01rem solid #e9e9e9}.wrap .contents[data-v-4ecbce48]{padding:0 .12rem .16rem;background:#f7f7f7}.wrap .contents .title[data-v-4ecbce48]{font-size:.17rem;line-height:.3rem;color:#333;font-family:PingFang-SC-Bold;padding:.13rem 0 .1rem}.wrap .contents ul li[data-v-4ecbce48]{height:.48rem;font-size:.17rem;display:-webkit-box;display:-ms-flexbox;display:flex}.wrap .contents ul li .option-ico[data-v-4ecbce48]{position:relative;margin:0 .15rem 0 .2rem;width:.18rem;height:.18rem}.wrap .contents ul li .option-ico .noselect[data-v-4ecbce48]{position:absolute;display:block;width:.16rem;height:.16rem;border-radius:50%;border:.01rem solid #ccc9c9}.wrap .contents ul li .option-ico .error[data-v-4ecbce48],.wrap .contents ul li .option-ico .right[data-v-4ecbce48]{position:absolute}.wrap .contents ul li .option-ico .errorpic[data-v-4ecbce48]{width:.18rem;height:.18rem}.wrap .bottom[data-v-4ecbce48]{position:fixed;bottom:0;background:#fff;width:100%}.wrap .bottom .showPage[data-v-4ecbce48]{width:100%;height:.2rem;font-size:.1rem;font-family:PingFang-SC-Medium;color:#333;line-height:.2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.wrap .error .wrap-key[data-v-4ecbce48]{width:calc(100% - .24rem);margin-left:.12rem;color:#333;font-size:.17rem;font-family:PingFang SC}.wrap .error .wrap-key .key[data-v-4ecbce48]{height:.56rem;line-height:.56rem;border-bottom:.01rem solid #ececec}.wrap .error .wrap-key .jieshi[data-v-4ecbce48]{line-height:.31rem;padding-top:.13rem;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.wrap .error .wrap-key .jieshi .text[data-v-4ecbce48]{width:calc(100% - .6rem)}.wrap .error .bottom[data-v-4ecbce48]{position:fixed;bottom:.1rem;width:calc(100% - .24rem);margin-left:.11rem;height:.46rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:.06rem;border:.01rem solid #cfcfcf}.wrap .error .bottom .tip[data-v-4ecbce48]{color:#999;font-size:.17rem;font-family:PingFang-SC-Medium}.wrap .error .replay[data-v-4ecbce48]{position:fixed;bottom:.1rem;width:calc(100% - .24rem);margin-left:.11rem;height:.46rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:.06rem;-webkit-box-shadow:.01rem .01rem .02rem rgba(85,178,245,.5);box-shadow:.01rem .01rem .02rem rgba(85,178,245,.5);background:#3da8f5}.wrap .error .replay .tip[data-v-4ecbce48]{font-size:.17rem;font-family:PingFang-SC-Medium;color:#fff}.wrap .completePage[data-v-4ecbce48]{position:fixed;background:#f7f7f7;width:100%;top:0;bottom:0;border-top:.01rem solid #e9e9e9;text-align:center;font-size:.17rem;z-index:999999}.wrap .completePage img[data-v-4ecbce48]{display:block;margin:.84rem auto .45rem;width:1rem;height:1rem}.wrap .completePage p[data-v-4ecbce48]{color:#333;line-height:.17rem}.wrap .completePage p[data-v-4ecbce48]:first-of-type{font-family:PingFang-SC-Medium}.wrap .completePage p[data-v-4ecbce48]:nth-of-type(2){font-family:PingFang SC;margin:.15rem 0 .45rem}.wrap .completePage p:nth-of-type(2) .green[data-v-4ecbce48]{color:#00b90c}.wrap .completePage p:nth-of-type(2) .red[data-v-4ecbce48]{color:#fe4124}.wrap .completePage .return[data-v-4ecbce48]{width:calc(100% - 2 * .57rem);background:#3da8f5;height:.46rem;border-radius:.23rem;margin:0 auto}.wrap .completePage .return span[data-v-4ecbce48]{color:#fff;line-height:.45rem}","",{version:3,sources:["D:/vue-yxxt/src/pages/student/component/rxzb/aqzscs/rxzb-aqzscs.vue"],names:[],mappings:"AACA,uBACE,eAAgB,AAChB,mBAAoB,AACpB,WAAY,AACZ,MAAO,AACP,SAAU,AACV,+BAAkC,CACnC,AACD,iCACE,wBAA2B,AAC3B,kBAAoB,CACrB,AACD,wCACE,iBAAmB,AACnB,kBAAoB,AACpB,WAAY,AACZ,6BAA8B,AAC9B,sBAA0B,CAC3B,AACD,uCACE,cAAgB,AAChB,iBAAmB,AACnB,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CACf,AACD,mDACE,kBAAmB,AACnB,wBAA2B,AAC3B,aAAe,AACf,aAAgB,CACjB,AACD,6DACE,kBAAmB,AACnB,cAAe,AACf,aAAe,AACf,cAAgB,AAChB,kBAAmB,AACnB,2BAA8B,CAC/B,AAID,oHACE,iBAAmB,CACpB,AACD,6DACE,aAAe,AACf,aAAgB,CACjB,AACD,+BACE,eAAgB,AAChB,SAAU,AACV,gBAAiB,AACjB,UAAY,CACb,AACD,yCACE,WAAY,AACZ,aAAe,AACf,gBAAkB,AAClB,+BAAgC,AAChC,WAAY,AACZ,kBAAoB,AACpB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CACjC,AACD,wCACE,0BAA4B,AAC5B,mBAAqB,AACrB,WAAY,AACZ,iBAAmB,AACnB,uBAAyB,CAC1B,AACD,6CACE,cAAgB,AAChB,mBAAqB,AACrB,kCAAqC,CACtC,AACD,gDACE,mBAAqB,AACrB,mBAAqB,AACrB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,cAAgB,CACrB,AACD,sDACE,wBAA2B,CAC5B,AACD,sCACE,eAAgB,AAChB,aAAe,AACf,0BAA4B,AAC5B,mBAAqB,AACrB,cAAgB,AAChB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,qBAAuB,AACvB,2BAA8B,CAC/B,AACD,2CACE,WAAY,AACZ,iBAAmB,AACnB,8BAAgC,CACjC,AACD,sCACE,eAAgB,AAChB,aAAe,AACf,0BAA4B,AAC5B,mBAAqB,AACrB,cAAgB,AAChB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,qBAAuB,AACvB,4DAAiE,AACzD,oDAAyD,AACjE,kBAAoB,CACrB,AACD,2CACE,iBAAmB,AACnB,+BAAgC,AAChC,UAAY,CACb,AACD,qCACE,eAAgB,AAChB,mBAAoB,AACpB,WAAY,AACZ,MAAO,AACP,SAAU,AACV,gCAAkC,AAClC,kBAAmB,AACnB,iBAAmB,AACnB,cAAgB,CACjB,AACD,yCACE,cAAe,AACf,0BAA6B,AAC7B,WAAY,AACZ,WAAa,CACd,AACD,uCACE,WAAY,AACZ,kBAAqB,CACtB,AACD,qDACE,8BAAgC,CACjC,AACD,sDACE,wBAAyB,AACzB,sBAA0B,CAC3B,AACD,6DACE,aAAe,CAChB,AACD,2DACE,aAAe,CAChB,AACD,6CACE,8BAAgC,AAChC,mBAAoB,AACpB,cAAgB,AAChB,qBAAuB,AACvB,aAAe,CAChB,AACD,kDACE,WAAY,AACZ,kBAAqB,CACtB",file:"rxzb-aqzscs.vue",sourcesContent:["\n.wrap[data-v-4ecbce48] {\n  position: fixed;\n  background: #f7f7f7;\n  width: 100%;\n  top: 0;\n  bottom: 0;\n  border-top: 0.01rem solid #e9e9e9;\n}\n.wrap .contents[data-v-4ecbce48] {\n  padding: 0 0.12rem 0.16rem;\n  background: #f7f7f7;\n}\n.wrap .contents .title[data-v-4ecbce48] {\n  font-size: 0.17rem;\n  line-height: 0.3rem;\n  color: #333;\n  font-family: PingFang-SC-Bold;\n  padding: 0.13rem 0 0.1rem;\n}\n.wrap .contents ul li[data-v-4ecbce48] {\n  height: 0.48rem;\n  font-size: 0.17rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.wrap .contents ul li .option-ico[data-v-4ecbce48] {\n  position: relative;\n  margin: 0 0.15rem 0 0.2rem;\n  width: 0.18rem;\n  height: 0.18rem;\n}\n.wrap .contents ul li .option-ico .noselect[data-v-4ecbce48] {\n  position: absolute;\n  display: block;\n  width: 0.16rem;\n  height: 0.16rem;\n  border-radius: 50%;\n  border: 0.01rem solid #ccc9c9;\n}\n.wrap .contents ul li .option-ico .error[data-v-4ecbce48] {\n  position: absolute;\n}\n.wrap .contents ul li .option-ico .right[data-v-4ecbce48] {\n  position: absolute;\n}\n.wrap .contents ul li .option-ico .errorpic[data-v-4ecbce48] {\n  width: 0.18rem;\n  height: 0.18rem;\n}\n.wrap .bottom[data-v-4ecbce48] {\n  position: fixed;\n  bottom: 0;\n  background: #fff;\n  width: 100%;\n}\n.wrap .bottom .showPage[data-v-4ecbce48] {\n  width: 100%;\n  height: 0.2rem;\n  font-size: 0.1rem;\n  font-family: PingFang-SC-Medium;\n  color: #333;\n  line-height: 0.2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.wrap .error .wrap-key[data-v-4ecbce48] {\n  width: calc(100% - 0.24rem);\n  margin-left: 0.12rem;\n  color: #333;\n  font-size: 0.17rem;\n  font-family: PingFang SC;\n}\n.wrap .error .wrap-key .key[data-v-4ecbce48] {\n  height: 0.56rem;\n  line-height: 0.56rem;\n  border-bottom: 0.01rem solid #ececec;\n}\n.wrap .error .wrap-key .jieshi[data-v-4ecbce48] {\n  line-height: 0.31rem;\n  padding-top: 0.13rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.wrap .error .wrap-key .jieshi .text[data-v-4ecbce48] {\n  width: calc(100% - 0.6rem);\n}\n.wrap .error .bottom[data-v-4ecbce48] {\n  position: fixed;\n  bottom: 0.1rem;\n  width: calc(100% - 0.24rem);\n  margin-left: 0.11rem;\n  height: 0.46rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 0.06rem;\n  border: 0.01rem solid #cfcfcf;\n}\n.wrap .error .bottom .tip[data-v-4ecbce48] {\n  color: #999;\n  font-size: 0.17rem;\n  font-family: PingFang-SC-Medium;\n}\n.wrap .error .replay[data-v-4ecbce48] {\n  position: fixed;\n  bottom: 0.1rem;\n  width: calc(100% - 0.24rem);\n  margin-left: 0.11rem;\n  height: 0.46rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 0.06rem;\n  -webkit-box-shadow: 0.01rem 0.01rem 0.02rem rgba(85,178,245,0.5);\n          box-shadow: 0.01rem 0.01rem 0.02rem rgba(85,178,245,0.5);\n  background: #3da8f5;\n}\n.wrap .error .replay .tip[data-v-4ecbce48] {\n  font-size: 0.17rem;\n  font-family: PingFang-SC-Medium;\n  color: #fff;\n}\n.wrap .completePage[data-v-4ecbce48] {\n  position: fixed;\n  background: #f7f7f7;\n  width: 100%;\n  top: 0;\n  bottom: 0;\n  border-top: 0.01rem solid #e9e9e9;\n  text-align: center;\n  font-size: 0.17rem;\n  z-index: 999999;\n}\n.wrap .completePage img[data-v-4ecbce48] {\n  display: block;\n  margin: 0.84rem auto 0.45rem;\n  width: 1rem;\n  height: 1rem;\n}\n.wrap .completePage p[data-v-4ecbce48] {\n  color: #333;\n  line-height: 0.17rem;\n}\n.wrap .completePage p[data-v-4ecbce48]:nth-of-type(1) {\n  font-family: PingFang-SC-Medium;\n}\n.wrap .completePage p[data-v-4ecbce48]:nth-of-type(2) {\n  font-family: PingFang SC;\n  margin: 0.15rem 0 0.45rem;\n}\n.wrap .completePage p:nth-of-type(2) .green[data-v-4ecbce48] {\n  color: #00b90c;\n}\n.wrap .completePage p:nth-of-type(2) .red[data-v-4ecbce48] {\n  color: #fe4124;\n}\n.wrap .completePage .return[data-v-4ecbce48] {\n  width: calc(100% - 2 * 0.57rem);\n  background: #3da8f5;\n  height: 0.46rem;\n  border-radius: 0.23rem;\n  margin: 0 auto;\n}\n.wrap .completePage .return span[data-v-4ecbce48] {\n  color: #fff;\n  line-height: 0.45rem;\n}"],sourceRoot:""}])},1675:function(e,t,n){var a=n(1601);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(1323)("7675ee3a",a,!0,{})},1759:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.info[e.num]&&e.info[e.num].title?n("div",{staticClass:"wrap",style:e.errorShow?"background:#fff":"background:#f7f7f7"},[e.completeShow?e._e():n("div",{staticClass:"contents"},[n("h3",{staticClass:"title"},[e._v(e._s(e.num+1+"."+e.info[e.num].title))]),e._v(" "),n("ul",e._l(e.info[e.num].options,function(t,a){return"null"!=t.text&&null!=t.text?n("li",{on:{click:function(n){e.flag&&e.compare(t,a)}}},[n("div",{staticClass:"option-ico"},[n("div",{staticClass:"noselect"}),e._v(" "),n("img",{directives:[{name:"show",rawName:"v-show",value:t.no,expression:"item.no"}],staticClass:"error errorpic",attrs:{src:"static/student-index-pictures/no.png"}}),e._v(" "),n("img",{directives:[{name:"show",rawName:"v-show",value:t.yes,expression:"item.yes"}],staticClass:"right errorpic",attrs:{src:"static/student-index-pictures/yes.png"}})]),e._v(" "),n("span",{staticClass:"value"},[e._v(e._s(t.text))])]):e._e()}))]),e._v(" "),e.completeShow?e._e():n("div",{directives:[{name:"show",rawName:"v-show",value:e.pageShow,expression:"pageShow"}],staticClass:"bottom"},[n("p",{staticClass:"showPage"},[n("span",{staticClass:"currentPage"},[e._v(e._s(e.num+1))]),e._v("/"),n("span",{staticClass:"totalPage"},[e._v(e._s(e.info.length))])])]),e._v(" "),e.completeShow?e._e():n("div",{directives:[{name:"show",rawName:"v-show",value:e.errorShow,expression:"errorShow"}],staticClass:"error"},[n("div",{staticClass:"wrap-key"},[n("p",{staticClass:"key"},[e._v("答案："),n("span",[e._v(e._s(e.info[e.num].key))])]),e._v(" "),n("div",{staticClass:"jieshi"},[n("span",[e._v("解释：")]),n("p",{staticClass:"text"},[e._v(e._s(e.info[e.num].answer))])])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.bottomShow,expression:"bottomShow"}],staticClass:"bottom"},[n("span",{staticClass:"tip"},[e._v(e._s(e.second)+"s可重做")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.replayShow,expression:"replayShow"}],staticClass:"replay",on:{click:e.replay}},[n("span",{staticClass:"tip"},[e._v("重做")])])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.completeShow,expression:"completeShow"}],staticClass:"completePage"},[n("img",{attrs:{src:"static/student-index-pictures/rxzb-aqzscs-complete.png"}}),e._v(" "),n("p",[e._v("恭喜您 完成 安全知识测试  项目")]),e._v(" "),n("p",[e._v("共 "),n("span",[e._v(e._s(e.info.length))]),e._v(" 题 "),n("span",{staticClass:"green"},[e._v("正确")]),n("span",{staticClass:"correctNum"},[e._v(e._s(e.info.length-e.countFalse))]),e._v("题 "),n("span",{staticClass:"red"},[e._v("错误")]),n("span",{staticClass:"errorNum"},[e._v(e._s(e.countFalse))]),e._v("题\n\t\t")]),e._v(" "),n("router-link",{attrs:{to:"/index"}},[n("div",{staticClass:"return"},[n("span",[e._v("返回首页")])])])],1)]):e._e()},staticRenderFns:[]}},308:function(e,t,n){"use strict";var a=n(8),r=n(9);a.default.use(r.a);var o=new r.a.Store({state:{user:"",hjid:"",qsxx:"",wsxxPage1:"",wsxxPage2:"",wsxxPage3:"",getWsxxData:""},mutations:{SetUserInfo:function(e,t){e.user=t},saveTime:function(e,t){e.pickerValue=t},savewsxxPage1:function(e,t){e.wsxxPage1=t},savewsxxPage2:function(e,t){e.wsxxPage2=t},savehjid:function(e,t){e.hjid=t},saveqsxx:function(e,t){e.qsxx=t},saveWsxxDate:function(e,t){e.getWsxxData=t}},actions:{},getters:{getHjid:function(e){return e.hjid},getqsxx:function(e){return e.qsxx},getuser:function(e){return e.user}}});t.a=o},524:function(e,t,n){function a(e){n(1675)}var r=n(4)(n(1501),n(1759),a,"data-v-4ecbce48",null);e.exports=r.exports}});
//# sourceMappingURL=31.dbe8a1cf21ea17b61047.js.map