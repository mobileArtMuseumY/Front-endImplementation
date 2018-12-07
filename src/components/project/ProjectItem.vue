<template>
  <div class="project-item">
    <div class="top">
      <!-- <img src="projectItems.avatar" alt="businessAvatar" class="avatar-of-business"> -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between;">
          <svg-icon
            icon="user"
            style="width: 70px; height: 70px; color: #5E5E5E; "
            class="avatar-of-business"
          ></svg-icon>
          <a
            class="a"
            @click="goToProjectDetails(projectItems.prjectId)"
            style="margin-left: 2rem; color: #5E5E5E;"
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
          <label style="margin-left: 2rem; color: #5E5E5E;">剩余 {{ projectItems.leftTime }} 天</label>
        </div>
        <a @click="goToProjectDetails(projectItems.projectId)">查看详情</a>
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
    return {};
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToBusinessHome(businessId) {
      this.$router.push({
        name: "EnterpriseHomepage",
        params: {
          id: businessId
        }
      });
    },
    goToProjectDetails(projectId) {
      if (this.user.signIn) {
        this.$router.push({
          name: "ProjectDetails",
          params: {
            id: projectId
          }
        });
      } else {
        this.$message({
          message: "您需要先登录才能查询项目详情哦~",
          type: "warning"
        });
        return;
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

