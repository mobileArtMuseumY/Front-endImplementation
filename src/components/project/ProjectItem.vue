<template>
  <div class="project-item">
    <div class="top">
      <!-- <img src="projectItem.avatar" alt="businessAvatar" class="avatar-of-business"> -->
      <svg-icon icon="user" style="width: 70px; height: 70px; color: #5E5E5E; " class="avatar-of-business"></svg-icon>
      <label class="project-name"><strong>{{ projectItem.projectName }}</strong></label>
      <label class="project-budget"><strong>￥{{ projectItem.budget }}</strong></label>
      <button class="a business-id-button" @click="goToBusinessHome(projectItem.businessId)">{{ projectItem.businessName }}</button>
    </div>
    <p class="project-description" >{{ projectItem.projectDescription }}</p>
    <div class="bottom">
      <ul v-if="projectItem.skillList">
        <div class="skill-parent">
            <li v-for="skill in projectItem.skillList" :key="skill.id" class="skill">{{ skill.skillName }}</li>
        </div>
      </ul>
      <label class="gmt-time">{{ projectItem.gmtCreate }}</label>
      <label class="left-time">剩余{{ projectItem.leftTime }}天</label>
      <button class="a project-id-button" @click="goToProjectDetails(projectItem.prjectId)">查看详情</button>
    </div>
  </div>
</template>

<script>
/**
 * 浏览项目中的项目item
 */

export default {
	props: {
		projectItem: '',
	},
	data() {
		return {};
	},
	methods: {
		goToBusinessHome(businessId) {
			this.$router.push({
        name: 'EnterpriseHomepage',
        params: {
          id: bussinessId,
        },
      });
		},
		goToProjectDetails(projectId) {
      console.log('goToProjectDetails');
      this.$router.push({
        name: 'ProjectDetails',
        params: {
          id: projectId,
        },
      });
    },
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.project-item {
	border-top: $border;
	padding: 1rem;
	&:hover {
		box-shadow: $shadow-work;
		border-left: 0.1rem solid $clr-main;
	}
	.top {
		@include wh(100%, 6.5rem);
		.avatar-of-business {
			float: left;
			@include wh(70px, 70px);
			@include margin-tl(0, 0);
		}
		.project-budget {
			float: right;
			padding: 0.5rem;
			font-size: 17px;
			color: $clr-main;
		}
		.project-name {
			float: left;
			margin: 0 auto 100px 90px;
			font-size: 17px;
			color: $clr-footer-font;
		}
		.business-id-button {
			// text-align: start;
			// border: $border;
			width: 5.5rem;
			float: left;
			@include margin-tl(80px, -220px);
		}
	}
	.a {
		border: none;
		background-color: transparent;
		color: $clr-title;
		cursor: pointer;
		&:hover {
			background-color: transparent;
			color: $clr-main;
		}
	}
	.project-description {
		padding: 0 0.5rem 0 0;
		line-height: 20px;
		width: 50vw;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; // 改变行数
		-webkit-box-orient: vertical;
		color: $clr-footer-font;
	}

	.bottom {
		@include wh(100%, 5rem);
		.project-id-button {
			text-align: end;
			float: right;
		}
		.skill-parent {
			.skill {
				display: inline;
				color: $clr-footer-font;
				margin-left: 5px;
				box-shadow: $shadow-skill;
				&:first-child {
					margin-left: -40px; // 为什么0的时候不是最左边？
				}
			}
		}
		.left-time {
			margin-left: 40px;
			color: $clr-footer-font;
		}
		.gmt-time {
			color: $clr-footer-font;
		}
	}
}

span {
	cursor: pointer;
	margin: 0.3rem;
	font-size: 0.8rem;
	color: $clr-gray;
	&:hover {
		color: $clr-main;
	}
}

button {
  outline: none;
}
</style>

