<template>
  <div class="container">
    <!-- <pro-registration-btn></pro-registration-btn> -->
    <div class="main">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
          <div class="form">
            <label>为您的项目取个名字吧</label>
            <input type="text" placeholder="创建项目名称..." v-model="form.projectName">
            <label>告诉我们更多关于您项目的信息</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作用：企业发布项目
 * 角色：企业
 * 样式要求：
 *   1. “提醒注册”栏始终置顶(获取用户登录状态确定是否展示)
 * 进度：
 *   1. 完成基本样式                                           //未完成
 *   2. “我的技能”请求发送成功                                  //未完成
 *   3. “发布时间”请求发送成功(页面打开默认)                     //未完成
 *   4. “关注度”请求发送成功                                    //未完成
 */

export default {
	data() {
		return {
			title: '告诉我们您需要完成的事情',
			form: {
				projectName: '',
			},
		};
	},
	methods: {
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

.container .main {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 45%;
	height: 75%;
	margin-top: 10rem;
	margin-left: 25%;
	box-shadow: $shadow-work;
	background-color: $clr-white;
	border-radius: 5px;
	border: 0.06rem solid $clr-border;
}

.main .title {
	position: relative;
	font-size: 20px;
	font-weight: bold;
	width: 60%;
	margin-left: 20%;
	color: #363636;
}

.main .content {
	position: relative;
	height: 80%;
	width: 70%;
	display: flex;
	flex-direction: column;
}

.content .form {
	width: 50%;
	margin-top: 4rem;
  margin-left: 25%;
	// border: 0.05rem solid $clr-border;
}

input {
  margin-top: 1rem;
  margin-bottom: 2rem;
  height: $h-input / 1.5;
}

label {
	color: #666666;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
