import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/testcase',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/config',
                name: 'Config',
                meta: {
                    title: '配置管理',
                    permiss: '1',
                },
                component: () => import('../views/config.vue'),
            },
            {
                path: '/testcase',
                name: 'Testcase',
                meta: {
                    title: '用例管理',
                    permiss: '1',
                },
                component: () => import('../views/testcase.vue'),
            },
            {
                path: '/jmx',
                name: 'Jmx',
                meta: {
                    title: '脚本管理',
                    permiss: '1',
                },
                component: () => import('../views/jmx.vue'),
            },
            {
                path: '/csv',
                name: 'Csv',
                meta: {
                    title: '文件管理',
                    permiss: '1',
                },
                component: () => import('../views/csv.vue'),
            },
            {
                path: '/jar',
                name: 'Jar',
                meta: {
                    title: '依赖管理',
                    permiss: '1',
                },
                component: () => import('../views/jar.vue'),
            },
            {
                path: '/execution',
                name: 'Execution',
                meta: {
                    title: '执行队列',
                    permiss: '1',
                },
                component: () => import('../views/execution.vue'),
            },
            {
                path: '/report',
                name: 'Report',
                meta: {
                    title: '执行结果',
                    permiss: '1',
                },
                component: () => import('../views/report.vue'),
            },
            {
                path: '/node',
                name: 'Node',
                meta: {
                    title: '节点管理',
                    permiss: '1',
                },
                component: () => import('../views/node.vue'),
            },
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: '用户管理',
                    permiss: '1',
                },
                component: () => import('../views/user.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/execution-redesign',
        name: 'ExecutionRedesign',
        meta: { title: '执行队列（新版）' },
        component: () => import('../views/execution-redesign.vue'),
    },
    {
        path: '/home-redesign',
        name: 'HomeRedesign',
        meta: { title: '主布局（新版）' },
        component: () => import('../views/home-redesign.vue'),
    },
    {
        path: '/login-redesign',
        name: 'LoginRedesign',
        meta: { title: '登录（新版）' },
        component: () => import('../views/login-redesign.vue'),
    },
    {
        path: '/design-preview',
        name: 'DesignPreview',
        meta: { title: '设计稿预览' },
        component: () => import('../views/design-preview.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | mysterious`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login' && to.path !== '/design-preview' && to.path !== '/login-redesign' && to.path !== '/home-redesign' && to.path !== '/execution-redesign') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
