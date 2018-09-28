<template>
  <div class="container">
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
      <p>这是main</p>
    </div>
    <div class="pagination">
      <p>hello</p>
      <!-- <template v-if="count">
        <ul>
          <li v-for="item in items" :key="item">...</li>
          <multi-paging
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange">
          </multi-paging>
        </ul>
      </template> -->
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

import { skillList, getProjectData } from '@/api/project';

export default {
	data() {
		return {
			search: '',
			rotate: true,
			projectSkill: [],
			skills: [], // 符合el-select的所有skill列表
			selected: 0, // 当前被选中的项(时间或者关注度)
			projectData: {
				avatar: '',
				businessName: '',
				projectName: '',
				projectDescription: '',
				skillList: [], // 该项目拥有的skill
				gmtCreate: '',
				leftTime: Number,
        budget: Number,
			},
			pageSize: 8,
			currentPage: 1,
			count: 0,
			items: [],
		};
	},
	methods: {
		// 有点乱。。。
		getSkills() {
			this.$message('hello');
			this.rotate = !this.rotate;
			// 发送请求
			skillList()
				.then(res => {
					// 将获取到的技能列表按照想要的格式赋给skills
					this.projectSkill = res.data;
					for (let i = 0; i < this.projectSkill.length; ++i) {
						const object = [];
						object.value = '选项' + (i + 1);
						object.label = this.projectSkill[i].skillName;
						this.skills.push(object);
					}
				}).catch(err => {
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
          console.log(items);
          this.count = res.data.count;
				})
				.then(err => {
					console.log(err);
				});
		},
		pageChange(page) {
			this.currentPage = page;
			this.sortOfFocused();
		},
	},
	mounted() {
		this.sortOfFocused();
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
  height: 100%;
	margin-top: $h-nav;
	width: 100%;
	.filter {
		position: relative;
		width: 100%;
		// border: 0.06rem solid $clr-border;
		height: 6rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.search {
			position: relative;
			width: 25vw;
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
		width: 100%;
		border: 0.03rem solid $clr-border;
    height: 50vw;
	}
  .pagination {
		width: 100%;
    height: 3rem;;
    text-align: center;
		border: 0.03rem solid $clr-main;
    margin-bottom: 1rem;
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
</style>

<style lang="scss">
// .el-input__icon {
//   line-height: 20px;
// }
</style>
