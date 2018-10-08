<template>
  <div class="container">
    <div class="content">
        {{ content }}
    </div>
    <button class="button" @click="goSignUp()">注册</button>
    <!-- <svg-icon icon="delete" @click="goDelete()"></svg-icon> -->
  </div>
</template>

<script>
/**
 * 作用：当用户的处于未登录状态时就会在“发布项目”、“人才排行榜”，“发现”
 * 样式要求：
 *   1. 可叉掉                           未完成
 * 问题：
 *   1. 如何点击圈圈叉掉该组件
 */
export default {
  // name: 'reg-btn',
  data() {
    return {
      content: '还没注册？快来注册吧！',
    };
  },
	methods: {
		goSignUp() {
			this.$router.push('/signup');
    },
    goDelete() {
      // 让框框消失
    }
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
  width: 100%;
  height: $h-regBtn;
  margin-top: $h-nav;
  background-color: $clr-content;
  display: flex;
  flex-direction: row;
  .content {
    position: relative;
    color: #333333;
    height: $h-regBtn / 2;
    margin-top: $h-regBtn / 2.8;
    margin-left: 30%;
  }
  .button{
    position: relative;
    height: 2rem;
    margin-top: $h-regBtn / 3.8;
    margin-left: 25%;
    background-color: $clr-main;
    color: $clr-white;
    border-radius: 5px;
  }
  .icon {
    display: block;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

