import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import project from './modules/project';
import works from './modules/works';

Vue.use(Vuex);

export default new Vuex.Store({
  // modules对象允许将单一的Store拆分为多个Store，同时保存在单一的状态树中
  modules: {
    user,
    project,
    works,
  },
  getters,
});
