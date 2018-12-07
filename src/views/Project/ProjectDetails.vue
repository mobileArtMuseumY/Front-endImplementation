<template>
  <div class="container">
    <div class="container-introduction">
      <div class="title">
        <h2>{{ projectData.projectName }}</h2>
      </div>
      <div class="container-top">
        <div class="bid-left">
          <div class="bid-container">
            <div class="bid-container-item">
              <span>竞标数</span>
              <span>{{ projectData.bidCount }}</span>
            </div>
            <div class="bid-container-item">
              <span>预算(RMB)</span>
              <span>{{ projectData.budget }}</span>
            </div>
            <div class="bid-container-item">
              <span>平均报价(RMB)</span>
              <span>{{ projectData.averagePrice }}</span>
            </div>
          </div>
        </div>
        <div class="bid-right">
          <div class="left-time-container">
            <span>所剩时长 {{ projectData.leftTime }} 天</span>
          </div>
          <button
            class="bid-button"
            @click="goToBidPage(projectData.projectId)"
            v-if="!(user.role === 'enterprise') || !projectData.myWorks"
          >投标</button>
        </div>
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
          >{{ skill.skillName }}、</li>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <h2>投标作品展示</h2>
      </div>
      <div class="container-bottom">
        <div class="student-works-details">
          <works-details-self
            :studentItem="projectData.myWorks"
            isSelf="projectData.isSelf"
            v-if="projectData.myWorks"
          ></works-details-self>
          <works-details-self
            :studentItem="works"
            v-for="(works, index) in projectData.biddingLessInfoDTOList"
            :key="index"
            isSelf="projectData.isSelf"
            v-if="projectData.biddingLessInfoDTOList.length > 0"
          ></works-details-self>
          <works-details-self
            :studentItem="works"
            v-for="(works, index) in projectData.biddingMoreInfoDTOList"
            :key="index"
            isSelf="projectData.isSelf"
            v-if="projectData.biddingMoreInfoDTOList.length > 0"
          ></works-details-self>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getProjectDataDetails } from "@/api/project";
import { studentGoToBid } from "@/api/user";

export default {
  data() {
    return {
      projectData: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToBidPage(projectId) {
      this.$router.push({
        name: "WorksBid",
        params: {
          projectId: projectId
        }
      });
    }
  },
  mounted() {
    // 获取该项目的信息
    const projectId = this.$route.params.id;
    const data = {
      projectId: projectId
    };
    console.log(data);

    getProjectDataDetails(data)
      .then(res => {
        this.projectData = res.data;
        console.log(this.projectData);
      })
      .catch(err => {
        console.log("获取项目详细失败！");
      });
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  background-color: #fff;
  border: 0.1rem solid #fff;
  padding-top: $h-nav;
  color: #5e5e5e;
  .container-introduction {
    width: 70vw;
    margin: 4rem auto;
    padding: 2rem;
    .title {
      display: flex;
      justify-content: space-between;
    }
    .container-top {
      display: flex;
      justify-content: space-between;
      border: 0.1rem solid $clr-border;
      padding: 1rem 1rem 1rem 0;
      border-radius: 6px;
      .bid-left {
        width: 60%;
        .bid-container {
          display: flex;
          > div {
            display: flex;
            flex-direction: column;
            padding: 1rem 2rem 1rem 2rem;
            border-left: 0.06rem solid $clr-footer-font;
            line-height: 2rem;
            margin-left: 1rem;
            &:first-child {
              border-left: none;
            }
          }
        }
      }
      .bid-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .left-time-container {
          color: #bcbcbc;
        }
        .bid-button {
          width: 90%;
        }
      }
    }
  }
  .container-center {
    width: 70vw;
    margin: 4rem auto;
    border: 0.1rem solid $clr-border;
    border-radius: 6px;
    > div {
      width: 80%;
      margin: 1rem auto 2rem 2rem;
    }
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
  .main {
    width: 70vw;
    margin: 4rem auto;
    // margin-bottom: 0rem;
    // border: 0.1rem solid $clr-border;
    .container-bottom {
      width: 70vw;
      border: 0.1rem solid #d7d7d7;
      border-radius: 4px;
    }
  }
}
.skill-list-container {
  .skill-item {
    display: inline;
    color: $clr-footer-font;
    margin-left: 5px;
  }
}
</style>
