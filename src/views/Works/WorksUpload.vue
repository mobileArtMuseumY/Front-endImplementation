<template>
  <div class="container">
    <div class="dialog-container" v-if="worksData.worksAttachmentList.length > 0">
      <div class="swiper-container">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(list, index) in worksData.worksAttachmentList" :key="index">
            <img :src="address + list.attachmentPath" alt="list.attachmentName">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <h2 v-if="!worksData.worksAttachmentList.length > 0">上传您的作品</h2>
        <h2 v-if="worksData.worksAttachmentList.length > 0">修改您的作品信息</h2>
      </div>
      <div class="works-form-container">
        <el-form ref="worksData" status-icon :model="worksData">
          <el-form-item label="为您的作品取个名字吧">
            <el-input v-model="worksData.worksName" placeholder="作品名称..."></el-input>
          </el-form-item>
          <el-form-item label="作品描述">
            <div class="form-description">
              <textarea v-model="worksData.worksDescribe" placeholder="请介绍您的作品..."></textarea>
            </div>
          </el-form-item>

          <div class="form-upload" v-if="!worksData.worksAttachmentList.length > 0">
            <el-upload
              ref="upload"
              :action="uploadUrl()"
              :headers="headers"
              accept="image/jpeg, image/png"
              :limit="3"
              :on-exceed="handleExceed"
              :auto-upload="true"
              :before-upload="onBeforeUpload"
              :on-success="onSuccess"
              :multiple="true"
              list-type="picture"
            >
              <el-button class="upload-file-button">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">可上传任何能帮助你描述项目的图片</div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </div>
          <el-form-item label="报价">
            <br>
            <div
              class="form-budget"
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
          </el-form-item>
        </el-form>
        <button
          class="upload-works-button"
          @click="uploadWorks()"
          v-if="!worksData.worksAttachmentList.length > 0"
        >上传作品</button>
        <button
          class="upload-works-button"
          @click="modifyWorks(worksData.id)"
          v-if="worksData.worksAttachmentList.length > 0"
        >修改作品</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getSkillListAll } from "@/api/project";
import { getToken } from "@/utils/auth";
import { getWorksById, modifyWorks, uploadWorks } from "@/api/works";

export default {
  data() {
    return {
      headers: {
        Authorization: getToken()
      },
      address: "http://120.79.239.141:8080/",
      worksDialogVisible: true,
      worksData: {
        worksName: "",
        worksDescribe: "",
        price: "",
        worksAttachmentList: []
      },
      projectAttachment: "",
      projectAttachmentList: []
    };
  },
  methods: {
    uploadUrl() {
      return "/api/works/upload";
    },
    handleExceed() {
      this.$message({
        type: "error",
        message: `最多只能上传3个文件！,共选择了 ${
          this.fileList.length
        } 个文件！`
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
    onSuccess(response) {
      // 获取图片上传后的respones
      this.projectAttachment = response.data[0];
      this.projectAttachmentList.push(this.projectAttachment);
      this.$message({
        type: "success",
        message: `文件上传成功！`
      });
    },
    uploadWorks() {
      // 提交上传作品表单
      if (!this.worksData.worksAttachmentList) {
        this.$message({
          type: "warning",
          message: "作品上传必须上传1-3个作品哦"
        });
        return;
      }
      this.worksData.worksAttachmentList = this.projectAttachmentList;
      const data = this.worksData;
      uploadWorks(data)
        .then(res => {
          this.$message({
            type: "success",
            message: "作品上传成功！"
          });
          this.$router.push({
            name: "StudentHomepage"
          });
        })
        .catch(err => {
          console.log("作品上传表单失败！");
        });
    },
    modifyWorks(worksId) {
      // 提交更新之后的表单
      const data = this.worksData;
      modifyWorks(data)
        .then(res => {
          this.$message({
            type: "success",
            message: "作品信息修改成功！"
          });
          this.$router.push({
            name: "StudentHomepage"
          });
        })
        .catch(err => {
          console.log("作品更新失败！");
        });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      const data = {
        worksId: this.$route.params.id
      };
      getWorksById(data)
        .then(res => {
          this.worksData = res.data;
        })
        .catch(err => {
          console.log("查看作品详情失败！");
        });
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

.form-upload {
  padding-bottom: 1rem;
  @include margin-tb(2rem, 4rem);
  border: $border;
  border-radius: 4px;
}

.upload-file-button {
  @include margin-tl(0.5rem, 1rem);
  margin-bottom: 1rem;
  padding-left: 1rem;
  line-height: 50%;
  text-align: center;
  border: none;
  border: $border;
  width: 5rem;
}

.el-upload__tip {
  margin-left: 1rem;
}
.publish-project-button {
  margin-top: 5rem;
}
</style>

