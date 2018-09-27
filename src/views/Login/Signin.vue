<template>
  <div class="container" :style="style">
    <div class="main">
      <div class="role">
        <span id="e-clicked" @click="confirmRole('企业')">企业</span>
        <span id="s-clicked" @click="confirmRole('学生')">学生</span>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="ruleForm">
        <el-form-item label="昵称或邮箱：" prop="userId">
            <el-input v-model="ruleForm.userId" :placeholder = holder></el-input>
        </el-form-item>
        <el-form-item  label="密码：" prop="password" >
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入您的密码..."></el-input>
        </el-form-item>
      </el-form>
      <div class="content">
        <p>没有注册？那就 &nbsp;<a @click="goSignUp()">注册</a> &nbsp;一个吧！</p>
        <div class="right">
          <a @click="getPassword()">忘记密码</a>
        </div>
      </div>
      <div class="button">
        <button @click="goSignIn()">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 作用：网站登录
 * 角色：企业、学生
 * 样式要求：暂时没有
 * 问题：
 *   1. 发送请求不成功(连不上服务器)           已解决
 *   2. 如何存储用户状态？？？(待测试)         
 *   3. 根据角色显示相应的placeholder         已解决
 *   ```
 *   //这个是不是默认的？
     input::-ms-clear {
        display: inline;
     }
     input::-ms-reveal {
        display: inline;
     }
 *   ```
 *   4. 输入框的文本检查还未解决              已解决
 */

import axios from '../../utils/axios';
import { enterpriseSignIn, studentSignIn } from '../../api/user';
import { setToken, setUser, getToken, getUser } from '../../utils/auth';
import { modules } from '../../store/index';

export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};
		return {
			style: {},
			opacity: 0,
			input: '',
			role: '',
			ruleForm: {
				userId: '',
				password: '',
			},
			email: '',
			studentId: '',
			holder: '请输入您的邮箱...',
			rules: {
				userId: [
					{
						required: true,
						message: '账号不能为空',
						trigger: 'blur',
					},
					{
						min: 3,
						max: 26,
						message: '长度在3-16个字符之间',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						validator: validatePass,
						trigger: 'blur',
					},
				],
			},
		};
	},
	computed: {
		count() {
			return this.$store.user.login;
		},
	},
	methods: {
		confirmRole(role) {
			this.role = role;
			if (role === '企业') {
				document.getElementById('e-clicked').style.color = 'red';
				document.getElementById('s-clicked').style.color = 'gray';
				this.holder = '请输入您的邮箱...';
			} else {
				document.getElementById('s-clicked').style.color = 'red';
				document.getElementById('e-clicked').style.color = 'gray';
				this.holder = '请输入学号...';
			}
		},
		// 登录
		goSignIn() {
			if (!this.role) {
				this.message('请选择角色！');
				return false;
			}
			if (!this.ruleForm.userId || !this.ruleForm.password) {
				this.message('账号或密码不能为空!');
				return false;
			}
			if (this.role === '企业') {
				const userData = { email: this.ruleForm.userId, password: this.ruleForm.password };
				enterpriseSignIn(userData)
					.then(res => {
						setToken(res.msg);
						setUser(this.role);
						this.$router.push('/enterpriseHomePage');
					})
					.catch(err => {
						this.$message.err('账号或密码不正确！');
					});
			} else {
				const userData = { studentId: this.ruleForm.userId, password: this.ruleForm.password };
				studentSignIn(userData)
					.then(res => {
						setToken(res.msg);
						setUser(this.role);
						this.$router.push('/studentHomepage');
					})
					.catch(err => {
						this.$message.err('账号或密码不正确！');
					});
			}
		},
		goSignUp() {
			this.$router.push('/signup');
		},
		message(m) {
			this.$message.error({
				message: m,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	height: $h-signin-container;
	width: 100%;
	margin-top: 0.2rem;
	display: flex;
	background-image: url('/static/images/signin/fisherman.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	.main {
		position: relative;
		width: 23rem;
		height: 70%;
		margin-top: 8%;
		margin-left: 8%;
		box-shadow: $shadow-work;
		background-color: $clr-white;
		border-radius: 5px;
		border: 0.06rem solid $clr-border;
		.role {
			position: relative;
			height: 2rem;
			line-height: 2rem;
			width: 25%;
			margin-left: 15rem;
			margin-top: 1rem;
			overflow: hidden;
		}
		.ruleForm {
			width: 70%;
			margin-left: 3rem;
			margin-top: 2rem;
		}
		.content {
			margin-top: 3rem;
		}
		.right {
			margin-left: 16rem;
			margin-top: -2rem;
		}
	}
}

.button {
	font-size: 0.6rem;
	margin-top: 3rem;
	margin-left: 7rem;
}

span {
	cursor: pointer;
	margin: 0.6rem;
	font-size: 0.8rem;
	color: $clr-gray;
	&:hover {
		color: $clr-main;
	}
}

p {
	font-size: 11px;
	color: $clr-gray;
	width: 14rem;
	margin-left: 2.9rem;
}

a {
	color: $clr-main;
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
</style>

