import { post, get, postFile} from '@/utils/axios';

// 企业登录
export const enterpriseSignIn = (data) => post('/business/login', data);

// 学生非第一次登录
export const studentSignIn = (data) => post('/student/login', data);

// 学生忘记密码——发送学号获取验证码
export const studentFPGetCaptcha= (data) => post('/student/password', data);

// 企业忘记密码——发送邮箱获取验证码
export const enterpriseFPGetCaptcha = (data) => post('/business/password', data);

// 学生忘记密码——提交表单
export const studentFPSubmitForm = (data) => post('/student/password/resetByEmail', data);

// 企业忘记密码——提交表单
export const enterpriseFPSubmitForm = (data) => post('/business/password/reset', data);

// 学生第一次登录
// 发送邮箱 // 学生验证邮箱(登录之后想要修改)(获取验证码)
export const studentSignInFirstlySendEmail = (data) => post('/student/firstLogin/SendEmail', data);

// 学生第一次登录邮箱验证码验证
export const studentSignInFirstlyEmailVerified = (data) => post('/student/firstLogin/verified', data);

// 企业验证邮箱(登录之后想要修改)(获取验证码)
export const enterpriseGetCaptcha = (data) =>post('business/update/email', data);

// 企业验证邮箱(登录之后想要修改)
export const enterpriseVerifiedEmail = (data) =>post('business/email/verified', data);

// 学生验证邮箱(登录之后想要修改)
export const studentVerifiedEmail = (data) =>post('student/email/verified', data);

// 修改密码
export const studentModifyPassword = (data) => post('/student/password/resetByEmail', data);

// 企业注册
// 验证手机和验证码是否匹配
export const enterpriseSignUpV = (data) => post('/business/register/varify', data);

// 发送验证码
export const enterpriseSignUpC = (data) => post('/business/register/captcha', data);

// 表单
export const enterpriseSignUpForm = (data) => post('/business/register/form', data);

// 证明图片上传，图片输入api后自动上传，该变量暂时用不上
export const enterpriseSignUpFile = (data) => postFile('/business/register/upload', data);

// 人才排行榜
export const getStudentRanking = (data) => get('/show/students', data);

// 获取学生总数
export const getStudentCount = () => get('/count/student');

// 关注别人
export const followOthers = (data) => post('/follower/add', data);

// 取消关注
export const unFollowOthers = (data) => post('/follower/delete', data);

// 学生个人主页获取主页基本信息
export const getStudentBasicInfo = (data) => get('/student/home/info', data);

// 获取企业个人主页中的基本信息
export const getEnterpriseBasicInfo = (data) => get('/business/home/info', data);

// 获取企业个人主页中的各种状态的项目
export const getAllProjects = (data) => get('/business/home/projectShow', data);

// 获取学生首页收藏信息（项目）
export const getStudentProjectCollectInfo = () => get('/collect/home/favoriteProjectShow');

// 获取学生首页收藏信息（作品）
export const getStudentWorksCollectInfo = () => get('/collect/home/favoriteWorksShow');

// 获取企业首页收藏信息(项目)
export const getEnterpriseProjectCollectInfo = () => get('/collect/home/favoriteProjectShow');

// 获取企业首页收藏信息(作品)
export const getEnterpriseWorksCollectInfo = () => get('/collect/home/favoriteWorksShow');

// 获取企业首页订单信息
export const getEnterpriseOrderInfo = (data) => get('/business/home/orderShow', data);

// 获取学生首页订单信息
export const getStudentOrderInfo = (data) => get('/student/home/orderShow', data);

// 学生投标项目
export const studentGoToBid = (data) => post('/project/student/bidding', data);

// 企业进行选标（确认订单）
export const enterpriseSelectBid = (data) => post('/order/bid/confirm', data);

// 企业确认订单
export const buyWorks = (data) => post('/order/add', data);

// 订单完成
export const Orderfinished = (data) => post('/order/done', data)

// 支付
export const pay = (data) => post('/alipay/pay', data);

//企业个人简介修改
export const enterpriseUpdateInfo = (data) => post('/business/update/introduction', data);

//学生个人简介修改
export const studentUpdateInfo = (data) => post('/student/update/introduction', data);

