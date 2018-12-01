<template>
  <div class="container">
    <div class="sample">
      <img src="/static/images/signin/sunflowers.jpg" alt="sunflower">
    </div>
    <div class="main">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="rule-form">
        <el-form-item label="邮箱：" prop="email">
          <el-input type="email" v-model="ruleForm.email" placeholder="请输入您的邮箱..."></el-input>
        </el-form-item>
      </el-form>
      <div class="captcha">
        <input class="varify-input" v-model="captcha" type="text" placeholder="请输入验证码...">
        <!-- <timer-btn ref="timerbtn" class="captcha-btn" ></timer-btn> -->
        <button class="captcha-btn" @click="sendCode">获取验证码</button>

        <!-- :run="sendCode()"发送验证码有问题 -->
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="rule-form">
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入您的密码..."></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="varifyPassword">
          <el-input type="password" v-model="ruleForm.varifyPassword" placeholder="请确认你的密码..."></el-input>
        </el-form-item>
      </el-form>
      <div class="signin-button">
        <button @click="goOn()">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 作用：学生第一次登录
 * 角色：学生
 * 样式要求：暂时没有
 * 问题：
 * 1. 验证码hover的时候不变成红色(好像被input遮到了)
 * 2. 去掉input focus时的border
 */
import { Message } from 'element-ui';


export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.varifyPassword !== "") {
          this.$refs.ruleForm.validateField("varifyPassword");
        }
        callback();
      }
    };
    var validateVarifyPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        varifyPassword: "",
        email: ""
      },
      rules: {
        password: [
          {
            validator: validatePass,
            required: true,
            message: "请输入您的密码",
            trigger: "blur"
          }
        ],
        varifyPassword: [
          {
            validator: validateVarifyPass,
            required: true,
            message: "和输入密码不符！",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入您的邮箱",
            trigger: "blur"
          }
        ]
      },
      captcha: ""
    };
  },
  methods: {
    goOn() {
      const data = {
        email: this.ruleForm.email,
        code: this.captcha,
        newPassword: this.ruleForm.password,
      };
      console.log(data);
      this.$store.dispatch('SignInFirst', data);
      // // 绿色通道
      // this.$router.push({
      //   name: StudentHomepage
      // });
    },
    sendCode() {
      const data = {
        email: this.ruleForm.email,
      };
      if(!data.email) {
        Message({
          type: 'warning',
          message: '请先输入邮箱！'
        });
        return ;
      }
      this.$store.dispatch("StudentSignInFirstlySendEmail", data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  @include wh(100%, 55rem);
  padding-top: $h-nav;
  display: flex;
  .sample {
    @include margin-tl(5rem, 10vw);
    img {
      @include wh(205px, 110px);
      border-radius: 2px;
    }
  }
  .main {
    width: 25vw;
    @include margin-tl(18vw, 10vw);
    .rule-form {
      width: 20vw;
      @include margin-tl(3rem, 2rem);
    }
    .captcha {
      width: 20vw;
      margin-left: 2rem;
      border: none;
      border-bottom: $border;
      border-radius: 0%;
      outline: none;
      display: flex;
      .varify-input {
        outline: none;
        border: none;
        width: 50%;
        background-color: transparent;
      }
    }
  }
}

.signin-button {
  font-size: 0.6rem;
  @include margin-tl(5rem, 7rem);
}

.content .varify-input ::-webkit-input-placeholder {
  color: $clr-black;
  font-size: 12px;
}
</style>

<style lang="scss">
.el-form-item__label {
  font-size: 0.6rem;
  line-height: 20px;
}

.el-form-item__error {
  font-size: 0.5rem;
}

.el-form-item.is-success .el-input__inner {
  border-color: #8fb5f2;
}

.el-input__inner {
  height: 32px;
}
</style>

