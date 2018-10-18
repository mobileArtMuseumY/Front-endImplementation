import 'normalize.css';
import '@/assets/icons';
import '@/assets/scss/index.scss';
import '@/assets/scss/element';
import '@/components/ElementUI';
import components from '@/components';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import regx from './utils/rgex';
import formatDate from './utils/date';

Vue.prototype.$regx = regx;
Vue.prototype.$notify = Notification;

Vue.use(components);

Vue.filter('formatDate', formatDate);
Vue.config.productionTip = false;

// const whiteList = ['/home', '/project/publish', '/project/view', '/rank/student', '/explore'];

// router.beforeEach((to, from, next) => {
//   if (store.getters.user.token) {  // 判断是否有token
//     if (to.path === '/SignIn') {
//       next({ path: '/' });
//     } else {
//       if (store.getters.user.roles.length === 0) {  // 判断目前用户是否已经拉取完user_info信息
//         store.dispatch('GetUserInfo').then(res => { // 拉取info
//           const roles = res.data.role;
//           store.dispatch('GenerateRoutes', roles).then(() => {  // 生成可访问的路由表
//             router.addRoutes(store.getters.addRoutes);  // 动态添加可访问路由表
//             next({ ...to, replace: true }); //hack方法 确保addRoutes已完成
//           })
//         }).catch(err => {
//           console.log(err);
//         });
//       } else {
//         next();       // 当有用户权限的时候，说明所有可访问路由已生成，如访问没权限的全面会自动进入404页面
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     }
//     next('/home');    // 否则全部重定向到首页
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
