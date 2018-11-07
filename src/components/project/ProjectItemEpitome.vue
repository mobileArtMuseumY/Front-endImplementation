<template>
  <div>
    <div class="optional" >
    <svg-icon icon="plane" style="color: #666666 ;"></svg-icon>
    <label>项目：</label>
  </div>
  <div class="project-item">
    <div class="left-time-container">
      <div class="empty">
      </div>
      <div class="left-time">
        <label>剩余{{ projectItem.leftTime }}天</label>
      </div>
    </div>
    <div class="project-content" @click.native="goToProjectDetails(item.projectId)">
      <p class="project-description">{{ projectItem.projectDescription }}</p>
      <div class="project-content-footer">
        <div class="empty">
        </div>
        <div class="solid">
          <svg-icon icon="hammer" style="height: 30px; width: 30px; cursor: default;"></svg-icon>
          <label style="font-size: 17px; margin: 0.2rem 0.4rem auto 0.4rem;">{{ projectItem.biddenCount }}</label>
          <svg-icon icon="clock" style="color: red; height: 30px; width: 30px; cursor: default;" v-if="projectItem.status === 0"></svg-icon>
          <svg-icon icon="delete" @click.native="goToDeleteProject(projectItem.projectId)" style="color: #666666; height: 23px; width: 23px;" v-if="projectItem.status != 0" ></svg-icon>
        </div>
      </div>
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
	methods: {
		goToProjectDetails(projectId) {
			console.log('goToProjectDetails');
			this.$router.push({
				name: 'ProjectDetails',
				params: {
					id: projectId,
				},
			});
		},
		goToDeleteProject(projectId) {
      this.$emit('deleteProject', projectId);
			console.log('就快要删除啦？？');
			// 执行删除项目操作
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.project-item {
	padding: 1rem 1rem 2rem 1rem;
	.left-time-container {
		display: flex;
		justify-content: space-between;
		.empty {
			width: 20%;
		}
		.left-time {
			margin-bottom: 0.5rem;
		}
	}
	.project-content {
		border: $border;
		padding: 1rem;
		border-radius: 5px;
		.project-description {
			line-height: 23px;
			width: 35vw;
			margin-bottom: 2rem;
			overflow: hidden;
			cursor: pointer;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			color: $clr-footer-font;
		}
		.project-content-footer {
			display: flex;
			justify-content: space-between;
			.empty {
				width: 20%;
			}
			.solid {
				display: flex;
			}
		}
	}
}
</style>

