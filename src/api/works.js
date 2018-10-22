import { post, get, postFile} from '@/utils/axios';

// 发现作品
export const getWorksData = (data) => get('/show/works', data);

//　发现作品中获取作品总数
export const getWorksCount = () => get('/show/works/count');

// 查看作品详情
export const queryWorksDetails = (data) => get('/show/works/attachment', data);

// 收藏请求
export const collectWorks = (data) => post('/show/works/collect', data);
