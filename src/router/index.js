import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const constRouterMap = [
  {
    path: '/',
    name: 'layout',
    meta: { auth: false },
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/HomePage'),
      },
      {
        path: 'signin',
        name: '登录',
        component: () => import('@/views/Login/SignIn'),
      },
      {
        path: 'signup',
        name: '注册',
        component: () => import('@/views/Login/SignUp'),
      },
      {
        path: 'project/publish',
        name: '发布项目',
        component: () => import('@/views/Project/ProjectPublish'),
      },
      {
        path: 'project/view',
        name: '浏览项目',
        component: () => import('@/views/Project/ProjectView'),
      },
      {
        path: 'rank/student',
        name: '人才排行榜',
        component: () => import('@/views/Rank/StudentRank'),
      },
      {
        path: 'explore',
        name: '发现',
        component: () => import('@/views/Explore'),
      },
      {
        path: 'enterpriseHome',
        name: '企业主页',
        component: () => import('@/views/User/EnterpriseHomePage'),
      },
      {
        path: 'studentHome',
        name: '学生主页',
        component: () => import('@/views/User/StudentHomePage'),
      },
    ],
  },
];


const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [...constRouterMap],
});

router.afterEach((to) => {
  document.title = to.name;
});

export default router;
