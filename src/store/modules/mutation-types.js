// 使用常量替代mutation事件类型在各种Flux实现中是很常见的模式。这样可以使linter之类的工具发挥作用
// 同时把这些常量放在单独的文件中可以让代码合作者对整个项目包含的mutation一目了然。

// user
const SET_STATUS = 'SET_STATUS';
const SET_ROLE = 'SET_ROLE';
const SET_USERID = 'SET_USERID';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_AVATAR = 'SET_AVATAR';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_PROJECT_NUM = 'SET_PROJECT_NUM';
const SET_FOLLOWERS = 'SET_FOLLOWERS';
const SET_FOLLOWING = 'SET_FOLLOWING';
const SET_ROLES = 'SET_ROLES';
const SET_TOKEN = 'SET_TOKEN';
const SET_CAPTCHA = 'SET_CAPTCHA';

//works
const SET_COLLECTION = 'SET_COLLECTION';

// export const SET_CODE = 'SET_CODE';
// export const SET_SETTING = 'SET_SETTING';

// permission
const SET_ROUTERS = 'SET_ROUTERS';
const SET_WORKS_INFO = 'SET_WORKSINFO';

export {
  SET_STATUS,   // user
  SET_ROLE,
  SET_USERID,
  SET_USER_NAME,
  SET_AVATAR,
  SET_DESCRIPTION,
  SET_PROJECT_NUM,
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_ROLES,
  SET_TOKEN,
  SET_CAPTCHA,
  SET_COLLECTION,  //works
  SET_WORKS_INFO,
  SET_ROUTERS,   //permission
};