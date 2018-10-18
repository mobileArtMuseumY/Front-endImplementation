import { post, get, postFile } from '@/utils/axios';

// 全部技能列表
export const getSkillList = () => get('/show/skillList');

// 通过学生技能来筛选project
export const selectProjectThroughSkills = (data) => get('/show/skillSelect', data);

// 发布项目，表单
export const publishProjectForm = (data) => post('/project/form', data);

// 文件上传
export const publishProjectFile = (data) => postFile('/project/upload', data);

// 浏览项目
export const getProjectData = (data) => get('/show/project', data);

