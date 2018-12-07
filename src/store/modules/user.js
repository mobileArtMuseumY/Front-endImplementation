import {
  SET_STATUS,
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
} from './mutation-types';
import {
  enterpriseSignIn,
  studentSignIn,
  studentSignInFirstlySendEmail,
  studentSignInFirstlyEmailVerified,
  studentModifyPassword,
  enterpriseSignUpForm,
  enterpriseSignUpV,
  enterpriseSignUpC,
} from '@/api/user';
import { setToken, getToken, removeToken, setUserId, removeUserId, getUserId } from '@/utils/auth';
import router from '@/router';
import { setStore } from '@/utils/storage';
import { Message } from 'element-ui';


/**
 * 问题：
 * 1. state不允许外界直接获取内容？？？                                           原则上是的，需要通过getter访问
 * 2. roles的作用？？
 * 3. userInfo为什么要存在state中而不是cookie中呢？
 * 4. 为什么官方推荐mutations中的参数是对象类型？直接传输需要的值不是更好嘛？
 * 5. 我觉得存储用户token就可以了，不需要存储用户的信息。                          已删除，详情见：https://juejin.im/post/591aa14f570c35006961acac
 * 6. 用户登录部分逻辑完全一样，需要优化！！！
 * 7. 这个是获取所有角色？？为什么在用户登录的时候需要获取所有角色?直接把角色传给后端，然后把可见路由传过来不就好了嘛？
 */

const user = {
  state: {
    signIn: false,
    role: 'passer',
    userInfo: {
      userId: '',
      userName: '',
      avatar: '',
      description: '',
      projectNum: '',
      followers: '',
      following: '',
      roles: [],
      token: getToken(),
    },
    captcha: false,    // 验证码是否发送成功
  },
  mutations: {
    [SET_STATUS](state) {
      state.signIn = !state.signIn;
    },
    [SET_ROLE](state, role) {
      state.role = role;
    },
    [SET_USERID](state, userId) {
      state.userInfo.userId = userId;
    },
    [SET_USER_NAME](state, userName) {
      state.userInfo.userName = userName;
    },
    [SET_AVATAR](state, avatar) {
      state.userInfo.avatar = avatar;
    },
    [SET_DESCRIPTION](state, description) {
      state.userInfo.description = description;
    },
    [SET_PROJECT_NUM](state, projectNum) {
      state.userInfo.projectNum = projectNum;
    },
    [SET_FOLLOWERS](state, followers) {
      state.userInfo.followers = followers;
    },
    [SET_FOLLOWING](state, following) {
      state.userInfo.following = following;
    },
    [SET_ROLES](state, roles) {
      state.userInfo.roles = roles;
    },
    [SET_TOKEN](state, token) {
      state.userInfo.token = token;
    },
    [SET_CAPTCHA](state) {
      state.captcha = !state.captcha;
    }
  },
  actions: {
    // 定义提交触发更改信息的描述
    // 企业第一次登录，学生非第一次登录
    SignIn: function ({ commit, dispatch }, data) {
      if (data.role === 'enterprise') {
        return new Promise((resolve, reject) => {
          enterpriseSignIn(data.userData).then(
            res => {
              if (res.status === 500) {
                Message({
                  type: 'error',
                  message: '账号或密码错误！'
                });
              } else {
                const token = res.msg;
                commit('SET_STATUS');
                commit('SET_ROLE', data.role);
                commit('SET_TOKEN', token);
                commit('SET_USERID', res.data);
                setUserId(res.data);
                setToken(token);
                setStore('token', token);
                router.push({
                  name: 'EnterpriseHomepage',
                });
                resolve();
              }
            }
          ).catch(err => {
            console.log('企业登录失败！');
            reject(err);
          })
        });
      } else {
        return new Promise((resolve, reject) => {
          studentSignIn(data.userData).then(
            res => {
              if (res.status === 500 || res.status === 1100) {  // status为1100没有 此id
                Message({
                  type: 'error',
                  message: '账号或密码错误！'
                });
              } else {
                commit('SET_ROLE', data.role);
                const token = res.msg;
                commit('SET_STATUS');
                commit('SET_TOKEN', token);
                commit('SET_USERID', res.data);
                setUserId(res.data);
                setToken(token);
                if (res.status === 1111) {   // 返回码为 1111 学生第一次登录
                  router.push({
                    name: 'SignInFirst',
                  });
                  resolve();
                } else {
                  router.push({
                    name: 'StudentHomepage',
                  });
                  resolve();
                }
              }
            }
          ).catch(err => {
            reject(err);
          })
        });
      }
    },

    // 学生第一次登录提交邮箱信息
    StudentSignInFirstlySendEmail: function ({ commit }, data) {
      return new Promise((resolve, reject) => {
        studentSignInFirstlySendEmail(data).then(res => {
          Message({
            type: 'success',
            message: '邮件已发送！'
          });
          commit('SET_CAPTCHA');
          resolve();
        }).catch(err => {
          reject('学生第一次登录验证码发送失败！');
        });
      });
    },

    // 学生第一次提交表单信息登录
    SignInFirst: function ({ commit }, data) {
      if (user.state.captcha) {
        return new Promise((resolve, reject) => {
          studentSignInFirstlyEmailVerified(data).then(res => {
            router.push({
              name: 'SignIn',
            });
            resolve();
          }).catch(err => {
            Message({
              type: 'error',
              message: '验证码输入错误！'
            });
          });
        });
      } else {
        console.log('请重新发送验证码！');
      }
    },
    // 用户退出
    SignOut: function ({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', 'passer');
        removeToken();
        resolve();
      });
    },

    /***
     * 企业注册：
     * 1. 将手机号作为data发送给服务器
     * 2. 点击注册时，将用户输入的验证码先发送给服务器，成功则进入3
     * 3. 将表单发送给服务器
     */


    // 验证手机验证码
    VerifyCaptcha: function ({ state, dispatch }, data) {
      console.log('验证手机号')
      return new Promise((resolve, reject) => {
        enterpriseSignUpV(data.captcha).then(res => {
          dispatch('SignUp', data.userData);
          resolve();
        }).catch(err => {
          console.log('企业注册手机验证码验证失败！');
          reject(err);
        });
      });
    },

    //用户注册,表单发送
    SignUp: function (data) {
      return new Promise((resolve, reject) => {
        enterpriseSignUpForm(data).then(res => {
          console.log(res);
          console('注册成功');
          resolve();
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', role);
        setToken(role);
        getUserInfo(role).then(res => {
          const data = res.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_DESCRIPTION', data.description);
          dispatch('GenerateRoutes', data);
          resolve();
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    }
  },
};

export default user;
