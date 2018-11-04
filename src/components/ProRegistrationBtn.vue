<template >
  <div class="container-la" v-if="!user.signIn">
    <div class="left">
      {{ content }}
    </div>
    <div class="right">
      <button class="signup-button" @click="goToSignUp()">注册</button>
    </div>
    <!-- <svg-icon icon="delete-icon" @click="goToDelete()" class="delete"></svg-icon> -->
  </div>
</template>

<script>
/**
 * 作用：当用户的处于未登录状态时就会在“发布项目”、“人才排行榜”，“发现”
 * 样式要求：
 *   1. 可叉掉                                                        弃用
 * 问题：
 *   1. 如何点击圈圈叉掉该组件                                         弃用
 */
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			content: '还没注册？快来注册吧！',
			delete: false,
		};
	},
	computed: {
		...mapGetters(['user']),
	},
	methods: {
		goToSignUp() {
			this.$router.push({
        name: 'SignUp',
      });
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container-la {
	@include wh(100%, $h-regBtn);
	background-color: $clr-content;
	display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: $border;
  > div {
    margin-top: 1.5em;
  }
	.left {
		position: relative;
		color: #333333;
	}
	.signup-button {
		height: 2rem;
		background-color: $clr-main;
		color: $clr-white;
    border-radius: 5px;
    cursor: pointer;
	}
}
</style>

