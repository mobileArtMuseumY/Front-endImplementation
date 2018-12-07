<template>
  <div class="container">
    <div class="title-container">
      <span>找回密码</span>
    </div>
    <div class="main">
      <div class="form-container">
        <el-form :model="form">
          <div class="captcha-container">
            <div class="captcha-input-container">
              <el-form-item>
                <el-input v-model="form.userId" :placeholder="holder"></el-input>
              </el-form-item>
            </div>
            <button class="captcha-button" @click="getCaptcha()">获取验证码</button>
          </div>
          <el-form-item>
            <el-input v-model="form.code" placeholder="请输入验证码..."></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码..."></el-input>
          </el-form-item>
          <button class="retrieve-button" @click="retrievePassword()">确定</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  studentFPGetCaptcha,
  enterpriseFPGetCaptcha,
  studentFPSubmitForm,
  enterpriseFPSubmitForm
} from "@/api/user";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        userId: "",
        code: "",
        newPassword: ""
      },
      holder: "请输入您的邮箱...",
      role: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    getCaptcha() {
      if (this.form.userId) {
        if (this.role === "enterprise") {
          const data = {
            email: this.form.userId.trim()
          };
          enterpriseFPGetCaptcha(data)
            .then(res => {
              this.$message({
                type: "success",
                message: "验证码已发送至您的邮箱~,请注意查收^_^"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "邮箱发送失败！"
              });
            });
        } else {
          const data = {
            studentId: this.form.userId.trim()
          };
          studentFPGetCaptcha(data)
            .then(res => {
              this.$message({
                type: "success",
                message: "验证码已发送至您的邮箱~,请注意查收^_^"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "邮箱发送失败！"
              });
            });
        }
      } else {
        this.$message({
          type: "warning",
          message: `不能为空哦~，否则验证码就发不出去啦>_<..`
        });
      }
    },
    retrievePassword() {
      // 发送表单，找回密码
      if (this.role === "enterprise") {
        const data = {
          email: this.form.userId.trim(),
          code: this.form.code.trim(),
          newPassword: this.form.newPassword.trim()
        };
        enterpriseFPSubmitForm(data)
          .then(res => {
            this.$message({
              type: "success",
              message: "更改成功！"
            });
            this.$router.push({
              name: "SignIn"
            });
          })
          .catch(err => {
            console.log("密码修改失败！");
          });
      } else {
        const data = {
          studentId: this.form.userId.trim(),
          code: this.form.code.trim(),
          newPassword: this.form.newPassword.trim()
        };
        studentFPSubmitForm(data)
          .then(res => {
            this.$message({
              type: "success",
              message: "更改成功！"
            });
            this.$router.push({
              name: "SignIn"
            });
          })
          .catch(err => {
            console.log("密码修改失败！");
          });
      }
    }
  },
  mounted() {
    this.role = this.$route.params.role;
    if (this.role === "student") {
      this.holder = "请输入你的学号...";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  padding-top: $h-nav;
  > div {
    margin: 3rem auto;
  }
  .title-container {
    width: 100px;
    font-size: 25px;
  }
  .steps-container {
    width: 70%;
    border: $border;
  }
  .main {
    width: 35%;
    background-color: #fff;
    padding: 2rem;
    border-radius: 2px;
    .form-container {
      width: 80%;
      margin: 2rem auto;
      .captcha-container {
        display: flex;
        justify-content: space-between;
        .captcha-input-container {
          width: 70%;
        }
        .captcha-button {
          width: 25%;
          transform: translateY(0.5rem);
        }
      }
    }
  }
}
</style>