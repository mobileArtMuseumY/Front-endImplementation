import { post, get, postFile} from '@/utils/axios';

// 发现项目
export const getWorksData = (data) => get('/show/works', data);

// 查看作品详情
export const queryWorksDetails = (data) => get('/show/works/attachment', data);
