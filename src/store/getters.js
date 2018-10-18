// 允许组件从Store中获取数据
const getters = {
  user: state => state.user,
  project: state => state.project,
  works: state => state.works,
};
export default getters;
