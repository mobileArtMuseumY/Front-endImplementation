import { post } from 'axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/api//admin/login', data);

// 学生登录
export const studentSignIn = (data) => post('/api//student/login', data);
