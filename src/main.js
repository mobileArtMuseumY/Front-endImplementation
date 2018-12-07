import 'normalize.css';
import '@/assets/icons';
import '@/assets/scss/index.scss';
import '@/assets/scss/element';
import element from 'element-ui';
import components from '@/components';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.use(element);
Vue.use(components);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
