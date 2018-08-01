import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/dyxw',
      name:'dyxw',
      component: resolve => require(['student/component/xinwen/dyxw'],resolve),
      meta:{title:"单页新闻"}
    },
    {
      path:'/csLogin',
      name:'csLogin',
      component: resolve => require(['student/component/csLogin'],resolve),
      meta:{title:"测试登录"}
    },
    {
      path:'/lbxwIndex',
      name:'lbxwIndex',
      component: resolve => require(['student/component/xinwen/lbxw/xw-list'],resolve),
      meta:{title:"列表多页新闻"}
    },
    {
      path:'/wjdc',
      name:'wjdc',
      component: resolve => require(['student/component/rxzb/aqzscs/wjdc'],resolve),
      meta:{title:"问卷调查"}
    },
    {
      path:'/lbxwDetail',
      name:'lbxwDetail',
      component: resolve => require(['student/component/xinwen/lbxw/xw-detail'],resolve),
      meta:{title:"列表多页新闻详情页"}
    },
    {
      path:'/mycode',
      name:'mycode',
      component: resolve => require(['student/component/mycode'],resolve),
      meta:{title:"显示个人身份码"}
    },
    {
      path:'/myinfo',
      name:'myinfo',
      component: resolve => require(['student/component/myinfo'],resolve),
      meta:{title:"学生个人信息页面"}
    },
    {
      path:'/szqs',
      name:'szqs',
      component: resolve => require(['student/component/szqs'],resolve),
      meta:{title:"所在寝室"}
    },
    {
      path:'/xcbdPopup',
      name:'xcbdPopup',
      component: resolve => require(['student/component/common/xcbdPopup'],resolve),
      meta:{title:"弹出二维码"}
    },
    {
      path:'/wsxxQsxx',
      name:'wsxxQsxx',
      component: resolve => require(['student/component/rxzb/wsxx/rxzb-wsxx-qsxx'],resolve),
      meta:{title:"完善信息-亲属信息"}
    },
    {
      path:'/wsxxCdxx',
      name:'wsxxCdxx',
      component: resolve => require(['student/component/rxzb/wsxx/rxzb-wsxx-cdxx'],resolve),
      meta:{title:"完善信息-曾读学校"}
    },
    {
      path:'/noticeDetail',
      name:'noticeDetail',
      component: resolve => require(['student/component/notice-detail'],resolve),
      meta:{title:"通知公告详情页"}
    },
    {
      path:'/noticeList',
      name:'noticeList',
      component: resolve => require(['student/component/notice-list'],resolve),
      meta:{title:"通知公告列表页"}
    },
    {
      path:'/noticeXq',
      name:'noticeXq',
      component: resolve => require(['student/component/notice-list'],resolve),
      meta:{title:"通知公告详情页"}
    },
    {
      path:'/rxzbBxgm',
      name:'rxzbBxgm',
      component: resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm'],resolve),
      meta:{title:"入学准备-保险购买页面"}
    },
    {
      path:'/bxgmComplete',
      name:'bxgmComplete',
      component: resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm-complete'],resolve),
      meta:{title:"入学准备-保险购买完成后显示的页面"}
    },
    {
      path:'/bxgmFqgm',
      name:'bxgmFqgm',
      component: resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm-fqgm'],resolve),
      meta:{title:"入学准备-放弃购买保险要显示的页面"}
    },
    {
      path:'/bxgmFqgmJh1',
      name:'bxgmFqgmJh1',
      component: resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm-fqgm-jh1'],resolve),
      meta:{title:"入学准备-确认放弃购买保险后的交互页面"}
    },
    {
      path:'/bxgmYgm',
      name:'bxgmYgm',
      component: resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm-ygm'],resolve),
      meta:{title:"入学准备-成功放弃购买保险显示的页面"}
    },
    {
      path:'/bxgmxz',
      name:'bxgmxz',
      component: resolve => require(['student/component/rxzb/bxgm/readBxgm'],resolve),
      meta:{title:"入学准备-新添加今天阅读页面"}
    },
    {
      path:'/bdlcXcjf',
      name:'bdlcXcjf',
      component: resolve => require(['student/component/bdlc/xcjf/bdlc-xcjf'],resolve),
      meta:{title:"报道流程-现场缴费缴费大厅页面"}
    },
    {
      path:'/indexLqtzs',
      name:'indexLqtzs',
      component: resolve => require(['student/component/index-lqtzs'],resolve),
      meta:{title:"首页跳到录取通知书页面"}
    },
    {
      path:'/yindaoye',
      name:'yindaoye',
      component: resolve => require(['student/component/yindaoye'],resolve),
      meta:{title:"引导页"}
    },
    {
      path:'/jfdt',
      name:'jfdt',
      component: resolve => require(['student/component/jfdt'],resolve),
      meta:{title:"缴费大厅"}
    },
    {
      path:'/jfdtEwm',
      name:'jfdtEwm',
      component: resolve => require(['student/component/jfdt-ewm'],resolve),
      meta:{title:"缴费大厅弹出的二维码界面"}
    },
    {
      path:'/dztzs',
      name:'dztzs',
      component: resolve => require(['student/component/dztzs'],resolve),
      meta:{title:"首页点击图标显示的电子通知书"}
    },
    {
      path:'/dztz',
      name:'dztz',
      component: resolve => require(['student/component/dztz'],resolve),
      meta:{title:"电子通知书"}
    },
    //公用组件样式效果测试
    {
      path:'/popup',
      name:'popup',
      component: resolve => require(['student/component/common/popup'],resolve),
      meta:{title:"弹出窗口组件化"}},
    {
      path:'/test',
      name:'test',
      component: resolve => require(['student/component/common/vue-test'],resolve),
      meta:{title:"随机测试组件用"}
    },
    {
      path:'/cdxxInfo',
      name:'cdxxInfo',
      component: resolve => require(['student/component/common/rxzb-wsxx-cdxx-info'],resolve),
      meta:{title:"曾读学校信息组件"}
    },
    {
      path:'/qsxxInfo',
      name:'qsxxInfo',
      component: resolve => require(['student/component/common/rxzb-wsxx-qsxx-info'],resolve),
      meta:{title:"亲属信息组件"}
    },

    //学生移动端预设路由结构
    {
    	path: '/index',
    	name:'index', 
    	component: resolve => require(['student/component/index'],resolve), 
    	meta:{title:"迎新系统"}
    },
    {
      path:'/lstdSqyy',
      name:'lstdSqyy',
      component:resolve => require(['student/component/rxzb/lstd/lstd-sqyy'],resolve),
      meta:{title:"申请原因"}
    },
    {
    	path: '/rxzb',
    	name:'rxzb', 
    	component: resolve => require(['student/component/rxzb/rxzb'],resolve), 
    	meta:{title:"入学准备"},
    	children:[
	    	{
	    		path:'/rxzb/aqzscs',
	    		name:'aqzscs',
	    		component: resolve => require(['student/component/rxzb/aqzscs/rxzb-aqzscs'],resolve),
	    		meta:{title:"安全知识测试"}
    		},
    		{
	    		path:'/rxzb/wsxx',
	    		name:'wsxx',
	    		component:resolve => require(['student/component/rxzb/wsxx/rxzb-wsxx'],resolve),
	    		meta:{title:"完善信息"}
    		},
    		{
	    		path:'/rxzb/bxgm',
	    		name:'bxgm',
	    		component:resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm'],resolve),
	    		meta:{title:"保险购买"}
    		},
        {
          path:'/rxzb/bxgmaqxy',
          name:'bxgmaqxy',
          component:resolve => require(['student/component/rxzb/bxgm/rxzb-bxgm-fqgm'],resolve),
          meta:{title:"保险购买安全协议"}
        },
    		{
	    		path:'/rxzb/lstd',
	    		name:'lstd',
	    		component:resolve => require(['student/component/rxzb/lstd/rxzb-lstd'],resolve),
	    		meta:{title:"绿色通道"}
    		},
        {
          path:'/lstdRead',
          name:'lstdRead',
          component:resolve => require(['student/component/rxzb/lstd/lstd-text'],resolve),
          meta:{title:"新增的绿色通道静态信息展示页面"}
        },
    		{
	    		path:'/rxzb/bdjt',
	    		name:'bdjt',
	    		component:resolve => require(['student/component/rxzb/bdjt/rxzb-bdjt'],resolve),
	    		meta:{title:"报道交通"}
    		},
    		{
	    		path:'/rxzb/zjlg',
	    		name:'zjlg',
	    		component: resolve => require(['student/component/rxzb/zjlg/rxzb-zjlg'],resolve),
	    		meta:{title:"走进理工"}
    		},
        {
          path:'/rxzb/zjlg/detail',
          name:'zjlgDetail',
          component: resolve => require(['student/component/rxzb/zjlg/rxzb-zjlg-detail'],resolve),
          meta:{title:"走进理工详情页"}
        },
    	]
    },
    {
    	path: '/bdlc',
    	name:'bdlc',
    	component:resolve => require(['student/component/bdlc/bdlc'],resolve),
    	meta:{title: "首页报道流程"},
    	children:[
    		{
	    		path:'/bdlc/xcbd',
	    		name:'xcbd',
	    		component:resolve => require(['student/component/bdlc/xcbd/bdlc-xcbd'],resolve),
	    		meta:{title:"现场报道"}
    		},
    		{
	    		path:'/bdlc/ssbl',
	    		name:'ssbl',
	    		component:resolve => require(['student/component/bdlc/ssbl/bdlc-ssbl'],resolve),
	    		meta:{title:"宿舍办理"}
    		},
    		{
	    		path:'/bdlc/xcjf',
	    		name:'xcjf',
	    		component:resolve => require(['student/component/bdlc/xcjf/bdlc-xcjf'],resolve),
	    		meta:{title:"现场缴费"}
    		},
    		{
	    		path:'/bdlc/rxjy',
	    		name:'rxjy',
	    		component:resolve => require(['student/component/bdlc/rxjy/bdlc-rxjy'],resolve),
	    		meta:{title:"入学教育"}
    		},
    		{
	    		path:'/bdlc/jlsy',
	    		name:'jlsy',
	    		component:resolve => require(['student/component/bdlc/jlsy/bdlc-jlsy'],resolve),
	    		meta:{title:"军旅生涯"},
        },
    		{
    			path:"/bdlc/jlsy/jxsj",
    			name:"jxsj",
    			component:resolve => require(['student/component/bdlc/jlsy/bdlc-jlsy-jxsj'],resolve),
    			meta:{title:"军训时间"}
    		}
    	]
    },
  ]
})
