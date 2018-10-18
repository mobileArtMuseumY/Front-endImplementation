// 使用常量替代mutation事件类型在各种Flux实现中是很常见的模式。这样可以使linter之类的工具发挥作用
// 同时把这些常量放在单独的文件中可以让代码合作者对整个项目包含的mutation一目了然。

// user
export const SET_STATUS = 'SET_STATUS';
export const SET_ROLE = 'SET_ROLE';
export const SET_USERID = 'SET_USERID';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_AVATAR = 'SET_AVATAR';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_PROJECT_NUM = 'SET_PROJECT_NUM';
export const SET_FOLLOWERS = 'SET_FOLLOWERS';
export const SET_FOLLOWING = 'SET_FOLLOWING';
export const SET_ROLES = 'SET_ROLES';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_CAPTCHA = 'SET_CAPTCHA';

// export const SET_CODE = 'SET_CODE';
// export const SET_SETTING = 'SET_SETTING';

// permission
export const SET_ROUTERS = 'SET_ROUTERS';
