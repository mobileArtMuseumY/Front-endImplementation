<template>
  <div class="container">
    <div class="bussinessAdmin">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :with-credentials="true"
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
          <el-form ref="ruleForm" status-icon :model="ruleForm" :rules="rules" class="ruleForm">
          <el-form-item label="名称：" prop="enterpriseName">
            <el-input v-model="ruleForm.enterpriseName" placeholder="请输入您企业的名称..."></el-input>
          </el-form-item>
          <el-form-item label="登录者姓名：" prop="name" >
            <el-input v-model="ruleForm.name" placeholder="请输入您的姓名..."></el-input>
          </el-form-item>
          <el-form-item label="登录者身份证" prop="idCard" >
            <el-input v-model="ruleForm.idCard" placeholder="请输入您的身份证号码..."></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" >
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入您的密码..."></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="varifyPassword" >
            <el-input type="password" v-model="ruleForm.varifyPassword" placeholder="请确认你的密码..."></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email" >
            <el-input v-model="ruleForm.email" placeholder="请输入您的邮箱..."></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phoneNumber" >
            <el-input v-model="ruleForm.phoneNumber" placeholder="请输入您的手机号..."></el-input>
          </el-form-item>
        </el-form>
        </div>
          <input class="varify" type="text" placeholder="请输入验证码..." >
          <timer-btn ref="timerbtn" class="captcha" v-on:run="sendCode()" ></timer-btn>
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
 *   2. 在v-for展示出来后如何使用v-model，然后获取输入框中的数据         //已解决
 */

import { enterpriseSignUpV, enterpriseSignUpC, enterpriseSignUpForm, enterpriseSignUpFile } from '../../api/user';

export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.varifyPassword !== '') {
					this.$refs.ruleForm.validateField('varifyPassword');
				}
				callback();
			}
		};
		var validateVarifyPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			title: '企业注册',
			ruleForm: {
				enterpriseName: '',
				name: '',
				idCard: '',
				password: '',
				varifyPassword: '',
				mail: '',
				phoneNumber: '',
			},
			imageUrl: '',
			status: 0,
			rules: {
				enterpriseName: [
					{
						required: true,
						message: '请输入您的企业名称',
						trigger: 'blur',
					},
				],
				name: [
					{
						required: true,
						message: '请输入您的姓名',
						trigger: 'blur',
					},
				],
				idCard: [
					{
						required: true,
						message: '请输入您的身份证号码',
						trigger: 'blur',
					},
				],
				password: [
					{
						validator: validatePass,
						required: true,
						message: '请输入您的密码',
						trigger: 'blur',
					},
				],
				varifyPassword: [
					{
						validator: validateVarifyPass,
						required: true,
						message: '和输入密码不符！',
						trigger: 'blur',
					},
				],
				email: [
					{
						required: true,
						message: '请输入您的邮箱',
						trigger: 'blur',
					},
				],
				phoneNumber: [
					{
						required: true,
						message: '请输入您的手机号码',
						trigger: 'blur',
					},
					{
						min: 11,
						max: 11,
						message: '请正确输入手机号!',
					},
				],
			},
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
				this.message('Avatar picture must be JPG format!');
			}
			if (!isLt2M) {
				this.$message.error('Avatar picture size can not exceed 2MB!');
				this.message('Avatar picture size can not exceed 2MB!');
			}
			return isJPG && isLt2M;
		},
		goSignUp() {
			// 发送请求
			/***
			 * 1. 获取form中的字符, 证书
			 * 2. 发送请求
			 * 3. 跳转到邮箱验证成功页面，等待审核
			 */
			// 可以使用回调检查input的值，使用watch监听事件
      let certificate = this.imageUrl;
      // console.log(certificate);
      // console.log(certificate);
      enterpriseSignUpFile(certificate).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
			// if (status == 200) {
			// 	const captcha = this.ruleForm.captcha;
			// 	enterpriseSignUpC(captcha)
			// 		.then(res => {
			// 			const userData = {
			// 				enterpriseName: this.ruleForm.enterpriseName,
			// 				name: this.ruleForm.name,
			// 				idCard: this.ruleForm.idCard,
			// 				password: this.ruleForm.password,
			// 				varifyPassword: this.ruleForm.varifyPassword,
			// 				email: this.ruleForm.email,
			// 				phoneNumber: this.ruleForm.phoneNumber,
			// 			};
			// 			enterpriseSignUpForm(userData).then(res => {
			// 				const imageUrl = this.imageUrl;
			// 				enterpriseSignUpFile(imageUrl).then(res => {
			// 					// 跳转到邮箱验证界面
			// 				});
			// 			});
			// 		})
			// 		.catch(err => {
			// 			this.message('验证码验证失败');
			// 		});
			// } else {
			// 	this.message('获取验证码失败');
			// }
		},
		sendCode() {
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

			const phoneNumber = this.ruleForm.phoneNumber;
			enterpriseSignUpV(phoneNumber).then(res => {
				this.status = res.status;
			});
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
	height: 80%;
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
	width: 25%;
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
	width: 75%;
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
	margin-top: 5.5rem;
	margin-left: 25%;
}

.captcha {
	margin-left: 67%;
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

<style lang="scss">
.el-form-item__label {
	font-size: 0.6rem;
	line-height: 20px;
}

.el-form-item__error {
	font-size: 0.5rem;
}

.el-form-item.is-success .el-input__inner {
	border-color: #8fb5f2;
}

.el-input__inner {
  height: 32px;
}

.el-form-item.is-required .el-form-item__label:before {
	content: '';
	color: #f56c6c;
	margin-right: 4px;
}

.el-form-item.is-success .el-input__validateIcon {
	color: #8fb5f2;
}
</style>
