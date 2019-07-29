<template>
  <div class="nav-wrap">
    <div class="nav-left">
      <svg-icon icon="logo" style="width: 2rem;height: 2rem;"></svg-icon>
    </div>
    <div class="nav-center">
      <router-link
        v-for="(v, i) of nav"
        :key="i" :to="v.link">
        {{v.name}}
      </router-link>
    </div>
    <div class="nav-search">
        <el-input
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          v-model="search"
          minlength="1"
          maxlength="100"
          clearable
          style="border: 0px">
        </el-input>
    </div>
    <div class="nav-right">
      <div class="nav-login" v-if="!user.signIn">
        <router-link to="/signin" class="login-a">登录</router-link>
          |
        <router-link to="/signup" class="login-a">注册</router-link>
      </div>
      <div class="user-profile" v-if="user.signIn">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="address + user.userInfo.avatar" alt="avatar" class="nav-avatar" v-if="user.userInfo.avatar">
              <img src="\static\images\default\default.png" alt="avatar" class="nav-avatar" v-if="!user.userInfo.avatar">
            </span>
          <el-dropdown-menu slot="dropdown" v-if="user.role === 'enterprise'">
            <el-dropdown-item>
              <router-link to="/user/enterpriseHomePage">我的主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item> 
              <router-link to="/setting/verify/info">设置</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/service">客服</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="" @click="signOut()">退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu slot="dropdown" v-if="user.role === 'student'">
            <el-dropdown-item>
              <router-link to="/user/studentHomePage">我的主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item> 
              <router-link to="/setting/verify/info">设置</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/service">客服</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="" @click="signOut()">退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          |
        <div class="reminder">
          <svg-icon icon="reminder-hollow-icon" style="width: 20px; height: 30px;" class="reminder" id="reminder" @click.native="openInBox"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作用：页面的nav
 * 状态：两种(已登录、未登录)                   已完成
 * 样式要求：
 *   1. 始终置顶(postion: fixed; top: 0;)      已完成
 *   2. span被选中时颜色变为红色($clr-main)    已完成
 *   3. hover时颜色变为红色($clr-main)        已完成
 * 问题：
 *   1. 添加置顶样式时，nav会消失                                                //已解决
 *   2. 被选中后颜色不能改变(设置:active 不起作用 )                               //换了一种解决方式
 *   3. name是起什么作用的？为什么注释掉了页面里的nav也同样可以正常显示？           //已解决
 *   4. 当往下滑时nav背景变为透明                                               //未解决
 *   5. 当点击span之后再点击导航栏时，span的颜色该如何变成black?                  //已解决
    6.  消息提醒 
 *    
 */

import { mapGetters } from 'vuex';

export default {
	name: 'the-nav',
	data() {
		return {
			search: '',
      open: false,
      address: "http://120.79.239.141:8080/",
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
		...mapGetters(["user"]),
  },
	methods: {
		signOut() {
			this.$store.dispatch('SignOut');
		},
		openInBox() {
			this.open = !this.open;
			if (this.open) {
				document.getElementById('reminder').style.color = 'red';
			} else {
				document.getElementById('reminder').style.color = 'gray';
			}
			// 显示信息
		},
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.nav-wrap {
	font-size: 10px;
	// position: fixed;
	// top: 0;
	// z-index: 999;
	@include wh(100%, $h-nav);
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
	margin-right: 5%;
	.nav-login {
		.login-a {
			margin: 0;
		}
	}
}

.user-profile {
	width: 8rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.nav-avatar {
	cursor: pointer;
	border-radius: 50%;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	@include wh(40px, 40px);
}

.reminder {
	&:hover {
		color: $clr-main;
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

<style lang="scss">
@import 'src/assets/scss/index';

.el-input__inner {
	height: 32px;
}

.el-dropdown-menu {
	display: inline-block;
	text-align: center;
}
</style>


