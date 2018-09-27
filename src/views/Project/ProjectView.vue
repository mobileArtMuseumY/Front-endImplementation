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
          <svg-icon icon="upload"></svg-icon>
          <svg-icon icon="user"></svg-icon>
          <!-- <icon :class="[rotate ? 'go': 'aa']" name="upload" scale="2" id="click" ></icon> -->
        </div>
        <div class="sort">
          <label>分类：</label>
          <span @click="sortOfTime()">发布时间</span>
          <span @click="sortOfFocused()">关注度</span>
        </div>
      </div>
    </div>
    <div class="main">
      <v-for item></v-for>
    </div>
    <div class="pagination">

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
export default {
	data() {
		return {
			search: '',
			projectSkill: '',
			rotate: true,
		};
	},
	methods: {
		getSkills() {
			this.$message('hello');
			this.rotate = !this.rotate;
			console.log(this.rotate);

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
				})
				.catch(err => {
					console.log(err);
				});
		},
		sortOfTime() {
			// 按照时间发送请求
		},
		sortOfFocused() {
			// 按照关注度发送请求
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

.icon:hover {
	cursor: pointer;
	transform: rotate(-90deg);
	-webkit-transform: rotate(-90deg);
	border: none;
}

.go {
	transform: rotate(-180deg);
	border: none;
	transition: all 2s;
}

.aa {
	transition: all 2s;
}

#click:hover {
	transform: rotate(-180deg);
	// border: none;
	transition: all 2s;
}
</style>

<style lang="scss">
// .el-input__icon {
//   line-height: 20px;
// }
</style>
