<template>
  <div class="nav-wrap">
    <div class="nav-left">
      <!-- <icon class="icon" name="logo" scale="5"></icon> -->
      <svg-icon icon="logo" style="width: 2rem;height: 2rem;"></svg-icon>
    </div>
    <div class="nav-center">
      <router-link
        v-for="(v, i) of nav"
        :key="i" :to="v.link">
        {{v.name}}
      </router-link>
    </div>
    <div class="nav-right">
      <div class="nav-login">
        <span id="signin-clicked" @click="goSignIn()">登录</span>
          |
        <span id="signiup-clicked" @click="goSignUp()">注册</span>
      </div>
      <div class="nav-search">
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="search"
          clearable
          style="border: 0px">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作用：页面的nav
 * 状态：两种(已登录、未登录)                   未完成
 * 样式要求：
 *   1. 始终置顶(postion: fixed; top: 0;)      已完成
 *   2. span被选中时颜色变为红色($clr-main)    已完成
 *   3. hover时颜色变为红色($clr-main)        已完成
 * 问题：
 *   1. 添加置顶样式时，nav会消失                                                //已解决
 *   2. 被选中后颜色不能改变(设置:active 不起作用 )                               //换了一种解决方式
 *   3. name是起什么作用的？为什么注释掉了页面里的nav也同样可以正常显示？           //已解决
 *   4. 当往下滑时nav背景变为透明                                               //未解决
 *   5. 当点击span之后再点击导航栏时，span的颜色该如何变成black?                  //未解决
 */
export default {
	name: 'the-nav',
	data() {
		return {
			search: '',
		};
	},
	props: {
		nav: {
			type: Array,
			required: true,
		},
	},
	computed: {
		theNav() {
			if (this.nav.length) {
				return this.nav.filter(x => x.name);
			}
		},
	},
	methods: {
		goSignIn() {
			document.getElementById('signin-clicked').style.color = 'red';
			document.getElementById('signiup-clicked').style.color = 'black';
			this.$router.push('/signin');
		},
		goSignUp() {
			document.getElementById('signin-clicked').style.color = 'black';
			document.getElementById('signiup-clicked').style.color = 'red';
			this.$router.push('/signup');
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.nav-wrap {
	font-size: 10px;
	position: fixed;
	top: 0;
	z-index: 99;
	width: 100%;
	height: $h-nav;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: $clr-white;
	align-items: center;
	transition: all 0.3s ease;
	transition: cubic-bezier(0.075, 0.82, 0.165, 1);
	box-shadow: $shadow-nav;
	overflow: hidden;
}
.nav-left {
	margin-left: 10%;
}
.nav-center {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	font-size: 10px;
}
.nav-right {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	.nav-search {
		width: 7rem;
		margin-left: 1rem;
		.el-input__inner {
			border: none;
			border-bottom: 0.06rem solid $clr-border;
			&:hover {
				border-bottom: 0.06rem solid $clr-border;
			}
		}
	}
	.nav-login {
		span {
			cursor: pointer;
			margin: 0 0.2rem;
			font-size: 0.8rem;
			&:hover {
				color: $clr-main;
			}
		}
	}
}
a {
	display: inline-block;
	text-align: center;
	color: $clr-black;
	font-size: 0.8rem;
	line-height: 3rem;
	padding: 0 0.5rem;
	margin: 0 1rem;
	border-bottom: solid 0.099rem transparent;
	&.active {
		color: $clr-main;
		border-bottom-color: $clr-main;
	}
}
</style>

