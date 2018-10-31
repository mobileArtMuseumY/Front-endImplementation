import { post, get, postFile} from '@/utils/axios';

// 发现作品
export const getWorksData = (data) => get('/show/works', data);

//　发现作品中获取作品总数
export const getWorksCount = () => get('/show/works/count');

// 查看作品详情
export const queryWorksDetails = (data) => get('/show/works/attachment', data);

// 作品收藏
export const collectWorks = (data) => post('/collect/works/add', data);

// 取消作品收藏
export const cancleCollectWorks = (data) => post('/collect/works/delete', data);

// 项目收藏
export const collectProject = (data) => post('/collect/project/add', data);

// 取消项目收藏
export const cancelCollectProject = (data) => post('/collect/project/delete', data);
