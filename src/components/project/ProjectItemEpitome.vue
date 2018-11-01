<template>
  <div class="project-item">
    <div class="left-time">
      <label>剩余{{ projectItem.leftTime }}天</label>
    </div>
    <div class="project-content">
      <p class="project-description" >{{ projectItem.projectDescription }}</p>
      <div class="project-content-footer">
        <svg-icon icon="hammer" style="height: 30px; width: 30px;"></svg-icon>
        <label style="font-size: 17px; margin: 0.2rem 0.4rem auto 0.4rem;">{{ projectItem.biddenCount }}</label>
        <svg-icon icon="clock" style="color: red; height: 30px; width: 30px;" v-if="projectItem.status === 0"></svg-icon>
        <svg-icon icon="delete" style="color: #666666; height: 23px; width: 23px;" v-if="projectItem.status != 0"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 企业主页中展示的项目
 */

export default {
	props: {
		projectItem: '',
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.project-item {
	border: $border;
	height: 8rem;
	border-radius: 5px;
	padding: 1rem;
	.left-time {
		transform: translateX(90%);
	}
	.project-content {
		height: 6rem;
		.project-description {
			line-height: 23px;
			width: 35vw;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			color: $clr-footer-font;
		}
		.project-content-footer {
      display: flex;
			transform: translate(85%);
		}
	}
}
</style>

