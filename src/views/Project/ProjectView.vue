<template>
  <div class="container">
    <pro-registration-btn></pro-registration-btn>
    <div class="filter">
      <div class="search">
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="search"
          clearable>
        </el-input>
    
      </div>
      <div class="sort-of-skill">
        <div class="my-skill">
          <label>我的技能：</label>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <svg-icon icon="upload-icon" :class="[rotate ? 'go' : 'aa']" @click.native="getSkills()"></svg-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>js</el-dropdown-item>
            <el-dropdown-item>css3</el-dropdown-item>
            <el-dropdown-item>vue</el-dropdown-item>
            <el-dropdown-item>eslint</el-dropdown-item>
            <el-dropdown-item>log</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="sort">
          <label>分类：</label>
          <span @click="sortOfTime()">发布时间</span>
          <span @click="sortOfFocused()">关注度</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div v-for="data in projectData" :key="data" class="project">
        <!-- <img :src="data.avatar" alt="avatar" class="avatar"> -->
       <div class="top">
          <svg-icon icon="user" style="width: 70px; height: 70px; color: #5E5E5E; " class="avatar-of-business"></svg-icon>
          <label class="project-name"><strong>{{ data.projectName }}</strong></label>
          <label class="budget"><strong>￥{{ data.budget }}</strong></label>
          <button class="a business-id-button" @click="goBusinessHome(data.businessId)">{{ data.businessName }}</button>
       </div>
        <p class="description" >{{ data.projectDescription }}</p>
        <div class="bottom">
        <ul v-if="data.skillList">
          <div class="skill-parent">
            <li v-for="skill in data.skillList" :key="skill" class="skill">{{ skill }}</li>
          </div>
        </ul>
        <label class="gmt-time">{{ data.gmtCreate }}</label>
        <label class="left-time">剩余{{ data.leftTime }}天</label>
        <button class="a project-id-button" @click="goProjectHome(data.prjectId)">查看详情</button>
        </div>
      </div>
    </div>
    <div class="pagination">
      <template v-if="count">
        <ul>
          <li v-for="item in items" :key="item">...</li>
          <multi-page
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange">
          </multi-page>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * 作用：浏览项目
 * 角色：所有
 * 样式要求：
 *   1. 打开页面时，将“发布时间”作为默认页面
 * 进度：
 *   1. 完成基本样式                                            //未完成
 *   2. “我的技能”请求发送成功                                   //已完成
 *   3. “发布时间”请求发送成功(页面打开默认)                      //未完成
 *   4. “关注度”请求发送成功                                     //未完成
 *   5. 当用户未注册时，如何将“pro-registration-btn”组件插入页面  //未完成
 *   6. “我的技能”被点击时动画效果
 *   7. icon的一个bug，不能绑定方法~~~(猜测)                    //已弃用
 * 问题：
 *   1. 如何控制页面的大小？(页面大小自适应)
 *   2. .descriptioin和.skill的样式完全没用。。。
 *   3. 转换时间戳的时候会出现找不到mudule的情况(main.js中已经注册)
 *   4. “我的技能”被点击时动画效果
 */

import { getSkillList, getProjectData } from '@/api/project';
import { formatDate } from '@/utils/date';

export default {
	data() {
		return {
			search: '',
			rotate: false,
			projectSkill: [],
			skills: [], // 符合el-select的所有skill列表
			selected: 0, // 当前被选中的项(时间或者关注度)
			// projectData: {
			// 	avatar: '',
			// 	businessName: '',
			// 	projectName: '',
			// 	projectDescription: '',
			// 	skillList: [], // 该项目拥有的skill
			// 	gmtCreate: '',
			// 	leftTime: Number,
			//   budget: Number,
			// },
			pageSize: 8,
			currentPage: 1,
			count: 100,
			items: [],
			projectData: [
				{
					avatar: null,
					businessName: 'buzhidaoya',
					projectName: 'bulabu',
					projectDescription:
						'this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description',
					skillList: ['logo', 'java'],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
				{
					avatar: null,
					businessName: 'buzhidaoya',
					projectName: 'bulabu',
					projectDescription:
						'this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description',
					skillList: ['logo', 'java'],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
				{
					avatar: null,
					businessName: 'buzhidaoya',
					projectName: 'bulabu',
					projectDescription:
						'this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description',
					skillList: ['logo', 'java'],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
				{
					avatar: null,
					businessName: 'buzhidaoya',
					projectName: 'bulabu',
					projectDescription:
						'this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description',
					skillList: ['logo', 'java'],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
				{
					avatar: null,
					businessName: 'buzhidaoya',
					projectName: 'bulabu',
					projectDescription:
						'this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description',
					skillList: ['logo', 'java'],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
				{
					avatar: null,
					businessName: 'buzhidaoya',
					projectName: 'bulabu',
					projectDescription:
						'this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description,this is a project description',
					skillList: ['logo', 'java'],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
			],
			// status: this.$store.user.login,
		};
	},
	methods: {
		// 有点乱。。。
		getSkills() {
			this.rotate = !this.rotate;
			// 发送请求
			getSkillList()
				.then(res => {
					// 将获取到的技能列表按照想要的格式赋给skills
					this.projectSkill = res.data;
					for (let i = 0; i < this.projectSkill.length; ++i) {
						const object = [];
						object.value = `选项${i + 1}`;
						object.label = this.projectSkill[i].skillName;
						this.skills.push(object);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		sortOfTime() {
			// 按照时间发送请求
			this.selected = 0;
			const data = {
				method: this.selected,
				page: this.currentPage,
				rows: this.pageSize,
			};
			console.log(typeof data.method);
			this.getProject(data);
		},
		sortOfFocused() {
			// 按照关注度发送请求
			this.selected = 1;
			const data = {
				method: this.selected,
				page: this.currentPage,
				rows: this.pageSize,
			};
			this.getProject(data);
		},
		getProject(data) {
			// 发送请求
			getProjectData(data)
				.then(res => {
					this.items = res.data;
					// this.projectData.avatar = res.data.avatar;
					// this.projectData.businessName = res.data.businessName;
					// this.projectData.projectName = res.data.projectName;
					// this.projectData.projectDescription = res.data.projectDescription;
					// this.projectData.skillList = res.data.skillList;
					// this.projectData.gmtCreate = res.data.gmtCreate;
					// this.projectData.leftTime = res.data.leftTime;
					// this.projectData.budget = res.data.budget;
					// // console.log(items);
					this.count = res.count; // 希望是这样的
				})
				.then(err => {
					console.log(err);
				});
		},
		pageChange(page) {
			this.currentPage = page;
			// this.sortOfFocused();
		},
	},
	computed: {
		transferTime: function() {
			// return formatDate(this.projectData.gmtCreate);
		},
	},
	mounted() {
		// this.sortOfTime();
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	margin-top: $h-nav;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.filter {
		position: relative;
		background-color: #fff;
		margin-top: 2rem;
		border-radius: 4px;
		@include wh(80vw, 6rem);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.search {
			position: relative;
			@include wh(25vw, 2rem);
		}
		.sort-of-skill {
			width: 50vw;
			.sort {
				float: right;
			}
			.my-skill {
				float: left;
			}
		}
	}
	.main {
		width: 80vw;
		background-color: $clr-white;
		border-radius: 4px;
		.project {
			position: relative;
			border-top: $border;
			padding: 2rem;
			&:hover {
				box-shadow: $shadow-work;
				border-left: 0.1rem solid $clr-main;
			}
			.top {
				@include wh(75vw, 6.5rem);
				.avatar-of-business {
					@include wh(70px, 70px);
					float: left;
					@include margin-tl(0, 0);
				}
				.budget {
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
					text-align: start;
					float: left;
					@include margin-tl(80px, -220px);
				}
			}
		}
		.pagination {
			@include wh(100%, 3rem);
			@include margin-tl(2rem, -7vw);
			text-align: center;
			margin-bottom: 3rem;
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

	span {
		cursor: pointer;
		margin: 0.3rem;
		font-size: 0.8rem;
		color: $clr-gray;
		&:hover {
			color: $clr-main;
		}
	}

	.go {
		cursor: pointer;
		transform: rotate(90deg);
		transition: all .5s;
	}

	.aa {
		cursor: pointer;
	}
}

.description {
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
	@include wh(75vw, 7rem);
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
</style>

<style lang="scss">
</style>
