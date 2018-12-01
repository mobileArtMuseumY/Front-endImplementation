import { post, get, postFile} from '@/utils/axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/business/login', data);

// 学生非第一次登录
export const studentSignIn = (data) => post('/student/login', data);

// 学生第一次登录
// 发送邮箱
export const studentSignInFirstlySendEmail = (data) => post('/student/firstLogin/SendEmail', data);

// 邮箱验证码验证
export const studentSignInFirstlyEmailVerified = (data) => post('/student/firstLogin/verified', data);

// 修改密码
export const studentModifyPassword = (data) => post('/student/password/resetByEmail', data);

// 企业注册
// 发送验证
export const enterpriseSignUpV = (data) => post('/business/register/varify', data);

// 发送验证码
export const enterpriseSignUpC = (data) => post('/business/register/captcha', data);

// 表单
export const enterpriseSignUpForm = (data) => post('/business/register/form', data);

// 证明图片上传，图片输入api后自动上传，该变量暂时用不上
export const enterpriseSignUpFile = (data) => postFile('/business/register/upload', data);

// 获取学生信息
export const getStudentInfo = (data) => get('/student/home/info', data);

// 获取企业信息
export const getEnterpriseInfo = (data) => get('/business/home/info', data);

// 人才排行榜
export const getStudentRanking = (data) => get('/show/students', data);

// 支付
export const pay = (data) => post('/alipay', data);

// 获取学生总数
export const getStudentCount = () => get('/count/student');