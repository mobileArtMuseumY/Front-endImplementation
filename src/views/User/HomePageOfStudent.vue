<template>
  <div class="container">
    <div class="background"></div>
    <div class="top">
      <div class="left">
        <el-upload
          ref="upload"
          :action="uploadUrl()"
          :headers="headers"
          accept="image/jpeg, image/png"
          :auto-upload="true"
          :with-credentials="true"
          :show-file-list="false"
          :before-upload="onBeforeUpload"
          :on-success="onSuccess"
          :multiple="false"
          v-if="isSelf"
        >
          <img
            :src="address + studentInfo.avatar "
            class="avatar-of-student"
            v-if="studentInfo.avatar"
          >
          <img
            src="\static\images\default\default.png"
            class="avatar-of-student"
            v-if="!studentInfo.avatar"
          >
        </el-upload>
        <div v-if="!isSelf">
          <img
            :src="address + studentInfo.avatar "
            class="avatar-of-student"
            v-if="studentInfo.avatar"
          >
          <img
            src="\static\images\default\default.png"
            class="avatar-of-student"
            v-if="!studentInfo.avatar"
          >
        </div>
        <div class="followers-and-following">
          <span>关注：{{ studentInfo.followingCount }}</span>
          <span>粉丝：{{ studentInfo.followerCount }}</span>
        </div>
        <div class="breakTime-and-orderCount">
          违约次数/订单数：
          <span>{{ studentInfo.breakTime }}/{{ studentInfo.orderCount }}</span>
        </div>
      </div>
      <div class="center">
        <div class="username">
          <span style="font-size: 25px;">
            <strong>{{ studentInfo.loginName }}</strong>
          </span>
        </div>
        <div class="description">
          <p>{{ studentInfo.introduction }}</p>
        </div>
      </div>
      <div class="right">
        <div class="edit-profile" v-if="isSelf">
          <button @click="toVerify('完善用户信息')">编辑信息</button>
        </div>
        <div class="edit-profile" v-if="!isSelf">
          <svg-icon
            icon="follow"
            style="width: 45px; height:45px; "
            class="follow-people"
            @click.native="goToFollow(studentInfo.id)"
            id="follow-people"
          ></svg-icon>
        </div>
      </div>
      <div></div>
    </div>
    <div class="bottom">
      <div class="main">
        <div class="main-top">
          <h2>作品展示</h2>
          <!-- 这个只有自己可见 -->
          <div class="upload" v-if="isSelf">
            <el-tooltip class="item" effect="dark" content="上传作品" placement="top">
              <a @click="goToUploadWorks" style="cursor: pointer;">
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  style="width: 20px; height: 20px; border: none;"
                ></i>
              </a>
            </el-tooltip>
          </div>
        </div>
        <div class="main-body">
          <works-items-self
            :worksItem="worksItem"
            :isSelf="isSelf"
            projectId="02"
            type="details"
            v-for="(worksItem, index) in worksItems"
            :key="index"
          ></works-items-self>
        </div>
      </div>
      <div class="right-bar" v-if="isSelf">
        <div class="right-bar-verify">
          <div class="right-bar-title">
            <span style="font-size: 18px;">
              <strong>验证</strong>
            </span>
          </div>
          <div class="verify-item-details" v-for="(item, index) in verifyItems" :key="index">
            <div class="verify-inner">
              <svg-icon :icon="item.icon" class="verify-icon" style="color: #666666 ;"></svg-icon>
              <span style="font-size: 14px; margin-left: .5rem;">
                <a @click="toVerify(item.content)">{{ item.content }}</a>
              </span>
            </div>
          </div>
        </div>
        <div class="right-bar-collect">
          <div class="right-bar-title">
            <span style="font-size: 18px;">
              <strong>收藏</strong>
            </span>
          </div>
          <div class="collect-item-details">
            <span>作品：</span>
            <div
              class="collect-item collect-inner-works"
              v-for="(item, index) in collectWorksItems"
              :key="index"
            >
              <span
                :key="index + '-name'"
                @click="goToCollectDetail('works', item.id)"
              >{{ item.worksName }}</span>
            </div>
            <br>
            <hr>
            <br>
            <span>项目：</span>
            <div
              class="collect-item collect-inner-project"
              v-for="(item, index) in collectProjectsItems"
              :key="index"
            >
              <span
                :key="index + '-works'"
                @click="goToCollectDetail('project', item.id)"
              >{{ item.projectDescription }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSelfWorks } from "@/api/works";
import {
  getStudentBasicInfo,
  getStudentWorksCollectInfo,
  getStudentProjectCollectInfo,
  followOthers,
  unFollowOthers
} from "@/api/user";
import { getUserId } from "@/utils/auth";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      worksItems: "",
      studentInfo: "",
      isSelf: true,
      id: "",
      address: "http://120.79.239.141:8080/",
      headers: {
        Authorization: getToken()
      },
      isFollowed: 0,
      verifyItems: [
        {
          icon: "user-verify",
          content: "完善用户信息"
        },
        {
          icon: "phone-verify",
          content: "手机验证"
        },
        {
          icon: "email",
          content: "邮箱验证"
        }
      ],
      collectWorksItems: "",
      collectProjectsItems: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    uploadUrl() {
      return "/api/student/avatar";
    },
    onSuccess(res, file) {
      this.studentInfo.avatar = res.data;
      this.$message({
        type: "success",
        message: "上传成功！"
      });
    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || file.type === "image/png";
      const isL1M = file.size / 1024 / 1024 < 3;

      if (!isIMAGE) {
        this.$message({
          type: "error",
          message: "上传文件只能是jpeg/png格式!"
        });
        return false;
      }
      if (!isL1M) {
        this.$message({
          type: "error",
          message: "上传文件大小不能超过1M!"
        });
        return false;
      }
      return isIMAGE && isL1M;
    },
    toVerify(content) {
      if (content === "完善用户信息") {
        this.info = "perfectUserInfo";
      } else if (content === "手机验证") {
        this.info = "verifyPhoneNum";
      } else if (content === "邮箱验证") {
        this.info = "verifyEmail";
      }
      this.$router.push({
        name: "VerifyInfo",
        params: {
          info: this.info
        }
      });
    },
    goToFollow(followedId) {
      // 关注 the-talent
      const data = {
        followedId: followedId
      };
      if (this.isFollowed === 1) {
        // 取消关注
        unFollowOthers(data)
          .then(res => {
            document.getElementById("follow-people").style.color = "gray";
            this.isFollowed = 0;
            this.$message({
              type: "success",
              message: "取消关注成功！"
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //关注
        followOthers(data)
          .then(res => {
            document.getElementById("follow-people").style.color = "red";
            this.isFollowed = 1;
            this.$message({
              type: "success",
              message: "关注成功！"
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goToCollectDetail(content, id) {
      if (content === "works") {
        // 查看作品详情
        this.$router.push({
          name: "WorksDetails",
          params: {
            worksId: id
          }
        });
      } else {
        //查看项目详情
        this.$router.push({
          name: "ProjectDetails",
          params: {
            id: id
          }
        });
      }
    },
    goToUploadWorks() {
      this.$router.push({
        name: "WorksUpload"
      });
    }
  },
  mounted() {
    // 别人进入主页时先判断是不是本人
    // 本人id和进入主页的id是否相等
    if (this.$route.params.id) {
      if (!(this.$route.params.id === this.user.userInfo.userId)) {
        this.isSelf = false;
        this.id = this.$route.params.id;
      } else {
        this.id = this.user.userInfo.userId;
        this.$store.dispatch("SetBasicInfo", "student");
      }
    } else {
      this.id = this.user.userInfo.userId;
      this.$store.dispatch("SetBasicInfo", "student");
    }
    let data = {
      id: this.id
    };
    // 获取学生基本信息
    getStudentBasicInfo(data)
      .then(res => {
        this.studentInfo = res.data;
        this.isFollowed = res.data.isFollowed;
        // 获取作品信息
        data = {
          id: this.id,
          page: 1,
          rows: 10
        };
        getSelfWorks(data)
          .then(res => {
            this.worksItems = res.data;
            // 获取学生收藏信息
            getStudentWorksCollectInfo()
              .then(res => {
                this.collectWorksItems = res.data;
                getStudentProjectCollectInfo()
                  .then(res => {
                    this.collectProjectsItems = res.data;
                  })
                  .catch(err => {
                    this.$message({
                      type: "error",
                      message: "获取学生收藏项目信息失败！"
                    });
                  })
                  .catch(err => {
                    this.$message({
                      type: "error",
                      message: "获取学生收藏作品信息失败！"
                    });
                  });
              })
              .catch(err => {
                this.$message({
                  type: "error",
                  message: "获取作品信息失败！"
                });
              });
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "获取学生基本信息失败！"
            });
          });
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "获取学生基本信息失败！"
        });
      });
  },
  updated() {
    if (!this.isSelf) {
      if (this.isFollowed === 1) {
        document.getElementById("follow-people").style.color = "red";
      } else {
        document.getElementById("follow-people").style.color = "gray";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  width: 100%;
  // padding-top: $h-nav;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
  .background {
    @include wh(100%, 30rem);
    z-index: 0;
    background-image: url("/static/images/user/enterprise/landscape.jpg");
    background-size: 100% 100%;
  }
  .top {
    @include wh(85vw, 25rem);
    margin-top: -13rem;
    background-color: #fff;
    z-index: 99;
    box-shadow: $shadow-nav;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    .left {
      padding: 2rem;
      text-align: center;
      margin-right: 2rem;
      .followers-and-following {
        display: flex;
        justify-content: space-around;
        margin-top: 1.5rem;
      }
      .breakTime-and-orderCount {
        display: flex;
        justify-content: space-around;
        margin-top: 1.5rem;
      }
      .verify-items {
        display: inline;
        margin: 0.5rem;
      }
    }
    .center {
      @include margin-tl(2rem, -13vw);
      .description {
        margin-top: 3.5rem;
        width: 30vw;
        line-height: 1rem;
        background-color: #f7f8fa;
        border: none;
        outline: none;
        padding: 0.5rem 0.5rem;
      }
    }
    .right {
      transform: translate(-3rem, 2rem);
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 4em;
    margin-bottom: 4rem;
    width: 85vw;
    .main {
      width: 60vw;
      box-shadow: $shadow-nav;
      border-radius: 3px;
      padding: 0.5em;
      .main-top {
        display: flex;
        justify-content: space-between;
        .upload {
          transform: translate(-1.5rem, -1rem);
        }
      }
      .main-body {
        display: flex;
        flex-wrap: wrap;
        &::after {
          content: "";
          flex-grow: 999999;
        }
      }
    }
    .right-bar-verify {
      @include wh(20vw, 15em);
      background-color: #fff;
      box-shadow: $shadow-nav;
      border-radius: 3px;
      > div {
        margin: auto;
        width: 80%;
        padding: 1rem;
      }
      .verify-item-details {
        border-top: 0.06rem solid $clr-gray;
      }
    }
    .right-bar-collect {
      width: 20vw;
      background-color: #fff;
      box-shadow: $shadow-nav;
      border-radius: 3px;
      margin-top: 2rem;
      padding-bottom: 2rem;
      > div {
        margin: auto;
        width: 80%;
        padding: 1rem;
      }
      .collect-item-details {
        > div {
          margin-top: 1rem;
        }
        .collect-item {
          color: $clr-gray;
          cursor: pointer;
        }
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #ffffff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #666666;
  @include wh(190px, 180px);
  @include margin-tl(-1rem, 1rem);
  line-height: 110px;
  text-align: center;
  border: 1px dashed #666666;
}
.avatar-of-student {
  @include wh(190px, 180px);
  transform: translate(0, -3rem);
  display: block;
  box-shadow: $shadow-work;
  border-radius: 2px;
}
</style>
