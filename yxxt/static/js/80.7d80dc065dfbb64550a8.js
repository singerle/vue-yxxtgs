webpackJsonp([80],{1379:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(16),a=n.n(o),A=n(9);t.default={props:{page:{type:String,default:function(){return{newpage:"addedNews"}}},headerTitle:{type:Object,default:function(){return{title:"新闻公式",button:"新增"}}}},methods:a()({toPage:function(){this._setId(""),this.$router.push({path:this.page}),this.$store.commit("newsState",1)},toPage1:function(){this._setId(""),this.$router.push({path:this.page})}},n.i(A.c)({_setId:"SET_NEWS_ID"}))}},1434:function(e,t,n){t=e.exports=n(1322)(!0),t.push([e.i,".header-wrap[data-v-f4f6eb0c]{width:100%;height:49px;line-height:50px;font-size:14px;border-bottom:1px solid #2184c5;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.header-wrap p[data-v-f4f6eb0c]{color:#555;font-weight:700;font-family:MicrosoftYaHei-Bold}.header-wrap .button[data-v-f4f6eb0c]{height:26px;width:82px;line-height:2px;color:#2184c5;background-color:transparent;font-family:FZLTZCHK--GBK1-0;font-weight:Regular}.header-wrap .button[data-v-f4f6eb0c]:hover{color:#fff;background-color:#2184c5}","",{version:3,sources:["D:/vue-yxxt/src/pages/yxCms/view/newsPublicity/header.vue"],names:[],mappings:"AACA,8BACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,eAAgB,AAChB,gCAAiC,AACjC,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,6BAA+B,CACxC,AACD,gCACE,WAAY,AACZ,gBAAkB,AAClB,+BAAiC,CAClC,AACD,sCACE,YAAa,AACb,WAAY,AACZ,gBAAiB,AACjB,cAAe,AACf,6BAA8B,AAC9B,6BAA8B,AAC9B,mBAAqB,CACtB,AACD,4CACE,WAAY,AACZ,wBAA0B,CAC3B",file:"header.vue",sourcesContent:["\n.header-wrap[data-v-f4f6eb0c] {\n  width: 100%;\n  height: 49px;\n  line-height: 50px;\n  font-size: 14px;\n  border-bottom: 1px solid #2184c5;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.header-wrap p[data-v-f4f6eb0c] {\n  color: #555;\n  font-weight: bold;\n  font-family: MicrosoftYaHei-Bold;\n}\n.header-wrap .button[data-v-f4f6eb0c] {\n  height: 26px;\n  width: 82px;\n  line-height: 2px;\n  color: #2184c5;\n  background-color: transparent;\n  font-family: FZLTZCHK--GBK1-0;\n  font-weight: Regular;\n}\n.header-wrap .button[data-v-f4f6eb0c]:hover {\n  color: #fff;\n  background-color: #2184c5;\n}"],sourceRoot:""}])},1454:function(e,t,n){var o=n(1434);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(1323)("12da316a",o,!0,{})},1476:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header-wrap"},[n("p",[e._v(e._s(e.headerTitle.title))]),e._v(" "),n("el-row",[n("el-button",{staticClass:"button",attrs:{type:"primary",plain:""},on:{click:function(t){e.toPage()}}},[e._v(e._s(e.headerTitle.button))])],1)],1)},staticRenderFns:[]}},488:function(e,t,n){function o(e){n(1454)}var a=n(4)(n(1379),n(1476),o,"data-v-f4f6eb0c",null);e.exports=a.exports}});
//# sourceMappingURL=80.7d80dc065dfbb64550a8.js.map