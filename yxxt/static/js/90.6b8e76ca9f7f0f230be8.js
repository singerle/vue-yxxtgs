webpackJsonp([90],{1344:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"",data:function(){return{}},methods:{close:function(){this.$emit("close")},comform:function(){this.$emit("comform")}}}},1347:function(n,t,e){t=n.exports=e(1322)(!0),t.push([n.i,".wrappopu[data-v-173547b3]{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:999;top:0;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;height:100%;background:rgba(0,0,0,.1)}.wrappopu .content[data-v-173547b3]{opacity:1;border-radius:.1rem;width:calc(100% - 1.06rem)}.wrappopu .content .title[data-v-173547b3]{padding:.1rem 0;background:#fff;font-weight:700!important;text-align:center}.wrappopu .content .top[data-v-173547b3]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:1.19rem;background:#fff}.wrappopu .content .top p[data-v-173547b3]{width:1.6rem;font-size:.14rem;font-family:PingFang-SC-Medium;color:#000;line-height:.25rem;text-align:center}.wrappopu .content .top h3[data-v-173547b3]{font-family:PingFang-SC-Bold;font-weight:700;color:#000;font-size:.17rem;margin-bottom:.15rem}.wrappopu .content .bottom[data-v-173547b3]{height:.44rem;background:#55b2f5;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.wrappopu .content .bottom p[data-v-173547b3]{font-size:.15rem;font-family:PingFang-SC-Medium;color:#fff;line-height:.15rem;text-align:center}","",{version:3,sources:["D:/vue-yxxt/src/pages/student/component/common/popup.vue"],names:[],mappings:"AACA,2BACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,eAAgB,AAChB,YAAa,AACb,MAAO,AACP,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,WAAY,AACZ,YAAa,AACb,yBAA4B,CAC7B,AACD,oCACE,UAAW,AACX,oBAAsB,AACtB,0BAA4B,CAC7B,AACD,2CACE,gBAAkB,AAClB,gBAAiB,AACjB,0BAA6B,AAC7B,iBAAmB,CACpB,AACD,yCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,eAAgB,AAChB,eAAiB,CAClB,AACD,2CACE,aAAc,AACd,iBAAmB,AACnB,+BAAgC,AAChC,WAAY,AACZ,mBAAqB,AACrB,iBAAmB,CACpB,AACD,4CACE,6BAA8B,AAC9B,gBAAkB,AAClB,WAAY,AACZ,iBAAmB,AACnB,oBAAuB,CACxB,AACD,4CACE,cAAgB,AAChB,mBAAoB,AACpB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CAC7B,AACD,8CACE,iBAAmB,AACnB,+BAAgC,AAChC,WAAY,AACZ,mBAAqB,AACrB,iBAAmB,CACpB",file:"popup.vue",sourcesContent:["\n.wrappopu[data-v-173547b3] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  z-index: 999;\n  top: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.1);\n}\n.wrappopu .content[data-v-173547b3] {\n  opacity: 1;\n  border-radius: 0.1rem;\n  width: calc(100% - 1.06rem);\n}\n.wrappopu .content .title[data-v-173547b3] {\n  padding: 0.1rem 0;\n  background: #fff;\n  font-weight: bold !important;\n  text-align: center;\n}\n.wrappopu .content .top[data-v-173547b3] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 1.19rem;\n  background: #fff;\n}\n.wrappopu .content .top p[data-v-173547b3] {\n  width: 1.6rem;\n  font-size: 0.14rem;\n  font-family: PingFang-SC-Medium;\n  color: #000;\n  line-height: 0.25rem;\n  text-align: center;\n}\n.wrappopu .content .top h3[data-v-173547b3] {\n  font-family: PingFang-SC-Bold;\n  font-weight: bold;\n  color: #000;\n  font-size: 0.17rem;\n  margin-bottom: 0.15rem;\n}\n.wrappopu .content .bottom[data-v-173547b3] {\n  height: 0.44rem;\n  background: #55b2f5;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.wrappopu .content .bottom p[data-v-173547b3] {\n  font-size: 0.15rem;\n  font-family: PingFang-SC-Medium;\n  color: #fff;\n  line-height: 0.15rem;\n  text-align: center;\n}"],sourceRoot:""}])},1349:function(n,t,e){var A=e(1347);"string"==typeof A&&(A=[[n.i,A,""]]),A.locals&&(n.exports=A.locals);e(1323)("341fea97",A,!0,{})},1353:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"wrappopu",on:{click:n.close}},[e("div",{staticClass:"content",on:{click:function(n){n.stopPropagation()}}},[e("div",{staticClass:"top"},[e("div",{staticClass:"title"},[n._t("title")],2),n._v(" "),n._t("top")],2),n._v(" "),e("div",{staticClass:"bottom",on:{click:n.comform}},[n._t("bottom")],2)])])},staticRenderFns:[]}},478:function(n,t,e){function A(n){e(1349)}var o=e(4)(e(1344),e(1353),A,"data-v-173547b3",null);n.exports=o.exports}});
//# sourceMappingURL=90.6b8e76ca9f7f0f230be8.js.map