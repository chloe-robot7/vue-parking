import Vue from 'vue';
import Router from 'vue-router';
import OrderDetail from "../components/page/OrderDetail.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
                // {
                //     path: '/table',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                //     meta: { title: '宾客名单' }
                // },
                // {
                //     path: '/info',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/weddingInfo.vue'),
                //     meta: { title: '全部婚礼信息展示' }
                // }，
                //订单列表
                {
                    path: '/order',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Order.vue'),
                    meta: { title: '订单列表' }
                },
                //订单详情
                {
                    path: '/OrderDetail',
                    name: 'OrderDetail',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/OrderDetail.vue'),
                    meta: { title: '订单详情' },
                    
                },
                {
                    path: '/userInfo',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/UserInfo.vue'),
                    meta: { title: '全部用户信息管理' },
                },
                {
                    path: '/Purchase',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Purchase.vue'),
                    meta: { title: '充值信息管理' },
                },
                {
                    path: '/stall',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Stall.vue'),
                    meta: { title: '车位管理' },
                },
                {
                    path: '/admin',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/admin.vue'),
                    meta: { title: '管理员查询' },
                },
                // {
                //     path: '/form',
                //     component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                //     meta: { title: '婚礼基本信息' }
                // },

                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },

                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // }
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                // {
                //     path: '/404',
                //     component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                //     meta: { title: '404' }
                // },
                // {
                //     path: '/403',
                //     component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                //     meta: { title: '403' }
                // },
                // {
               
            ]
        },
        {
            path: '/uLogin',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '用户登录' }
        },
        {
            path: '/aLogin',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/adminLogin.vue'),
            meta: { title: '管理员登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '/welcome',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/welcome.vue'),
            meta: { title: 'welcome' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
