import { post, get, postFile} from '@/utils/axios';

// 发现作品
export const getWorksDataPassersBy = (data) => get('/show/works', data);

// 查看作品详情
export const queryWorksDetails = (data) => get('/works/attachment', data);

// 收藏作品
export const collectWorks = (data) => post('/collect/works/add', data);

// 取消作品收藏
export const cancleCollectWorks = (data) => post('/collect/works/delete', data);

// 项目收藏
export const collectProjects = (data) => post('/collect/project/add', data);

// 取消项目收藏
export const cancelCollectProjects = (data) => post('/collect/project/delete', data);

// 获取作品总数
export const getWorksCount = () => get('/count/works');

// 提交作品上传表单
export const uploadWorks = (data) => post('/works/form', data)

// 主页中获取学生作品
export const getSelfWorks = (data) => get('/student/home/worksShow', data);

// 通过worksId获取作品信息
export const getWorksById = (data) => post('/works/infoShow', data);

// 通过worksId删除作品
export const deleteWorksById = (data) => post('/worksController/delete', data);

// 学生修改作品
export const modifyWorks = (data) => post('/works/update', data);
