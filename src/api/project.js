import { post, get, postFile } from '@/utils/axios';

// 全部技能列表
export const getSkillListAll = () => get('/show/skillList');

// 通过学生技能来筛选project
export const selectProjectThroughSkills = (data) => get('/show/skillSelect', data);

// 发布项目，表单
export const publishProjectForm = (data) => post('/project/form', data);

// 文件上传
export const publishProjectFileUpload = (data) => postFile('/project/upload', data);

// 浏览项目
export const getProjectDataPassersBy = (data) => get('/show/project', data);

// 查看项目详情
export const getProjectDataDetails = (data) => get('/project/info', data);

// 企业主页中项目展示
export const getProjectDataHomepage = (data) => get('/home/projectShow', data)

// 获取项目总数
export const getProjectCount = () => get('/count/project');
