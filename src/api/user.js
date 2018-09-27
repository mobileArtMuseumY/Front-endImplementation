import { post, get, postFile} from '../utils/axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/business/login', data);

// 学生登录
export const studentSignIn = (data) => post('/student/login', data);

// 管理员登录
export const adminSignIn = (data) => post('/admin/login', data);

// 企业注册
// 发送验证
export const enterpriseSignUpV = (data) => post('/business/register/varify', data);

// 发送验证码
export const enterpriseSignUpC = (data) => post('/business/register/captcha', data);

// 表单
export const enterpriseSignUpForm = (data) => post('/business/register/form', data);

// 证明图片上传
export const enterpriseSignUpFile = (data) => postFile('/business/register/upload', data);

// 测试
export const test = (data) => get('student/test', data);
