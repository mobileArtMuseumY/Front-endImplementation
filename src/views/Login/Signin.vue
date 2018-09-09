<template>
  <div class="container">
    <div class="main">
      <div class="role">
        <span id="e-clicked" @click="confirmRole('企业')">企业</span>
        <span id="s-clicked" @click="confirmRole('学生')">学生</span>
      </div>
      <div class="big-box">
        <div class="box">
         <label>昵称或邮箱：</label>
         <br>
         <br>
         <input type="text" v-model="userName" placeholder="请输入您的昵称或邮箱..." aria-label="昵称或邮箱">
      </div>
      <div class="box">
         <label>密码：</label>
         <br>
         <br>
         <input type="password" v-model="userPwd" @keyup.enter="goSigIn()" placeholder="请输入您的密码..." aria-label="密码">
      </div>
      </div>
      <div class="content">
        <p>没有注册？那就<a @click="goSignUp()">注册</a>一个吧！</p>
        <a class="right" @click="getPassword()">忘记密码</a>
      </div>
      <div class="button">
        <button @click="goSignIn()">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { enterpriseSignIn, studentSignIn } from '../../api/user';
import { set } from '../../utils/cookie';

export default {
  data() {
    return {
      input: '',
      role: '',
      userName: '',
      userPwd: '',
      logintxt: '登录',
    };
  },
  computed: {
    count() {
      return this.$store.user.login;
    },
  },
  methods: {
    confirmRole(role) {
      this.role = role;
      if (role === '企业') {
        document.getElementById('e-clicked').style.color = 'red';
        document.getElementById('s-clicked').style.color = 'gray';
        this.message('我是企业');
      } else {
        document.getElementById('s-clicked').style.color = 'red';
        document.getElementById('e-clicked').style.color = 'gray';
        this.message('我是学生');
      }
    },
    goSignIn() {
      if (!this.role) {
        this.message('请选择角色！');
        return false;
      }
      const data = {
        userName: this.userName,
        userPwd: this.userPwd,
      };
      if (!data.userName || !data.userPwd) {
        this.message('账号或密码不能为空!');
        return false;
      }
      if (this.role === '企业') {
        enterpriseSignIn(data).then(res => {
          // 将用户信息存入cookie中
          this.message('hello');
          set('token', res.msg);
          set('userName', this.userName);
          this.$router.push('/enterpriseHome');
        });
      } else {
        studentSignIn(data).then(res => {
          this.message('hello');
          set('token', res.msg);
          set('userName', this.userName);
          this.$router.push('/studentHome');
        });
      }
    },
    goSignUp() {
      this.$router.push('/signup');
    },
    message(m) {
      this.$message.error({
        message: m,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
  height: $h-signin-container;
  width: 100%;
  margin-top: 0.2rem;
  display: flex;
  background-image: url('/static/images/signin/fisherman.jpg');
  background-repeat: no-repeat;
  .main {
    position: relative;
    width: 23rem;
    height: 30rem;
    margin-top: 6rem;
    margin-left: 10%;
    padding: 0.3rem;
    box-shadow: $shadow-work;
    background-color: $clr-white;
    border-radius: 5px;
    border: 0.06rem solid $clr-border;
    .role {
      height: 2rem;
      width: 7rem;
      float: right;
      margin-top: 1rem;
      margin-right: 2rem;
    }
    .big-box {
      margin-top: 4rem;
      margin-left: 1.5rem;
      .box {
        height: 4.5rem;
        margin-bottom: 1.5rem;
        justify-content: space-between;
      }
    }
    .content {
      margin-top: 2.5rem;
      margin-left: 1.5rem;
      .right {
        margin-right: 3rem;
        float: right;
        margin-top: -1.5rem;
      }
    }
    .button {
      margin-top: 4rem;
      margin-left: 7.5rem;
    }
  }
}

span {
  cursor: pointer;
  margin: 0.6rem;
  font-size: 0.9rem;
  color: $clr-gray;
  &:hover {
    color: $clr-main;
  }
  &:visited {
    color: $clr-main;
  }
}
p {
  font-size: 11px;
  color: $clr-gray;
}

a {
  color: $clr-main;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  font-size: 12px;
  &:hover {
    color: $clr-main;
    border-bottom: 0.06rem solid $clr-main;
  }
}
</style>
