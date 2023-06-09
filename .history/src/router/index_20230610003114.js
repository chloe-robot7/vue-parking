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
