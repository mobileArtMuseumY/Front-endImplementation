<template>
  <div class="project-item">
    <div class="left-time-container">
      <div class="empty"></div>
      <div class="left-time">
        <label>剩余{{ projectItem.leftTime }}天</label>
      </div>
    </div>
    <div class="project-content">
      <div @click="goToProjectDetails(projectItem.projectId)">
        <p class="project-description">{{ projectItem.projectDescription }}</p>
      </div>
      <div class="project-content-footer">
        <div class="empty"></div>
        <div class="solid">
          <svg-icon
            icon="hammer"
            style="height: 30px; width: 30px; cursor: default;"
            v-if="!(status === 0)"
          ></svg-icon>
          <label
            style="font-size: 17px; margin: 0.2rem 0.4rem auto 0.4rem;"
            v-if="!(status === 0)"
          >{{ projectItem.bidCount }}</label>
          <svg-icon
            icon="clock"
            style="color: red; height: 30px; width: 30px; cursor: default;"
            v-if="status === 0"
          ></svg-icon>
          <svg-icon
            icon="delete"
            @click.native="goToDeleteProject(projectItem.projectId)"
            style="color: #666666; height: 23px; width: 23px;"
          ></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 企业主页中展示的项目
 */

export default {
  props: {
    projectItem: "",
    status: Number
  },
  data() {
    return {};
  },
  methods: {
    goToProjectDetails(projectId) {
      this.$emit("toProjectDetails", projectId);
      this.$router.push({
        name: "ProjectDetails",
        params: {
          id: projectId
        }
      });
    },
    goToDeleteProject(projectId) {
      this.$emit("deleteProject", projectId);
      console.log("就快要删除啦？？");
      // 执行删除项目操作
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.project-item {
  padding: 1rem 1rem 2rem 1rem;
  .left-time-container {
    display: flex;
    justify-content: space-between;
    .empty {
      width: 20%;
    }
    .left-time {
      margin-bottom: 0.5rem;
    }
  }
  .project-content {
    border: $border;
    padding: 1rem;
    border-radius: 5px;
    .project-description {
      line-height: 23px;
      width: 35vw;
      margin-bottom: 2rem;
      overflow: hidden;
      cursor: pointer;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: $clr-footer-font;
    }
    .project-content-footer {
      display: flex;
      justify-content: space-between;
      .empty {
        width: 20%;
      }
      .solid {
        display: flex;
      }
    }
  }
}
</style>

