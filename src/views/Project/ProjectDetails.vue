<template>
  <div class="container">
    <div class="main">
      <div class="title">
        <h2>{{ projectData.projectName }}</h2>
      </div>
      <div class="container-top">
        <div class="bid-container-item">
          <span>竞标数：</span>
          <span>{{ projectData.bidCount }}</span>
        </div>
        <div class="bid-container-item">
          <span>预算(RMB)：</span>
          <span>{{ projectData.budget }}</span>
        </div>
        <div class="bid-container-item">
          <span>平均报价(RMB)：</span>
          <span>{{ projectData.averagePrice }}</span>
        </div>
        <div class="leftTime-container">
          <span>所剩时长 {{ projectData.leftTime }} 天</span>
        </div>
      </div>
      <div class="container-center">
        <div class="title">
          <h3>项目描述</h3>
        </div>
        <div class="description-container">
          <p>{{ projectData.projectDescription }}</p>
        </div>
        <div class="expected-time-container">
          <span>项目工期数：</span>
          <span>{{ projectData.expectedTime }}</span>
        </div>
        <div class="skill-list-container">
          <span>所需技能：</span>
          <div class="skill-list-container">
            <li
              v-for="skill in projectData.skillList"
              :key="skill.id"
              class="skill-item"
            >{{ skill.skillName }}</li>
          </div>
        </div>
      </div>
      <div class="container-bottom">
        <div class="student-works-details">
          <!-- <works-details-self :studentItems="projectData.biddingLessInfoDTOList"></works-details-self>
        <works-details-self :studentItems="projectData.biddingLessInfoDTOList"></works-details-self>
          <works-details-self :studentItems="projectData.biddingLessInfoDTOList"></works-details-self>-->
        </div>
      </div>
    </div>
  </div>
</template>


<script src="static/jsonlint.js"></script>
<script>
import { mapGetters } from "vuex";
import { getProjectDataDetails } from "@/api/project";

export default {
  data() {
    return {
      projectData: ""
    };
  },
  methods: {},
  mounted() {
    // 获取该项目的信息
    const projectId = this.$route.params.id;
    console.log(projectId);
    const data = {
      projectId: projectId
    };
    getProjectDataDetails(data)
      .then(res => {
        this.projectData = res.data;
      })
      .catch(err => {
        console.log("获取项目详细失败！");
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  padding-top: $h-nav;
  .main {
    width: 70vw;
    // margin-bottom: 3rem;
    // height: 80vw;
    margin: 4rem auto;
    background-color: $clr-white;
    padding: 2rem;
    > div {
      @include margin-tl(3rem, 3rem);
    }
    .title {
      margin-top: 2rem;
    }
    .container-top {
      display: flex;
      > div {
        border-left: 0.1rem solid $clr-border;
        @include wh(12rem, 3rem);
        line-height: 3rem;
        text-align: center;
      }
    }
    .container-center {
      .description-container {
        padding-bottom: 1rem;
      }
      .expected-time-container {
        margin-bottom: 1rem;
      }
      .skill-list-container {
        display: flex;
      }
    }
  }
}
</style>
