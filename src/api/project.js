import { post, get, postFile} from '../utils/axios';

// 技能列表
export const skillList = () => get('/show/skillList');

// 发布项目
// 表单
export const publishProjectForm = (data) => post('/project/form', data);

// 文件上传
export const publishProjectFile = (data) => postFile('/project/upload', data);
