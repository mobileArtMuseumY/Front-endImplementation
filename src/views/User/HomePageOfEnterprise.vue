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
        >
          <img :src="address + imageUrl " class="avatar-of-business">
        </el-upload>
        <div class="verify-items" v-for="(item, index) in verifyItems" :key="index">
          <el-tooltip class="item" effect="dark" :content="item.content" placement="top">
            <svg-icon :icon="item.icon" class="verify-icon" style="color: #666666;" @click.native="toVerify(item.content)"></svg-icon>
          </el-tooltip>
        </div>
        <div class="followers-and-following">
          <!-- <span>{{ enterpriseInfo.followers }}</span>
          <span>{{ enterpriseInfo.following }}</span>-->
          <span>followers 3</span>
          <span>following 4</span>
        </div>
      </div>
      <div class="center">
        <div class="username">
          <!-- <span style="font-size: 25px;"> <strong>{{ enterpriseInfo.userName }}</strong></span> -->
          <span style="font-size: 25px;">
            <strong>Honeysyt</strong>
          </span>
        </div>
        <div class="description">
          <!-- <span>{{ enterpriseInfo.description }}</span> -->
          <textarea disabled>here is the description of me.here is the description of me.</textarea>
        </div>
      </div>
      <div class="right">
        <div class="edit-profile">
          <button @click="toVerify('完善用户信息')">编辑信息</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="main">
        <label v-if="!project.projectItem">空空如也……</label>
        <!-- <div
          class="project-item"
          v-if="project.projectItem"
          v-for="(item, index) in project.projectItem"
          :key="index"
        >
          <project-item-epitome
            :projectItem="item"
            @deleteProject="deleteProject(item.projectId)"
            @toProjectDetails="toProjectDetails(item.projectId)"
          ></project-item-epitome>
        </div> -->
      </div>
      <div class="right-bar">
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
            <div class="collect-inner-works" v-for="(item, index) in collectWorksItems">
              <span :key="index + '-name'">{{ item.studentName }}：</span>
              <span :key="index + '-works'">{{ item.works }}</span>
            </div>
            <svg-icon
              icon="more"
              class="more"
              style="color: #BCBCBC;"
              @click.native="goToCollect()"
            ></svg-icon>
            <br>
            <hr>
            <br>
            <span>项目：</span>
            <div class="collect-inner-project" v-for="(item, index) in collectProjectsItems">
              <span :key="index + '-name'">{{ item.enterpriseName }}：</span>
              <span :key="index + '-works'">{{ item.projectDescription }}</span>
            </div>
            <svg-icon
              icon="more"
              class="more"
              style="color: #BCBCBC;"
              @click.native="goToCollect()"
            ></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getProjectDataHomepage } from "@/api/project";
import { getEnterpriseInfo, getAllProjects } from "@/api/user";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      // imageUrl: "/static/images/nav/avatar.png",
      address: "http://120.79.239.141:8080/",
      headers: {
        Authorization: getToken()
      },
      imageUrl: this.enterpriseInfo.avatar,
      enterpriseInfo: "",
      collectWorksItem: "",
      collectProjectsItem: "",
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
      collectWorksItems: [
        {
          studentName: "千竹",
          works: "lalala"
        },
        {
          studentName: "千竹呀",
          works: "lalala"
        }
      ],
      collectProjectsItems: [
        {
          enterpriseName: "千竹",
          projectDescription: "lalala"
        },
        {
          enterpriseName: "千竹呀",
          projectDescription: "lalala"
        },
        {
          enterpriseName: "千竹",
          projectDescription: "lalala"
        },
        {
          enterpriseName: "千竹呀",
          projectDescription: "lalala"
        }
      ],
      info: "perfectUserInfo", // 用于接收验证信息类型
      isSelf: true,
      id: ""
    };
  },
  computed: {
    ...mapGetters(["user", "project"])
  },
  methods: {
    uploadUrl() {
      return "/api/business/avatar";
    },
    onSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message({
        type: "success",
        message: "头像上传成功！"
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
        name: "Setting",
        params: {
          info: this.info
        }
      });
    },
    goToCollect() {
      this.$router.push({
        name: "Collect"
      });
    },
    toProjectDetails(projectId) {
      console.log(`父组件进入项目详情页面：${projectId}`);
    },
    deleteProject(projectId) {
      console.log(`父组件删除：${projectId}`);
    }
  },
  mounted() {
    if (this.$route.params.id) {
      if (!(this.$route.params.id === this.user.userInfo.userId)) {
        this.isSelf = false;
        this.id = this.$route.params.id;
      }
    } else {
      this.id = this.user.userInfo.userId;
    }
    let data = {
      id: this.id
    };

    // 获取基本信息
    getEnterpriseInfo(data).then(res => {
      this.enterpriseInfo = res.data;
      console.log(this.enterpriseInfo);
      // 获取项目信息
      /**
       * 正在审核 0
       * 正在进行（招标状态、已选标）3、4
       * 完成 6
       * 失败 1、5
       */
      // 正在审核
      data = {
        id: this.id,
        status: 0
      };
      getAllProjects(data)
        .then(res => {
          this.project.pendingItems = res.data;
        })
        .catch(() => {
          console.log("获取正在审核项目失败");
        });
      // 正在进行 3
      data = {
        id: this.id,
        status: 3
      };
      getAllProjects(data)
        .then(res => {
          this.project.pendingItems = res.data;
        })
        .catch(() => {
          console.log("获取正在招标项目失败");
        });
      // 正在进行 4
      data = {
        id: this.id,
        status: 4
      };
      getAllProjects(data)
        .then(res => {
          this.project.pendingItems.push(res.data);
        })
        .catch(() => {
          console.log("获取正在招标项目失败");
        });
      // 失败 1
      data = {
        id: this.id,
        status: 1
      };
      getAllProjects(data)
        .then(res => {
          this.project.failedItems = res.data;
        })
        .catch(() => {
          console.log("获取审核失败项目失败");
        });
      // 失败 5
      data = {
        id: this.id,
        status: 5
      };
      getAllProjects(data)
        .then(res => {
          this.project.failedItems.push(res.data);
        })
        .catch(() => {
          console.log("获取过期项目失败");
        });
      // 完成
      data = {
        id: this.id,
        status: 6
      };
      getAllProjects(data)
        .then(res => {
          this.project.finishedItems = res.data;
        })
        .catch(() => {
          console.log("获取已经完成的项目失败");
        });
    });

    // 获取企业收藏信息
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  width: 100%;
  padding-top: $h-nav;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
  .background {
    position: relative;
    @include wh(100%, 30em);
    z-index: 0;
    background-image: url("/static/images/user/enterprise/landscape.jpg");
    background-size: 100% 100%;
  }
  .top {
    @include wh(85vw, 25em);
    margin-top: -13em;
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
      .verify-items {
        display: inline;
        margin: 0.5rem;
      }
    }
    .center {
      @include margin-tl(2rem, -13vw);
      .description {
        textarea {
          margin-top: 3.5rem;
          width: 30vw;
          line-height: 1rem;
          background-color: #f7f8fa;
          border: none;
          outline: none;
        }
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
      background-color: #fff;
      box-shadow: $shadow-nav;
      border-radius: 3px;
      padding: 0.5em;
      > div {
        width: 80%;
        margin: 4em auto;
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
        .more {
          float: right;
          transform: translate(50%, -1rem);
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
  @include wh(190px, 190px);
  @include margin-tl(-1rem, 1rem);
  line-height: 110px;
  text-align: center;
  border: 1px dashed #666666;
}
.avatar-of-business {
  @include wh(190px, 190px);
  transform: translate(0, -3rem);
  display: block;
  box-shadow: $shadow-work;
  border-radius: 2px;
}
</style>
