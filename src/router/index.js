import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 注：后台管理的路由还没有写进来
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
        path: 'signinFirst',
        name: '学生第一次登录',
        component: () => import('@/views/Login/SignInFirst'),
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
        path: 'project/details',
        name: '项目详情',
        component: () => import('@/views/Project/ProjectDetails'),
      },
      {
        path: 'rank/student',
        name: '人才排行榜',
        component: () => import('@/views/Rank/StudentRanking'),
      },
      {
        path: 'explore',
        name: '发现',
        component: () => import('@/views/Explore'),
      },
      {
        path: 'user/enterpriseHomePage',
        name: '企业主页',
        component: () => import('@/views/User/HomePageOfEnterprise'),
      },
      {
        path: 'user/studentHomePage',
        name: '学生主页',
        component: () => import('@/views/User/HomePageOfStudent'),
      },
      {
        path: 'setting',
        name: '设置',
        component: () => import('@/views/Setting/Setting'),
      },
      {
        path: 'service',
        name: '客服',
        component: () => import('@/views/Service/Service'),
      },
      {
        path: 'signUpAgreement',
        name: '注册协议',
        component: () => import('@/views/Agreement/SignUpAgreement'),
      },
      {
        path: 'retrievePassword',
        name: '找回密码',
        component: () => import('@/views/RetrievePassword/RetrievePassword'),
      },
      {
        path: 'works/upload',
        name: '作品上传',
        component: () => import('@/views/Works/WorksUpload'),
      },
      {
        path: 'works/details',
        name: '作品详情',
        component: () => import('@/views/Works/WorksDetails'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];


const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [...constRouterMap],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

const asyncRouterMap = [
  {
    path: '/permission',
    name: '权限控制',
    component: () => import('@/views/Layout'),
    meta: { role: ['student'] },
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
]

router.afterEach((to) => {
  document.title = to.name;
});

export default router;
