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
          <img :src="address + enterpriseInfo.avatar " class="avatar-of-business">
        </el-upload>
        <div class="verify-items" v-for="(item, index) in verifyItems" :key="index">
          <el-tooltip class="item" effect="dark" :content="item.content" placement="top">
            <svg-icon
              :icon="item.icon"
              class="verify-icon"
              style="color: #666666;"
              @click.native="toVerify(item.content)"
            ></svg-icon>
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
        <label
          v-if="!project.pendingItems && !project.biddingItems && !project.biddenItems && !project.notPassItems"
        >空空如也……</label>
        <div class="nav-of-enterprise">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-submenu index="1">
              <template slot="title">项目管理</template>
              <el-menu-item index="1-1">
                <span slot="title" @click="goToProject('0')">正在审核的项目</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <span slot="title" @click="goToProject('3')">正在招标的项目</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <span slot="title" @click="goToProject('4')">已选标的项目</span>
              </el-menu-item>
              <el-menu-item index="1-4">
                <span slot="title" @click="goToProject('10')">审核未通过</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <span slot="title" @click="goToOrder()">订单管理</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">收藏</template>
              <el-menu-item index="3-1">
                <span slot="title" @click="goToCollect('works')">作品</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <span slot="title" @click="goToCollect('project')">项目</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <div class="line"></div>
        </div>
        <div class="content-container" style="padding-top: 2rem;">
          <!-- 项目展示部分 -->
          <span style="margin-left: 1rem;">{{ content.title}}</span>
          <div class="project-item" v-show="status === 1">
            <div class="item-container">
              <project-item-epitome
                :projectItem="item"
                :status="content.status"
                v-for="(item, index) in content.projects "
                :key="index"
              ></project-item-epitome>
            </div>
          </div>
          <!-- 订单管理部分 -->
          <div class="order-item" v-show="status === 2">
            <el-table
              :data="orderInfo"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
              :default-sort="{prop: 'id', order: 'descending'}"
            >
              <el-table-column prop="projectName" label="项目名称"></el-table-column>
              <el-table-column prop="businessName" label="企业名称"></el-table-column>
              <el-table-column prop="worksName" label="作品名称"></el-table-column>
              <el-table-column prop="price" label="价格" sortable></el-table-column>
              <el-table-column prop="status" label="订单状态"></el-table-column>
              <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
            </el-table>
          </div>
          <!-- 收藏部分 -->
          <div class="collect-item" v-show="status === 3">
            <div class="works-container" v-if="content.status === 2">
              <works-item :works="item" v-for="(item, index) in content.projects " :key="index"></works-item>
            </div>
            <div class="projects-container" v-if="content.status === 1">
              <project-item
                :projectItems="item"
                v-for="(item, index) in content.projects "
                :key="index"
              ></project-item>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getProjectDataHomepage } from "@/api/project";
import {
  getEnterpriseInfo,
  getAllProjects,
  getEnterpriseProjectCollectInfo,
  getEnterpriseWorksCollectInfo,
  getEnterpriseOrderInfo
} from "@/api/user";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      activeIndex: "1",
      address: "http://120.79.239.141:8080/",
      headers: {
        Authorization: getToken()
      },
      imageUrl: "",
      content: {
        title: "正在审核的项目",
        projects: "",
        status: 0
      },
      status: 1, // 标记选中第几个项(1. 项目管理 2. 订单管理 3. 收藏)
      enterpriseInfo: "", // 企业基本信息
      collectWorksItems: "",
      collectProjectsItems: "",
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
      info: "perfectUserInfo", // 用于接收验证信息类型
      isSelf: true,
      id: "",
      orderInfo: []
    };
  },
  computed: {
    ...mapGetters(["user", "project"])
  },
  methods: {
    goToProject(value) {
      this.status = 1;
      switch (value) {
        case "0":
          this.content.title = "正在审核的项目";
          this.content.projects = this.project.pendingItems;
          this.content.status = 0;
          break;
        case "3":
          this.content.title = "正在招标的项目";
          this.content.projects = this.project.biddingItems;
          this.content.status = 3;
          break;
        case "4":
          this.content.title = "已选标的项目";
          this.content.projects = this.project.biddenItems;
          this.content.status = 4;
          break;
        case "10":
          this.content.title = "审核未通过的项目";
          this.content.projects = this.project.notPassItems;
          this.content.status = 10;
          break;
      }
    },
    goToOrder(value) {
      this.status = 2;
    },
    goToCollect(value) {
      this.status = 3;
      switch (value) {
        case "project":
          this.content.title = "项目";
          this.content.projects = this.collectProjectsItems;
          this.content.status = 1;
          break;
        case "works":
          this.content.title = "作品";
          this.content.projects = this.collectWorksItems;
          this.content.status = 2;
          break;
      }
    },
    uploadUrl() {
      return "/api/business/avatar";
    },
    onSuccess(res, file) {
      this.imageUrl = res.data;
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
        name: "VerifyInfo",
        params: {
          info: this.info
        }
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
    getEnterpriseInfo(data)
      .then(res => {
        this.enterpriseInfo = res.data;
        // 获取项目信息
        // 正在审核
        data = {
          id: this.id,
          status: 0
        };
        getAllProjects(data)
          .then(res => {
            this.project.pendingItems = res.data;
            // 初始化
            this.content.status = 0;
            this.content.title = "正在审核的项目";
            this.content.projects = this.project.pendingItems;
          })
          .catch(() => {
            console.log("获取正在审核项目失败");
          });
        // 正在招标 3
        data = {
          id: this.id,
          status: 3
        };
        getAllProjects(data)
          .then(res => {
            this.project.biddingItems = res.data;
          })
          .catch(() => {
            console.log("获取正在招标项目失败");
          });
        // 已选标 4
        data = {
          id: this.id,
          status: 4
        };
        getAllProjects(data)
          .then(res => {
            console.log(res.data);
            this.project.biddenItems = res.data;
          })
          .catch(() => {
            console.log("获取已选标项目失败");
          });

        // 审核未通过 10
        data = {
          id: this.id,
          status: 10
        };
        getAllProjects(data)
          .then(res => {
            this.project.notPassItems = res.data;
          })
          .catch(() => {
            console.log("获取审核未通过项目失败");
          });

        //获取订单信息
        data = {
          id: this.id
        };
        getEnterpriseOrderInfo(data)
          .then(res => {
            this.orderInfo = res.data;
            console.log(this.orderInfo);
            for (let i = 0; i < this.orderInfo.length; ++i) {
              if (this.orderInfo[i].status === 0) {
                this.orderInfo[i].status = "未支付";
              } else if (this.orderInfo[i].status === 1) {
                this.orderInfo[i].status = "已支付";
              } else if (this.orderInfo[i].status === 2) {
                this.orderInfo[i].status = "正在进行";
              } else if (this.orderInfo[i].status === 3) {
                this.orderInfo[i].status = "订单完成";
              } else if (this.orderInfo[i].status === 4) {
                this.orderInfo[i].status = "订单失败";
              }
              const date = new Date(this.orderInfo[i].gmtCreate);
              const Y = date.getFullYear() + "-";
              const M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              const D =
                date.getDate() < 10
                  ? "0" + (date.getDate() + " ")
                  : date.getDate() + " ";
              this.orderInfo[i].gmtCreate = Y + M + D;
            }
          })
          .catch(() => {
            console.log("获取企业收藏的项目失败");
          });

        // 获取企业收藏信息（项目）
        getEnterpriseProjectCollectInfo()
          .then(res => {
            this.collectProjectsItems = res.data;
          })
          .catch(() => {
            console.log("获取企业收藏的项目失败");
          });

        // 获取企业收藏信息（作品）
        getEnterpriseWorksCollectInfo()
          .then(res => {
            this.collectWorksItems = res.data;
          })
          .catch(() => {
            console.log("获取企业收藏的作品失败");
          });
      })
      .catch(() => {
        console.log("获取项目基本信息失败");
      });
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
      // border: $border;
      box-shadow: $shadow-nav;
      padding: 0.5em;
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

.works-container {
  @include margin-tb(2rem, 2rem);
  display: flex;
  flex-wrap: wrap;
  &::after {
    content: "";
    flex-grow: 999999;
  }
  > div {
    width: 15vw;
  }
}

.order-item {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
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
