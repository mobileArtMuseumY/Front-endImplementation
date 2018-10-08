<template>
  <div class="container">
    <!-- <pro-registration-btn v-if="status"></pro-registration-btn> -->
    <div class="filter">
      <div class="search">
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="search"
          clearable>
        </el-input>
      </div>
      <div class="sortASkillFather">
        <div class="skill">
          <label>我的技能：</label>
          <svg-icon icon="upload" :class="[rotate ? 'go' : 'aa']" @click.native="getSkills()"></svg-icon>
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
        <!-- <img :src="data.avatar" alt="avatar"> -->
        <svg-icon icon="user" style="width: 40px; height: 60px; color: #5E5E5E; " class="avatar"></svg-icon>
        <label class="budget"><strong>￥{{ data.budget }}</strong></label>
        <label class="projectName">{{ data.projectName }}</label>
        <button class="a businessId" @click="goBusinessHome(data.businessId)">{{ data.businessName }}</button>
        <textarea v-model="data.projectDescription" readonly="true" wrap="false" class="description"></textarea>
        <li v-for="skill in skills" :key="skill" class="skill"></li>
        <label class="gmtTime">{{ data.gmtCreate }}</label>
        <label class="leftTime">{{ data.leftTime }}</label>
        <button class="a projectId" @click="goProjectHome(data.prjectId)">查看详情</button>
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
 *   7. icon的一个bug，不能绑定方法~~~(猜测)
 * 问题：
 *   1. 如何控制页面的大小？(页面大小自适应)
 */

import { getSkillList, getProjectData } from '@/api/project';

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
					projectDescription: 'this is a project description',
					skillList: [],
					gmtCreate: '2018-09-24T08:18:59.000+0000',
					leftTime: 11,
					budget: 1200,
					projectId: 1234567,
					bussinessId: 1224324,
				},
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
				// {
				// 	avatar: null,
				// 	businessName: 'buzhidaoya',
				// 	projectName: 'bulabu',
				// 	projectDescription: 'this is a project description',
				// 	skillList: [],
				// 	gmtCreate: '2018-09-24T08:18:59.000+0000',
				// 	leftTime: 11,
				// 	budget: 1200,
				// 	projectId: 1234567,
				// 	bussinessId: 1224324,
				// },
			],
			// status: this.$store.user.login,
		};
	},
	methods: {
		// 有点乱。。。
		getSkills() {
			this.$message('hello');
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
	background-color: #f7f8fa;
	display: flex;
	flex-direction: column;
	align-items: center;
	.filter {
		position: relative;
		width: 90vw;
		height: 6rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.search {
			position: relative;
			border: 0.06rem solid $clr-border;
			width: 25vw;
			height: 2rem;
		}
		.sortASkillFather {
			width: 60vw;
			// border: 0.06rem solid $clr-border;
			.sort {
				float: right;
			}
			.skill {
				float: left;
			}
		}
	}
	.main {
		width: 90vw;
		// border: 0.03rem solid $clr-border;
		height: 115vw;
		.project {
			position: relative;
			border-top: 0.03rem solid $clr-border;
			padding: 2rem;
			.avatar {
				border: 0.06rem solid $clr-border;
			}
			.budget {
				border: 0.06rem solid $clr-border;
			}
			.projectName {
				border: 0.06rem solid $clr-border;
			}
			.businessId {
				border: 0.06rem solid $clr-border;
			}
			.description {
        background-color: transparent;
        height: 4rem;
        color: $clr-footer-font;
        line-height: 20px;
			}
			.projectId {
				border: 0.06rem solid $clr-border;
			}
		}
	}
	.pagination {
		width: 100%;
		height: 3rem;
		text-align: center;
		margin-bottom: 1rem;
		margin-top: 1rem;
	}
}
.a {
	border: none;
	background-color: transparent;
	color: $clr-title;
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
	transform: rotate(180deg);
	transition: all 2s;
}

.aa {
	cursor: pointer;
}

h1 {
	font-weight: normal;
	size: 90px;
}

.a {
	border: none;
	background-color: transparent;
	color: $clr-title;
	&:hover {
		background-color: transparent;
		color: $clr-main;
	}
}

</style>

<style lang="scss">
// .el-input__icon {
//   line-height: 20px;
// }
</style>
