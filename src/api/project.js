import { post, get, postFile } from '@/utils/axios';

// 全部技能列表
export const getSkillList = () => get('/show/skillList');

/**
 * 通过学生技能来筛选project
 * @param {*} skillId int
 * @param {*} page int
 * @param {*} rows int
 */
export const selectProjectThroughSkills = (data) => get('/show/skillSelect', data);

/**
 * 发布项目
 * 表单
 * @param {*} projectName String
 * @param {*} projectDescription  String
 * @param {*} skillList []
 * @param {*} tenderPeriod int
 * @param {*} budget int
 * @param {*} expectedTime int
 */
export const publishProjectForm = (data) => post('/project/form', data);

/**
 * 文件上传
 * @param {*} projectId Long
 * @param {*} fileList []
 */
export const publishProjectFile = (data) => postFile('/project/upload', data);

/**
  * 浏览项目
  * 按照时间/follower的人数
  * @param {*} method int   0,时间  1,follower
  * @param {*} page int
  * @param {*} rows int
  */
export const getProjectData = (data) => get('/show/project', data);

/**
  * 发现作品
  * 按照时间/follower的人数
  * @param {*} method int   0,时间  1,follower
  * @param {*} page int
  * @param {*} rows int
  */
export const getWorksData = (data) => get('/show/works', data);

/**
 * 查看作品详情
 * @param {*} worksId Long
 */
export const queryWorksDetails = (data) => get('/show/works/attachment', data);

/**
 * 人才排行榜
 * @param {*} page int
 * @param {*} rows int
 */
export const getStudentRanking = (data) => get('/show/students', data);
