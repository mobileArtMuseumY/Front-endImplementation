<template>
  <div class="setting-container">
    <el-row style="height: 100%">
      <el-col :span="4">
        <el-menu :default-active="defaultActive" router style>
          <el-menu-item style="background-color: #F2F5F8;">用户信息设置</el-menu-item>
          <!-- <el-menu-item index="1">
            <span slot="title" @click="goToSetting('UserInfo')">修改用户信息</span>
          </el-menu-item> -->
          <el-menu-item index="2">
            <span slot="title" @click="goToSetting('VerifyEmail')">验证邮箱</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" @click="goToSetting('VerifyPhone')">验证手机号</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" style="height: 100%; overflow: hidden; margin-bottom: 3rem;">
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
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    goToSetting(value) {
      if (value === "UserInfo") {
        // this.$router.push({
        //   name: "VerifyInfo"
        // });
      } else if (value === "VerifyEmail") {
        this.$router.push({
          name: "VerifyEmail"
        });
      } else {
        this.$router.push({
          name: "VerifyPhone"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.setting-container {
  padding-top: $h-nav;
  background-color: #fff;
  min-height: calc(100vh - 56px - 120px);
  width: 100%;
}
</style>
<style lang="scss">
@import "src/assets/scss/index";

.el-row {
  width: 80%;
  margin: 4rem auto;
}
.el-col {
  height: 100%;
  &:last-child {
    margin-left: 2rem;
  }
}
.el-menu {
  border: 0.06rem solid #d1d5db;
}
.el-menu-item {
  padding: 0px;
  border-bottom: 0.01rem solid #d1d5db;
  height: 40px;
  color: #5e5e5e;
  line-height: 40px;
  &:last-child {
    border-bottom: none;
  }
  &:first-child {
    background-color: #f2f5f8;
    cursor: default;
  }
}

.el-menu-item.is-active {
  background-color: #fff;
  color: #686a6c;
  border-left: 0.06rem solid red;
  &:first-child {
    background-color: #f2f5f8;
    cursor: default;
    border-left: none;
  }
}

.el-submenu__title {
  height: 20px;
  line-height: 20px;
}
</style>
