<template>
  <div class="container">
    <div
      class="title"
      style="padding-top: 1rem; padding-bottom: 1rem; border-bottom: 0.02rem solid #D1D5DB;"
    >
      <span style="color: #48494B;">手机号验证</span>
    </div>
    <div class="form-container">
      <el-form :model="form">
        <el-form-item label="手机号：">
          <el-input v-model="form.email"></el-input>
          <button @click="getCaptcha()" class="captcha-button">获取验证码</button>
        </el-form-item>
        <el-form-item label="验证码：" style="transform: translateY(-1.5rem);">
          <el-input v-model="form.captcha"></el-input>
        </el-form-item>
        <button class="check-button" @click="sendForm()">确定</button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { enterpriseVerifiedEmail, enterpriseGetCaptcha } from "@/api/user";

export default {
  data() {
    return {
      form: {
        phone: "",
        captcha: ""
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    getCaptcha() {
      const data = {
        email: this.form.phone
      };
      enterpriseGetCaptcha(data)
        .then(res => {
          if (res.status === 500) {
            this.$message({
              type: "warning",
              message: "该邮箱已经被注册过了，请重新输入！"
            });
          } else {
            this.$message({
              type: "success",
              message: "邮件已发送，请注意查收"
            });
          }
        })
        .catch(() => {
          console.log("邮件发送失败");
        });
    },
    sendForm() {
      const data = {
        email: this.form.phone,
        code: this.form.captcha
      };
      enterpriseVerifiedEmail(data)
        .then(res => {
          this.$message({
            type: "success",
            message: "邮箱修改成功"
          });
        })
        .catch(() => {
          console.log("邮箱修改失败");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  .form-container {
    display: flex;
    margin-top: 3rem;
    width: 70%;
    .captcha-button {
      transform: translate(20rem, -2.5rem);
      width: 100px;
    }
    .check-button {
      width: 100px;
    }
  }
}
</style>
