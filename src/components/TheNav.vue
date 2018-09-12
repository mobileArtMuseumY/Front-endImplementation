<template>
  <div class="nav-wrap">
    <div class="nav-left">
      <icon class="icon" name="logo" scale="5"></icon>
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
        <span @click="goSignIn()">登录</span>
          |
        <span @click="goSignUp()">注册</span>
      </div>
      <div class="nav-search">
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="search"
          clearable>
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
 *   2. span被选中时颜色变为红色($clr-main)
 *   3. hover时颜色变为红色($clr-main)        已完成
 * 问题：
 *   1. 添加置顶样式时，nav会消失                                                //已解决
 *   2. 被选中后颜色不能改变(设置:active 不起作用 )
 *   3. name是起什么作用的？为什么注释掉了页面里的nav也同样可以正常显示？           //已解决
 *   4. 当往下滑时nav背景变为透明
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
		return: {
			theNav() {
				if (this.nav.length) {
					return this.nav.filter(x => x.name);
				} else {
					return msg;
				}
			},
		},
	},
	methods: {
		goSignIn() {
			this.$router.push('/signin');
		},
		goSignUp() {
			this.$router.push('/signup');
		},
		// 没起作用
		watchScroll() {
			var scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop > 49) {
				this.navBarFixed = true;
			} else {
				this.navBarFixed = false;
			}
		},
	},
	// mounted: {
	//   // 事件监听滚动条
	//   window.addEventListener('scroll', this.watchScroll);
	// },
};
</script>

<style lang="scss">
@import 'src/assets/scss/index';

.nav-wrap {
  position: fixed;
  top: 0;
  z-index: 9999;
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
	font-size: 0.8rem;
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
			//没用？？？
			&.active {
				color: $clr-main;
			}
		}
	}
}
a {
	display: inline-block;
	text-align: center;
	color: $clr-black;
	font-size: 0.9rem;
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
