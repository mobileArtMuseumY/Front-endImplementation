import { post } from 'axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/admin/login', data);

// 学生登录
export const studentSignIn = (data) => post('/student/login', data);
