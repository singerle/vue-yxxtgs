webpackJsonp([63],{1327:function(t,e,a){"use strict";function n(t,e,n,i){var o={enrollYear:t,state:e,pageNum:n,pageSize:i};o=L.a.stringify(o);var r=$.a+"/enroll/configuration/listByConditions";return a.i(k.a)({url:r,method:"post",data:o})}function i(){var t=$.a+"/enroll/configuration/getAllEnrollYear";return a.i(k.a)({url:t,method:"post"})}function o(t){return t<10?"0"+t:t}function r(t){var e=new Date(t),a=e.getFullYear(),n=e.getMonth()+1,i=e.getDate(),r=e.getHours(),l=e.getMinutes(),s=e.getSeconds();return a+"-"+o(n)+"-"+o(i)+" "+o(r)+":"+o(l)+":"+o(s)}function l(t){t.beginTime=r(t.beginTime),t.endTime=r(t.endTime),t.originType=t.originType.join(","),t=L.a.stringify(t);var e=$.a+"/enroll/configuration/insertSelective";return a.i(k.a)({url:e,method:"post",data:t})}function s(t){t.beginTime=r(t.beginTime),t.endTime=r(t.endTime),t.originType=t.originType.join(","),t=L.a.stringify(t);var e=$.a+"/enroll/configuration/update";return a.i(k.a)({url:e,method:"post",data:t})}function c(t,e){var n={enrollLogicId:t,state:e},i=$.a+"/enroll/configuration/stateChange";return n=L.a.stringify(n),a.i(k.a)({url:i,method:"post",data:n})}function u(t){var e={enrollLogicId:t},n=$.a+"/enroll/configuration/delete";return e=L.a.stringify(e),a.i(k.a)({url:n,method:"post",data:e})}function d(t,e){var n={enrollId:t,taskType:e};n=L.a.stringify(n);var i=$.a+"/enroll/enrollAndApplication/listByEnrolmentAllocation";return a.i(k.a)({url:i,method:"post",data:n})}function p(t,e){var n={enrollId:t,taskType:e};n=L.a.stringify(n);var i=$.a+"/enroll/sceneAndApplication/listByEnrolmentAllocation";return a.i(k.a)({url:i,method:"post",data:n})}function f(t,e){var n={enrollId:t,type:e};n=L.a.stringify(n);var i=$.a+"/enroll/applicationBasic/listConfigure";return a.i(k.a)({url:i,method:"post",data:n})}function h(t,e,n){var i={enrollName:t,applicationId:e,enrollId:n};i=L.a.stringify(i);var o=$.a+"/enroll/enrollAndApplication/add";return a.i(k.a)({url:o,method:"post",data:i})}function g(t,e,n){var i={applicationName:t,applicationId:e,enrollId:n};i=L.a.stringify(i);var o=$.a+"/enroll/sceneAndApplication/add";return a.i(k.a)({url:o,method:"post",data:i})}function m(t){var e={eaaLogicId:t};e=L.a.stringify(e);var n=$.a+"/enroll/enrollAndApplication/delete";return a.i(k.a)({url:n,method:"post",data:e})}function v(t){var e={saaLogicId:t};e=L.a.stringify(e);var n=$.a+"/enroll/sceneAndApplication/delete";return a.i(k.a)({url:n,method:"post",data:e})}function y(t){var e={eaaLogicId:t};e=L.a.stringify(e);var n=$.a+"/enroll/enrollAndApplication/selectById";return a.i(k.a)({url:n,method:"post",data:e})}function b(t){var e={saaLogicId:t};e=L.a.stringify(e);var n=$.a+"/enroll/sceneAndApplication/selectById";return a.i(k.a)({url:n,method:"post",data:e})}function A(t,e,n,i,o,r,l){var s={eaaLogicId:t,enrollName:e,eaaRevoke:n,type:i,bulletinLogicId:o,bulletinTitle:r,bulletinText:l};s=L.a.stringify(s);var c=$.a+"/enroll/enrollAndApplication/updateApplication";return a.i(k.a)({url:c,method:"post",data:s})}function _(t,e,n,i,o,r,l){var s={saaId:t,applicationName:e,eaaRevoke:n,type:i,bulletinLogicId:o,bulletinTitle:r,bulletinText:l};s=L.a.stringify(s);var c=$.a+"/enroll/sceneAndApplication/updateApplication";return a.i(k.a)({url:c,method:"post",data:s})}function x(t,e){var n={enrollId:t,type:e},i=$.a+"/enroll/processLevel/info";return n=L.a.stringify(n),a.i(k.a)({url:i,method:"post",data:n})}function B(t,e,n){var i={enrollId:t,type:e,hierarchy:n};i=L.a.stringify(i);var o=$.a+"/enroll//processLevel/save";return a.i(k.a)({data:i,url:o,method:"post"})}function w(t,e,n,i){var o={eaaId:t,bulletinUrl:e,bulletinTitle:n,bulletinText:i};o=L.a.stringify(o);var r=$.a+"/enroll/bulletin/add";return a.i(k.a)({method:"post",url:r,data:o})}function I(t){var e={bulletinLogicId:t};e=L.a.stringify(e);var n=$.a+"/enroll/bulletin/selectById";return a.i(k.a)({method:"post",url:n,data:e})}function C(t,e,n,i){var o={bulletinLogicId:t,bulletinUrl:e,bulletinTitle:n,bulletinText:i};o=L.a.stringify(o);var r=$.a+"/enroll/bulletin/update";return a.i(k.a)({method:"post",url:r,data:o})}function S(t,e){var n={eaaId:t,showRange:e};n=L.a.stringify(n);var i=$.a+"/enroll/bulletin/showRange";return a.i(k.a)({method:"post",url:i,data:n})}e.t=n,e.u=i,e.v=l,e.w=s,e.s=c,e.r=u,e.g=d,e.h=p,e.m=f,e.k=h,e.l=g,e.i=m,e.j=v,e.e=y,e.f=b,e.c=A,e.d=_,e.a=x,e.b=B,e.o=w,e.p=I,e.q=C,e.n=S;var k=a(200),T=a(201),L=a.n(T),$=a(199)},1542:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(16),i=a.n(n),o=a(1327),r=a(9);e.default={data:function(){return{stateBtn:"",yearBtn:"全部年限",allStateBtn:["全部状态","启用中","进行中","测试中","尚未启用","已结束"],allYearBtn:[],page:1,size:10,total:10,tableData:[]}},methods:{change:function(){this._fetchProcessList()},add:function(){this.$router.push({path:"addProcess"}),this.$store.commit("processItem","")},edit:function(t){this.$router.push({path:"addProcess"}),this.$store.commit("processItem",t)},handleCurrentChange:function(t){this._fetchProcessList()},ruxueConfig:function(t){this.$router.push({path:"ruxue"}),this.$store.commit("ruxueItem",t),this.$store.commit("ruxueSiteState",1)},viewruxue:function(t){this.$store.commit("ruxueItem",t),this.$store.commit("ruxueSiteState",2),this.$router.push({path:"ruxue"})},siteConfig:function(t){this.$store.commit("ruxueItem",t),this.$store.commit("ruxueSiteState",3),this.$router.push({path:"ruxue"})},viewSite:function(t){this.$store.commit("ruxueItem",t),this.$store.commit("ruxueSiteState",4),this.$router.push({path:"ruxue"})},test:function(t){this._changeState(t.enrollLogicId,3)},enable:function(t){this._changeState(t.enrollLogicId,1)},unable:function(t){this._changeState(t.enrollLogicId,4)},del:function(t){var e=this;this.$confirm("此操作将永久删除该条数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(n){a.i(o.r)(t.enrollLogicId).then(function(t){t=t.data,"200"===t.state?(e.MessageSuccess(t.message),e._fetchProcessList()):e.MessageError(t.message)}).catch(e.MessageError())}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},_changeState:function(t,e){var n=this;a.i(o.s)(t,e).then(function(t){t=t.data,(t.state="200")?(n.MessageSuccess(t.message),n._fetchProcessList()):n.MessageError(t.message)}).catch(function(){n.MessageError()})},_fetchProcessList:function(){var t=this,e=this.loading();a.i(o.t)(this.yearBtn,this.stateBtn,this.page,this.size).then(function(a){e.close(),a=a.data,"200"===a.state?(t.tableData=a.data.rows,t.total=a.data.total):t.MessageError(a.message)}).catch(function(a){e.close(),t.MessageError()})},_fetchAllConfig:function(){var t=this,e=this.loading();a.i(o.u)().then(function(a){e.close(),a=a.data,"200"===a.state?(t.allYearBtn=a.data.year,t.allStateBtn=a.data.types,t.stateBtn=t.allStateBtn[0].id,t.yearBtn=t.allYearBtn[0],t._fetchProcessList()):t.MessageError(a.message)}).catch(function(){e.close(),t.MessageError()})},teacher:function(t){this.$router.push({path:"/yingxin/teacher"}),this.$store.commit("teacherItem",t)}},mounted:function(){this._fetchAllConfig()},computed:i()({},a.i(r.b)(["roles"]))}},1633:function(t,e,a){e=t.exports=a(1322)(!0),e.push([t.i,"p[data-v-b37774d2]{font-weight:700;display:inline-block;font-family:MicrosoftYaHei-Bold}.crumbs[data-v-b37774d2]{display:inline-block;position:relative;top:2px;left:11px;font-size:10px;border-left:2px solid #a7a7a7;padding-left:10px}","",{version:3,sources:["D:/vue-yxxt/src/pages/yxCms/view/yingxin/index.vue"],names:[],mappings:"AACA,mBACE,gBAAkB,AAClB,qBAAsB,AACtB,+BAAiC,CAClC,AACD,yBACE,qBAAsB,AACtB,kBAAmB,AACnB,QAAS,AACT,UAAW,AACX,eAAgB,AAChB,8BAA+B,AAC/B,iBAAmB,CACpB",file:"index.vue",sourcesContent:["\np[data-v-b37774d2] {\n  font-weight: bold;\n  display: inline-block;\n  font-family: MicrosoftYaHei-Bold;\n}\n.crumbs[data-v-b37774d2] {\n  display: inline-block;\n  position: relative;\n  top: 2px;\n  left: 11px;\n  font-size: 10px;\n  border-left: 2px solid #a7a7a7;\n  padding-left: 10px;\n}"],sourceRoot:""}])},1707:function(t,e,a){var n=a(1633);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(1323)("606c78db",n,!0,{})},1791:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-container",{staticStyle:{padding:"20px"}},[a("el-header",[a("el-row",{staticClass:"vue-header"},[a("el-col",{attrs:{span:6}},[a("span",{staticClass:"only-title"},[t._v("迎新配置")])]),t._v(" "),a("el-col",{attrs:{offset:7,span:4}},[a("span",[t._v("状态")]),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"small"},on:{change:function(e){t.change()}},model:{value:t.stateBtn,callback:function(e){t.stateBtn=e},expression:"stateBtn"}},t._l(t.allStateBtn,function(t){return a("el-option",{key:t.id,attrs:{value:t.id,label:t.name}})}))],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("span",[t._v("迎新年限")]),t._v(" "),a("el-select",{staticStyle:{width:"120px"},attrs:{size:"small"},on:{change:function(e){t.change()}},model:{value:t.yearBtn,callback:function(e){t.yearBtn=e},expression:"yearBtn"}},t._l(t.allYearBtn,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}))],1),t._v(" "),"1"===t.roles[0]?a("el-col",{attrs:{span:2}},[a("el-button",{attrs:{size:"small"},on:{click:t.add}},[t._v("新增")])],1):t._e()],1)],1),t._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:!0}},[a("el-table-column",{attrs:{prop:"processName",align:"center",label:"迎新流程名称",width:"320"}}),t._v(" "),a("el-table-column",{attrs:{prop:"year",align:"center",label:"迎新年限",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creatTime",align:"center",label:"开始时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"endTime",align:"center",label:"结束时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"stuType",align:"center",label:"生源类型",width:"250"}}),t._v(" "),a("el-table-column",{attrs:{prop:"state",align:"center",label:"状态",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t.allStateBtn[e.row.state].name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作栏"},scopedSlots:t._u([{key:"default",fn:function(e){return[4===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.test(e.row)}}},[t._v("测试")]):t._e(),t._v(" "),4===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.enable(e.row)}}},[t._v("启用")]):t._e(),t._v(" "),4===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.edit(e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),4===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.ruxueConfig(e.row)}}},[t._v("入学配置")]):t._e(),t._v(" "),3===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.unable(e.row)}}},[t._v("停测")]):t._e(),t._v(" "),4!==e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.viewruxue(e.row)}}},[t._v("查看入学配置")]):t._e(),t._v(" "),4!==e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.viewSite(e.row)}}},[t._v("查看现场配置")]):t._e(),t._v(" "),4===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.siteConfig(e.row)}}},[t._v("现场配置")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.teacher(e.row)}}},[t._v("教师办公设置")]),t._v(" "),4===e.row.state&&"1"===t.roles[0]?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.del(e.row)}}},[t._v("删除")]):t._e()]}}])})],1)],1),t._v(" "),a("el-footer",[a("el-col",{attrs:{span:6,offset:18}},[a("el-pagination",{attrs:{"current-page":t.page,"page-size":t.size,layout:"prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.page=e}}})],1)],1)],1)],1)},staticRenderFns:[]}},561:function(t,e,a){function n(t){a(1707)}var i=a(4)(a(1542),a(1791),n,"data-v-b37774d2",null);t.exports=i.exports}});
//# sourceMappingURL=63.7fdfb1be13beeb872b72.js.map