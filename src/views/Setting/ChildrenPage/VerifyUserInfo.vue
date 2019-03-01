<template>
  <div class="container">
    <div
      class="title"
      style="padding-top: 1rem; padding-bottom: 1rem; border-bottom: 0.02rem solid #D1D5DB;"
    >
      <span style="color: #48494B;">修改用戶信息</span>
    </div>
    <div class="form-container">
      <el-form :model="form">
        <el-form-item label="描述：">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <button class="check-button" @click="modifyInfo()">确定修改</button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getStudentBasicInfo,
  studentUpdateInfo,
  enterpriseUpdateInfo
} from "@/api/user";
import { getUserId } from "@/utils/auth";

export default {
  data() {
    return {
      form: {
        description: ""
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    modifyInfo() {
      const data = {
        introduction: this.form.description
      };
      if (this.user.role === "student") {
        studentUpdateInfo(data)
          .then(res => {
            this.$message({
              type: "success",
              message: "学生更新信息成功！"
            });
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "学生更新信息失败！"
            });
          });
      } else {
        enterpriseUpdateInfo(data)
          .then(res => {
            this.$message({
              type: "success",
              message: "企业更新信息成功！"
            });
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "企业更新信息失败！"
            });
          });
      }
    }
  },
  mounted() {
    let data = {
      id: this.user.userInfo.userId
    };
    getStudentBasicInfo(data)
      .then(res => {
        this.form.name = res.data.loginName;
        this.form.description = res.data.introduction;
      })
      .catch(err => {
        console.log("请求基本信息失败");
      });
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
    .check-button {
      margin-top: 2rem;
      width: 100px;
    }
  }
}
</style>
