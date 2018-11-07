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
              <el-dropdown-item v-for="(skill, index) in projectSkill" :key="index">{{ skill.skillName }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="sort">
          <label>分类：</label>
          <span id="t-clicked" @click="sortOfTime()">发布时间</span>
          <span id="f-clicked" @click="sortOfFocused()">关注度</span>
        </div>
      </div>
    </div>
    <div class="main">
      <project-item :projectItem="projectItem" v-for="(projectItem, index) in items" :key="index"></project-item>
    </div>
    <div class="pagination">
      <template v-if="count">
        <ul>
          <!-- <li v-for="item in items" :key="item">...</li> -->
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
 *   1. 完成基本样式                                            //已完成
 *   2. “我的技能”请求发送成功                                   //已完成
 *   3. “发布时间”请求发送成功(页面打开默认)                      //已完成
 *   4. “关注度”请求发送成功                                     //已完成
 *   5. 当用户未注册时，如何将“pro-registration-btn”组件插入页面  //已完成
 *   6. “我的技能”被点击时动画效果                               //已完成
 *   7. icon的一个bug，不能绑定方法~~~(猜测)                    //已弃用
 * 问题：
 *   1. 如何控制页面的大小？(页面大小自适应)                     //已解决
 *   2. .descriptioin和.skill的样式完全没用。。。               //已解决
 *   3. 转换时间戳的时候会出现找不到mudule的情况(main.js中已经注册)
 *   4. “我的技能”被点击时动画效果                              //已解决
     5. 选中后，数据抛到search中，然后进行搜索
 *    
 */

import { getSkillList, getProjectData } from '@/api/project';
import { formatDate } from '@/utils/date';

export default {
	data() {
		return {
			search: '',
			rotate: false,
			projectSkill: [],
			selected: 0, // 当前被选中的项(时间或者关注度)
			pageSize: 8,
			currentPage: 1,
			count: 100,
			items: [],
		};
	},
	methods: {
		// 有点乱。。。
		getSkills() {
			this.rotate = !this.rotate;
			// 发送请求
			getSkillList()
				.then(res => {
					this.projectSkill = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		sortOfTime() {
			// 按照时间发送请求
			document.getElementById('t-clicked').style.color = 'red';
			document.getElementById('f-clicked').style.color = 'gray';
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
      document.getElementById('t-clicked').style.color = 'gray';
			document.getElementById('f-clicked').style.color = 'red';
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
					// this.projectData = res.data;
					// this.count = res.count; // 希望是这样的
				})
				.catch(err => {
					console.log(err);
				});
		},
		pageChange(page) {
			this.currentPage = page;
			// this.sortOfFocused();
		},
	},
	computed: {
		transferTime() {
			// return formatDate(this.projectData.gmtCreate);
		},
	},
	mounted() {
		this.sortOfTime();
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	padding-top: $h-nav;
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
	}
	.pagination {
		@include wh(100%, 3rem);
		@include margin-tl(2rem, -7vw);
		text-align: center;
		margin-bottom: 3rem;
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
		transition: all 0.5s;
	}

	.aa {
		cursor: pointer;
	}
}
</style>

