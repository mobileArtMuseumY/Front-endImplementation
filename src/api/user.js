import { post } from 'axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/api/bussiness/login', data);

// 学生登录
export const studentSignIn = (data) => post('/api/student/login', data);

// 企业注册
export const enterpriseSignUp = (data) =>post('/api/business/register', data);
