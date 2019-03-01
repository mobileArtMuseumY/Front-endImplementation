<template>
  <div class="container">
    <div class="dialog-container" v-if="worksData.waterPictureDTOList.length > 0">
      <div class="swiper-container">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(list, index) in worksData.waterPictureDTOList" :key="index">
            <img :src="address + list.attachmentWatermarkPath" alt="list.attachmentName">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <h2>作品详细信息</h2>
        <svg-icon
          icon="bookmarker"
          style="width: 30px; height:30px;"
          @click.native="goToCollect(worksData.worksId)"
          id="collect-works"
        ></svg-icon>
      </div>
      <div class="works-form-container">
        <el-form :model="worksData">
          <div class="author-container">
            <span>作者：</span>
            <a @click="goToStudentHome(worksData.studentId)">{{ worksData.loginName }}</a>
          </div>
          <el-form-item label="作品名称：">
            <el-input v-model="worksData.worksName"></el-input>
          </el-form-item>
          <el-form-item label="作品描述：">
            <div class="form-description">
              <textarea v-model="worksData.worksDescribe" placeholder="请介绍您的作品..."></textarea>
            </div>
          </el-form-item>
          <el-form-item label="报价：">
            <div class="form-budget">
              <br>
              <div
                style="border: 0.06rem solid red; display: flex; width: 250px; border-radius: 8px; border: 0.06rem solid #d7d7d7;"
              >
                <input
                  v-model="worksData.price"
                  style="outline: none; width: 100px; border: none; margin-left: 1rem;"
                >
                <div
                  class="RMB"
                  style="border: 0.06rem solid red;height: 1.8rem; margin-top: .2rem; padding-left: 2rem; padding-right: 2rem; border: none; border-left: 0.06rem solid #d7d7d7;"
                >
                  <span>RMB</span>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryWorksDetails,
  collectWorks,
  cancleCollectWorks
} from "@/api/works";

export default {
  data() {
    return {
      worksData: [],
      address: "http://120.79.239.141:8080/",
      isCollected: 0
    };
  },
  methods: {
    goToCollect(worksId) {
      // 收藏项目
      const data = {
        worksId: worksId
      };
      if (this.isCollected === 1) {
        //取消收藏
        cancleCollectWorks(data).then(res => {
          document.getElementById("collect-works").style.color = "gray";
          this.isCollected = 0;
          this.$message({
            type: "success",
            message: "取消收藏成功！"
          });
        });
      } else {
        //收藏
        collectWorks(data).then(res => {
          document.getElementById("collect-works").style.color = "red";
          this.isCollected = 1;
          this.$message({
            type: "success",
            message: "收藏作品成功！"
          });
        });
      }
    },
    goToStudentHome(studentId) {
      // 跳转作者空间
      this.$router.push({
        name: "StudentHomepage",
        params: {
          id: studentId
        }
      });
    }
  },
  mounted() {
    const data = {
      worksId: this.$route.params.worksId
    };
    queryWorksDetails(data)
      .then(res => {
        this.worksData = res.data;
        console.log(res.data);
        this.isCollected = res.data.isCollect;
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated() {
    if (this.isCollected === 1) {
      document.getElementById("collect-works").style.color = "red";
    } else {
      document.getElementById("collect-works").style.color = "gray";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  padding-top: $h-nav;
  .dialog-container {
    width: 80%;
    margin: 4rem auto;
  }
  .main {
    width: 60%;
    background-color: #fff;
    margin: 4rem auto;
    .title {
      display: flex;
      justify-content: space-between;
      color: #363636;
      margin-top: 4rem;
      padding-left: 5rem;
      padding-top: 2rem;
    }
    .works-form-container {
      width: 50%;
      margin-top: 3rem;
      padding-bottom: 2rem;
      padding-left: 5rem;
      .author-container {
        span {
          font-size: 17px;
          color: $clr-footer-font;
        }
        width: 50%;
        @include margin-tb(2rem, 2rem);
        display: flex;
        justify-content: space-between;
      }
      .form-description {
        textarea {
          width: 100%;
          overflow-x: visible;
          overflow-y: visible;
        }
      }
      .upload-works-button {
        @include margin-tb(2rem, 4rem);
      }
    }
  }
}
</style>
