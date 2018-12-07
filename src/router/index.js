import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 注：后台管理的路由还没有写进来，fenchuqu l 
const constRouterMap = [
  {
    path: '/',
    name: 'layout',
    meta: { auth: false },
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Homepage'),
      },
      {
        path: '/signin',
        name: 'SignIn',
        component: () => import('@/views/Login/SignIn'),
      },
      {
        path: '/signinFirst',
        name: 'SignInFirst',
        component: () => import('@/views/Login/SignInFirst'),
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/Login/SignUp'),
      },
      {
        path: '/project/publish',
        name: 'ProjectPublish',
        component: () => import('@/views/Project/ProjectPublish'),
      },
      {
        path: '/project/view',
        name: 'ProjectView',
        component: () => import('@/views/Project/ProjectView'),
      },
      {
        path: '/project/details',
        name: 'ProjectDetails',
        component: () => import('@/views/Project/ProjectDetails'),
      },
      {
        path: '/rank/student',
        name: 'StudentRank',
        component: () => import('@/views/Rank/StudentRanking'),
      },
      {
        path: '/explore',
        name: 'Explore',
        component: () => import('@/views/Explore'),
      },
      {
        path: '/user/enterpriseHomepage',
        name: 'EnterpriseHomepage',
        component: () => import('@/views/User/HomepageOfEnterprise'),
      },
      {
        path: '/user/studentHomepage',
        name: 'StudentHomepage',
        component: () => import('@/views/User/HomepageOfStudent'),
      },
      {
        path: '/service',
        name: 'Service',
        component: () => import('@/views/Service/Service'),
      },
      {
        path: '/signUpAgreement',
        name: 'SignUpAgreement',
        component: () => import('@/views/Agreement/SignUpAgreement'),
      },
      {
        path: '/retrievePassword',
        name: 'RetrievePassword',
        component: () => import('@/views/RetrievePassword/RetrievePassword'),
      },
      {
        path: '/works/upload',
        name: 'WorksUpload',
        component: () => import('@/views/Works/WorksUpload'),
      },
      {
        path: '/works/details',
        name: 'WorksDetails',
        component: () => import('@/views/Works/WorksDetails'),
      },
      {
        path: '/works/bid',
        name: 'WorksBid',
        component: () => import('@/views/Works/WorksBid'),
      },
      {
        path: '/collect',
        name: 'Collect',
        component: () => import('@/views/Collect/Collect'),
      },
      {
        path: '/order/confirm',
        name: 'OrderConfirm',
        component: () => import('@/views/Order/OrderConfirm'),
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting/Setting'),
        children: [
          {
            path: '/setting/verify/info',
            name: 'VerifyInfo',
            component: () => import('@/views/Setting/ChildrenPage/VerifyUserInfo'),
          },
          {
            path: '/setting/verify/email',
            name: 'VerifyEmail',
            component: () => import('@/views/Setting/ChildrenPage/VerifyUserEmail'),
          },
          {
            path: '/setting/verify/phone',
            name: 'VerifyPhone',
            component: () => import('@/views/Setting/ChildrenPage/VerifyUserPhone'),
          },
        ]
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '服务端渲染';
  next();
});

router.afterEach((to) => {
  document.title = to.name;
});

export default router;
