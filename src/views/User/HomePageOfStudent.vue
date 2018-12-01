<template>
  <div class="container">
    <div class="background">
      <!-- <img src="/static/images/user/enterprise/landscape.jpg" alt="background"> -->
    </div>
    <div class="top">
      <div class="left">
        <el-upload
          ref="upload"
          :action="uploadUrl()"
          accept="image/jpeg, image/png"
          :auto-upload="true"
          :with-credentials="true"
          :show-file-list="false"
          :before-upload="onBeforeUpload"
          :on-success="onSuccess"
          :multiple="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar-of-student">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <div class="verify-items" v-for="(item, index) in verifyItems" :key="index">
          <el-tooltip class="item" effect="dark" :content="item.content" placement="top">
            <svg-icon :icon="item.icon" class="verify-icon" style="color: #666666;"></svg-icon>
          </el-tooltip>
        </div> -->
        <div class="followers-and-following">
          <!-- <span>{{ user.userInfo.followers }}</span>
          <span>{{ user.userInfo.following }}</span>-->
          <span>followers 3</span>
          <span>following 4</span>
        </div>
      </div>
      <div class="center">
        <div class="username">
          <!-- <span style="font-size: 25px;"> <strong>{{ user.userInfo.userName }}</strong></span> -->
          <span style="font-size: 25px;">
            <strong>Honeysyt</strong>
          </span>
        </div>
        <div class="description">
          <!-- <span>{{ user.userInfo.description }}</span> -->
          <textarea disabled>here is the description of me.here is the description of me.</textarea>
        </div>
      </div>
      <div class="right">
        <div class="edit-profile">
          <button>编辑信息</button>
        </div>
      </div>
      <div ></div>
    </div>
    <div class="bottom">
      <div class="main">
        <!-- <label v-if="!project.projectItem">空空如也……</label> -->
        <h2>作品展示</h2>
        
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
import Message from 'element-ui';

export default {
  data() {
    return {
      imageUrl: "/static/images/nav/avatar.png",
      // imageUrl: user.userInfo.avatar,
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
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.businessAttachment = res.data;
      Message({
        type: 'success',
        message: '上传成功！'
      });
    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || file.type === "image/png";
      const isL1M = file.size / 1024 / 1024 < 3;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是jpeg/png格式!");
        return false;
      }
      if (!isL1M) {
        this.$message.error("上传文件大小不能超过1M!");
        return false;
      }
      return isIMAGE && isL1M;
    }
  },
  mounted: {
    getStudentInfo() {
      // this.$store.dispatch('GetStudentInfo');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  // @include wh(100%, 60rem);
  width: 100%;
  padding-top: $h-nav;
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
      // background-color: #fff;
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
  @include wh(190px, 180px);
  @include margin-tl(-1rem, 1rem);
  line-height: 110px;
  text-align: center;
  border: 1px dashed #666666;
}
.avatar-of-student {
  @include wh(190px, 180px);
  @include margin-tl(-1rem, 1rem);
  display: block;
  box-shadow: $shadow-work;
  border-radius: 2px;
}
</style>
