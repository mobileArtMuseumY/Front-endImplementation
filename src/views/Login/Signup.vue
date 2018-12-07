<template>
  <div class="container">
    <div class="bussiness-admin">
      <el-upload
        ref="upload"
        :action="uploadUrl()"
        accept="image/jpeg,image/png"
        :auto-upload="true"
        :with-credentials="true"
        :show-file-list="false"
        :before-upload="onBeforeUpload"
        :on-success="onSuccess"
        :multiple="false">
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
          <el-form ref="ruleForm" status-icon :model="ruleForm" :rules="rules">
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
          <input class="varify-input" type="text" v-model="ruleForm.captcha" placeholder="请输入验证码..." >
          <timer-btn ref="timerbtn" class="captcha-button" :run="sendCode()" ></timer-btn>
          <div class="check-box">
            <el-checkbox v-model="checked"><router-link to="/signUpAgreement">同意该协议</router-link></el-checkbox>
          </div>
          <Button class="signUp-button" @click="goToSignUp()">注册</Button>
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
 *   2. 检测输入框文本的正确性                                          //已完成
 *   3. 正确发送请求                                                   //已完成
 * 问题；
 *   1. 如何将多个输入框用一个v-for展示出来？                           //已解决
 *   2. 在v-for展示出来后如何使用v-model，然后获取输入框中的数据         //已解决
 *   3. 表单的准确验证                                                //未解决
 */

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
				captcha: '',
			},
			checked: true,         // 协议是否被选中
			imageUrl: '',
			status: 0,
			businessAttachment: '',
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
		uploadUrl() {
			return '/api/business/register/upload';
		},
		onSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
			this.businessAttachment = res.data;
		},
		onBeforeUpload(file) {
			const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png';
			const isL1M = file.size / 1024 / 1024 < 3;

			if (!isIMAGE) {
        this.$message({
          type: 'error',
          message: '上传文件只能是jpeg/png格式!'
        });
				return false;
			}
			if (!isL1M) {
        this.$message({
          type: 'error',
          message: '上传文件大小不能超过1M!'
        });
				return false;
			}
			return isIMAGE && isL1M;
		},
		goToSignUp() {
      if(!this.checked){
        this.$message({
          type: 'error',
          message: '非常抱歉，您需同意我们的协议才可以注册！'
        });
        return ;
      }
			// 发送请求
			const captcha = this.ruleForm.captcha;
			const userData = {
				enterpriseName: this.ruleForm.enterpriseName,
				name: this.ruleForm.name,
				idCard: this.ruleForm.idCard,
				password: this.ruleForm.password,
				varifyPassword: this.ruleForm.varifyPassword,
				email: this.ruleForm.email,
				phoneNumber: this.ruleForm.phoneNumber,
				businessAttachment: this.businessAttachment,
			};
			const data = {
				captcha,
				userData,
			};
			this.$store.dispatch('SendCaptcha', data);
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';
@import url('//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css');

.container {
  // @include wh(100%, $h-signup-container);
  width: 100%;
	padding-top: $h-nav;
	display: flex;
	background-image: url('/static/images/signup/background.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-color: $clr-white;
	opacity: 0.9;
}

.bussiness-admin {
	position: relative;
	@include margin-tl(5em, 2em);
	@include wh(20vw, 14rem);
}

.certificate-content {
	@include margin-tl(2em, 20%);
}

.main {
	display: flex;
	flex-direction: column;
	justify-content: center;
  // @include wh(45vw, $h-signup-container - $h-footer * 2 + 10rem);
  width: 45vw;
  margin-bottom: 3rem;
	@include margin-tl(15em, 2em);
	box-shadow: $shadow-work;
	background-color: $clr-white;
	border-radius: 5px;
}

.title {
	font-size: 30px;
	font-weight: bold;
  width: 25%;
  margin-top: 4rem;
	margin-left: 20%;
	color: #363636;
}

.content {
  // @include wh(80%, 80%);
  width: 80%;
	display: flex;
	flex-direction: column;
}

.form {
	width: 75%;
	@include margin-tl(4em, 25%);
}

input {
	@include margin-tl(1em, 2em);
}

label {
	color: $clr-label;
	@include margin-tb(3em, 3em);
}

.varify-input {
	width: 73%;
	border-radius: 0%;
	border: none;
	border-bottom: $border;
  @include margin-tl(3em, 25%);
  outline: none;
}

.varify-input ::-webkit-input-placeholder {
	color: $clr-black;
	font-size: 12px;
}

.signUp-button {
	width: 73%;
  @include margin-tl(.5em, 25%);
  margin-bottom: 5rem;
}

.captcha-button {
  @include margin-tl(-30px, 73%);
}

.check-box {
  margin-left: 25%;
}

.avatar-uploader .el-upload {
	border: 1px dashed $clr-white;
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
	color: $clr-label;
	@include wh(205px, 110px);
	line-height: 110px;
	text-align: center;
	border: 1px dashed $clr-label;
	@include margin-tl(10%, 10%);
	box-shadow: $shadow-work;
}

.avatar {
	display: block;
	@include wh(205px, 110px);
	@include margin-tl(10%, 10%);
	box-shadow: $shadow-work-hover;
}
</style>

<style lang="scss">
@import 'src/assets/scss/index';

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

.el-checkbox__input.is-checked + .el-checkbox__label {
	color: $clr-gray;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
	color: #fff;
  background-color: $clr-main;
	border-color: $clr-main;
}

.el-checkbox__inner:hover {
	border-color: $clr-main;
}
</style>
