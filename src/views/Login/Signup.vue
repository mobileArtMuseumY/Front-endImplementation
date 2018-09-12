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
      <div class="certificate-content">
        <label>上传工商管理登记证</label>
      </div>
    </div>
    <div class="main">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
          <div class="form">
            <label>名称：</label>
            <input type="text" placeholder="请输入您企业的名称..." v-model="form.enterpriseName">
            <label>登录者姓名：</label>
            <input type="text" placeholder="请输入您的姓名..." v-model="form.name">
            <label>登录者身份证号：</label>
            <input type="text" placeholder="请输入您的身份证号码..." v-model="form.idCard">
            <label>密码：</label>
            <input type="password" placeholder="请输入的密码..." v-model="form.password">
            <label>确认密码：</label>
            <input type="password" placeholder="请确认您的密码..." v-model="form.varifyPassword">
            <label>邮箱</label>
            <input type="email" placeholder="请输入您的邮箱..." v-model="form.mail">
            <label>手机号码</label>
            <!-- number有烦人的上下键 -->
            <input type="tel" placeholder="请输入您的手机号码..." v-model="form.phoneNumber">
        </div>
          <input class="varify" type="text" placeholder="请输入验证码..." >
          <timer-btn ref="timerbtn" class="captcha" v-on:run="sendCode" ></timer-btn>
          <Button class="signUpButton" @click="goSignUp()">注册</Button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作用：项目注册
 * 角色：企业
 * 进度：
 *   1. 样式确定                                                       //已完成
 *   2. 检测输入框文本的正确性                                          //未完成
 *   3. 正确发送请求                                                   //未完成
 * 问题；
 *   1. 如何将多个输入框用一个v-for展示出来？                           //已解决
 *   2. 在v-for展示出来后如何使用v-model，然后获取输入框中的数据
 */

export default {
	data() {
		return {
			title: '企业注册',
			form: {
				enterpriseName: '',
				name: '',
				idCard: '',
				password: '',
				varifyPassword: '',
				mail: '',
				phoneNumber: '',
			},
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
		goSignUp() {
			// 发送请求
			/***
			 * 1. 获取form中的字符, 证书
			 * 2. 判断字符格式
			 * 3. 发送请求
			 * 4. 跳转到邮箱验证成功页面，等待审核
			 */
      let data = {
        enterpriseName: this.form.enterpriseName,
        name: this.form.name,
        idCard: this.form.idCard,
        password: this.form.password,
        varifyPassword: this.form.varifyPassword,
        mail: this.form.mail,
        phoneNumber: this.form.phoneNumber,
      };
      // 可以使用回调检查input的值，使用watch监听事件
      let certificate = this.imageUrl;
      // if()
      

		},
		sendCode: function() {
			this.$refs.timerbtn.setDisabled(true);
			// 向服务器发送请求
			/**
			 * data为参数
			 * if(data.status) {
			 *   this.$refs.timerbtn.start();
			 * } else {
			 *   this.$refs.timerbtn.stop();
			 * }
			 */
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';
@import url('//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css');

.container {
	height: $h-signup-container;
	width: 100%;
	margin-top: 0.2rem;
	display: flex;
	background-image: url('/static/images/signup/background.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-color: $clr-white;
	opacity: 0.9;
}

.container .bussinessAdmin {
	position: relative;
	padding: 3rem;
	width: 20%;
	height: 18rem;
	margin-top: 2rem;
}

.container .main {
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

.main .title {
	position: relative;
	font-size: 30px;
	font-weight: bold;
	width: 20%;
	margin-left: 20%;
	color: #363636;
}

.main .content {
	position: relative;
	height: 80%;
	width: 80%;
	display: flex;
	flex-direction: column;
}

.content .form {
	width: 30%;
	margin-top: 4rem;
	margin-left: 25%;
}

input {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

label {
	color: #666666;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.content .varify {
	border-radius: 0%;
	border: none;
	border-bottom: 0.05rem solid $clr-border;
	margin-top: 3rem;
	margin-left: 25%;
}

.content .varify ::-webkit-input-placeholder {
	color: $clr-black;
	font-size: 12px;
}

.content .signUpButton {
	width: $w-input;
	margin-top: 5rem;
	margin-left: 25%;
}


.captcha {
	margin-left: 50%;
	margin-top: -65px;
}

.certificate-content {
	margin-top: 2rem;
	margin-left: 20%;
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
	width: 205px;
	height: 110px;
	line-height: 110px;
	text-align: center;
	border: 1px dashed #666666;
	margin-left: 10%;
	margin-top: 10%;
	box-shadow: $shadow-work;
}
.avatar {
	width: 205px;
	height: 110px;
	display: block;
	box-shadow: $shadow-work-hover;
	margin-left: 10%;
	margin-top: 10%;
}
</style>
