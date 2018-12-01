import { post, get, postFile} from '@/utils/axios';

// 发现作品
export const getWorksDataPassersBy = (data) => get('/show/works', data);

// 查看作品详情
export const queryWorksDetails = (data) => get('/show/works/attachment', data);

// 作品收藏
export const collectWorks = (data) => post('/collect/works/add', data);

// 取消作品收藏
export const cancleCollectWorks = (data) => post('/collect/works/delete', data);

// 项目收藏
export const collectProjects = (data) => post('/collect/project/add', data);

// 取消项目收藏
export const cancelCollectProjects = (data) => post('/collect/project/delete', data);

// 获取作品总数
export const getWorksCount = () => get('/count/works');

