import { post } from '../utils/axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/bussiness/login', data);

// 学生登录
export const studentSignIn = (data) => post('/student/login', data);

// 企业注册
export const enterpriseSignUp = (data) => post('/business/register', data);

//  管理员登陆
export const adminSignIn = (data) => post('/admin/login', data);
