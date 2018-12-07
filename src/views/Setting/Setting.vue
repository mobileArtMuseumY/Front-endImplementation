<template>
  <div class="setting-container">
    <el-row style="height: 100%">
      <el-col :span="3">
        <el-menu :default-active="defaultActive" router>
          <el-menu-item index="/setting/verify/info">修改用户信息</el-menu-item>
          <el-menu-item index="/setting/verify/email">验证邮箱</el-menu-item>
          <el-menu-item index="/setting/verify/phone">验证手机号</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="22" style="height: 100%; overflow: hidden;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
  	defaultActive: function() {
  		return this.$route.path.replace('/', '');
  	},
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.setting-container {
  padding-top: $h-nav;
  background-color: #fff;
  width: 100%;
  // height: 67vh;
  border: 0.06rem solid red;
}
</style>
<style lang="scss">
@import "src/assets/scss/index";

.setting-container {
  height: 100%;
}
.el-row{
  border: 0.06rem solid red;
  width: 80%;
  margin: 4rem auto;
  // margint-top: 6rem;
}
.el-col {
  height: 100%;
}
</style>
