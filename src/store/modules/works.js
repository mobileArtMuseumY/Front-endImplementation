
import {
  getWorksData,

} from '@/api/project';
import {
  queryWorksDetails,
  collectWorks,
} from '@/api/works';
import {
  SET_COLLECTION,
  SET_WORKS_INFO,
} from './mutation-types';

const works = {
  state: {
    worksInfo: {// 存储当前作品的信息，而不是整个explore所有作品的信息
      worksUrl: '',
      worksName: '',
      worksId: Number,
      worksNum: Number,
    },
    collectFlag: false,
  },
  mutations: {
    [SET_COLLECTION](state) {
      state.collectFlag = !state.collectFlag;
    },
    [SET_WORKS_INFO](state, { data }) {
      state.worksInfo.worksId = data.worksId;
      state.worksInfo.worksUrl = data.worksUrl;
      state.worksInfo.worksName = data.worksName;
      state.worksInfo.worksNum = data.worksNum;
    },
  },
  actions: {
    SetWorksInfo: function ({ commit }, data) {
      commit('SET_WORKS_INFO', data);
    },
    CollectWorks: function ({ commit }, worksId) {
      // 收藏作品
      collectWorks(worksId)
        .then(res => {
          commit('SET_COLLECTION');
          this.$message({
            message: '收藏成功！',
            type: 'success',
          });
        })
        .catch(err => {
          console.log('收藏失败！');
        });
    },
    QueryWorksDetails: function ({ commit }, worksId) {
      // 需要设置worksInfo
      queryWorksDetails(worksId).then(res => {
        commit('SET_WORKS_INFO', res.data);
      }).catch(err => {
        console.log('获取作品详细信息失败！');
      });
    }
  },
}

export default works;
