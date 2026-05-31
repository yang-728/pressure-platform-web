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
                name: 'baseConfig',
                meta: {
                    title: '配置管理',
                    permission: 'config',
                },
                component: () => import('../views/config.vue'),
            },
            {
                path: '/testcase',
                name: 'baseTestCase',
                meta: {
                    title: '用例管理',
                    permission: 'testcase',
                },
                component: () => import('../views/testcase.vue'),
            },
            {
                path: '/case-generation',
                name: 'caseGeneration',
                meta: {
                    title: '用例生成',
                    permission: 'case-generation',
                },
                component: () => import('../views/caseGeneration.vue'),
            },
            {
                path: '/jmx',
                name: 'baseJmx',
                meta: {
                    title: '脚本管理',
                    permission: 'jmx',
                },
                component: () => import('../views/jmx.vue'),
            },
            {
                path: '/csv',
                name: 'baseCsv',
                meta: {
                    title: '文件管理',
                    permission: 'csv',
                },
                component: () => import('../views/csv.vue'),
            },
            {
                path: '/jar',
                name: 'baseJar',
                meta: {
                    title: '依赖管理',
                    permission: 'jar',
                },
                component: () => import('../views/jar.vue'),
            },
            {
                path: '/execution',
                name: 'execution',
                meta: {
                    title: '执行队列',
                    permission: 'execution',
                },
                component: () => import('../views/execution.vue'),
            },
            {
                path: '/report',
                name: 'baseReport',
                meta: {
                    title: '执行结果',
                    permission: 'report',
                },
                component: () => import('../views/report.vue'),
            },
            {
                path: '/node',
                name: 'baseNode',
                meta: {
                    title: '节点管理',
                    permission: 'node',
                },
                component: () => import('../views/node.vue'),
            },
            {
                path: '/user',
                name: 'baseUser',
                meta: {
                    title: '用户管理',
                    permission: 'user',
                },
                component: () => import('../views/user.vue'),
            },
            {
                path: '/role',
                name: 'baseRole',
                meta: {
                    title: '角色管理',
                    permission: 'role',
                },
                component: () => import('../views/role.vue'),
            },
            {
                path: '/profile',
                name: 'Profile',
                meta: {
                    title: '个人中心',
                },
                component: () => import('../views/profile.vue'),
            },
            {
                path: '/audit',
                name: 'baseAudit',
                meta: {
                    title: '审计日志',
                    permission: 'audit',
                },
                component: () => import('../views/audit.vue'),
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
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission && !permiss.key.includes(String(to.meta.permission))) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
