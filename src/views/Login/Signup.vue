<template>
  <div class="container">
    <div class="bussinessAdmin">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="certificate">
        <img class="image" src="/static/images/signup/certificate.png">
      </div>
      <div class="certificate-content">
        <icon class="icon" name="upload" scale="2"></icon>
        <label>上传工商管理登记证</label>
      </div>
    </div>
    <div class="main">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
        <div class="form" v-for="item in items" :key="item">
          <label>{{item.label}}</label>
          <br>
          <br>
          <input type = item.type :placeholder = item.placeholder>
        </div>
        <input class="varify" type="text" placeholder="请输入6位数字的验证码..." >
        <Button class="signUpButton" @click="signUp()">注册</Button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '企业注册',
      items: [
        {
          label: '名称：',
          type: 'text',
          placeholder: '请输入您企业的名称...',
        },
        {
          label: '登录者姓名：',
          type: 'text',
          placeholder: '请输入您的姓名...',
        },
        {
          label: '登录者身份证号码：',
          type: 'text',
          placeholder: '请输入您18位身份证号码...',
        },
        {
          label: '邮箱：',
          type: 'text',
          placeholder: '请输入您的邮箱...',
        },
        {
          label: '密码：',
          type: 'password',
          placeholder: '请输入您的密码...',
        },
        {
          label: '确认密码：',
          type: 'password',
          placeholder: '确认您的密码...',
        },
        {
          label: '手机号码：',
          type: 'number',
          placeholder: '请输入您的手机号码...',
        },
      ],
      imageUrl: '',
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};

</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");

.container {
  height: $h-signup-container;
  width: 100%;
  margin-top: .2rem;
  display: flex;
  background-image: url('/static/images/signup/background.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  background-color: $clr-white;
  opacity: .9;
}

.container
.bussinessAdmin {
  position: relative;
  padding: 3rem;
  width: 20%;
  height: 18rem;
  margin-top: 2rem;
}

.container
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  height: 75%;
  margin-top: 10rem;
  margin-left: 1rem;
  box-shadow: $shadow-work;
  background-color: $clr-white;
  border-radius: 5px;
  border: 0.06rem solid $clr-border;
}

.main
.title {
  position: relative;
  font-size: 30px;
  font-weight: bold;
  width: 20%;
  margin-left: 25%;
  color: #363636;
}

.main
.content {
  position: relative;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content
.form {
  width: 50%;
  margin-top: 2rem;
  margin-left: 25%;
}

.content
.varify {
  border: none;
  border-bottom: .1rem solid $clr-border;
  background-color: transparent;
  margin-top: 3rem;
  margin-left: 25%;
}

.content
.varify
::-webkit-input-placeholder {
  color: $clr-black;
  font-size: 12px;
}

.content
.signUpButton {
  width: $w-input;
  margin-top: 3rem;
  margin-left: 25%;
}

label {
  color: #666666;
}

.image {
  box-shadow: $shadow-work-hover;
  margin-left: 10%;
}

.certificate-content {
  margin-top: 2rem;
  margin-left: 20%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
