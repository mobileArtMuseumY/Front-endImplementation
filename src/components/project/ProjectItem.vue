<template>
  <div class="project-item">
    <div class="top">
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between;">
          <img
            :src="address + projectItems.avatar"
            v-show="projectItems.avatar"
            style="width: 70px; height: 70px; color: #5E5E5E; border-radius: 50%;"
            alt="businessAvatar"
            class="avatar-of-business"
            v-if="isAvatar"
          >
          <svg-icon
            icon="user"
            style="width: 70px; height: 70px; color: #5E5E5E; "
            class="avatar-of-business"
            v-show="!projectItems.avatar"
            v-if="isAvatar"
          ></svg-icon>
          <a
            class="a"
            @click="goToProjectDetails(projectItems.projectId)"
            style="margin-left: 2rem; color: #5E5E5E;"
            v-if="isAvatar"
          >
            <strong>{{ projectItems.projectName }}</strong>
          </a>
          <a
            class="a"
            @click="goToProjectDetails(projectItems.id)"
            style="margin-left: 2rem; color: #5E5E5E;"
            v-if="!isAvatar"
          >
            <strong>{{ projectItems.projectName }}</strong>
          </a>
        </div>
        <label style="color: red;">
          <strong>￥{{ projectItems.budget }}</strong>
        </label>
      </div>
      <a
        class="a"
        @click="goToBusinessHome(projectItems.businessId)"
      >{{ projectItems.businessName }}</a>
    </div>
    <p style="color: #5E5E5E;">{{ projectItems.projectDescription }}</p>
    <div class="bottom">
      <ul v-if="projectItems.skillList">
        <div class="skill-list-container">
          <li
            v-for="skill in projectItems.skillList"
            :key="skill.id"
            class="skill-item"
          >{{ skill.skillName }}、</li>
        </div>
      </ul>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
        <div>
          <label>{{ projectItems.gmtCreate }}</label>
          <label style="margin-left: 2rem; color: #5E5E5E;" v-if="isAvatar">剩余 {{ projectItems.leftTime }} 天</label>
        </div>
        <a @click="goToProjectDetails(projectItems.projectId)" v-if="isAvatar">查看详情</a>
        <a @click="goToProjectDetails(projectItems.id)" v-if="!isAvatar">查看详情</a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 浏览项目中的项目item
 */
import { mapGetters } from "vuex";

export default {
  props: {
    projectItems: ""
  },
  data() {
    return {
      address: "http://120.79.239.141:8080/",
      role: "passer",
      isAvatar: false,  // 利用有无头像判断是“浏览项目”中的还是企业首页“收藏项目”中的
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    console.log(this.projectItems)
    this.role = this.user.role;
    if(this.projectItems.avatar) {
      this.isAvatar = true;
    } else {
      this.isAvatar = false;
    }
  },
  methods: {
    goToBusinessHome(businessId) {
      if (this.role === "passer") {
        this.$message({
          message: "您需要先登录才能查询项目详情哦~",
          type: "warning"
        });
        return;
      } else {
        this.$router.push({
          name: "EnterpriseHomepage",
          params: {
            id: businessId
          }
        });
      }
    },
    goToProjectDetails(projectId) {
      if (this.role === "passer") {
        this.$message({
          message: "您需要先登录才能查询项目详情哦~",
          type: "warning"
        });
        return;
      } else {
        this.$router.push({
          name: "ProjectDetails",
          params: {
            id: projectId
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.project-item {
  padding: 1rem;
  border-top: $border;
  .skill-list-container {
    .skill-item {
      display: inline;
      color: $clr-footer-font;
      margin-left: 5px;
      &:first-child {
        margin-left: -40px; // 为什么0的时候不是最左边？
      }
    }
  }
}
</style>

