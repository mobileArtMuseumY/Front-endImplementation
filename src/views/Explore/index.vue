<template>
  <div class="container">
    <pro-registration-btn></pro-registration-btn>
    <div class="sort">
      <label>分类：</label>
      <span id="t-clicked" @click="sortOfTime()">发布时间</span>
      <span id="f-clicked" @click="sortOfFocused()">关注度</span>
    </div>
    <section>
      <div class="main">
        <works-item :works="item" v-for="(item, index) in items" :key="index">{{ item }}</works-item>
      </div>
    </section>
    <div class="pagination">
      <template v-if="count">
        <ul>
          <!-- <li v-for="(item, index) in items" :key="index">...</li> -->
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
 * 作用：发现
 * 状态：两种                                          代码完成
 * 样式要求：
 *   1. 无
 * 问题：
 *   1. 如果让div在vertical的方向设置距离               笨方法完成(设置margin)<css揭秘 p185>
 *   2. 让图片“自适应”屏幕宽度                         完成
 *   3. 图片放入静态资源服务器中，config中index.js，proxyTable有什么关系？
 *   4. 如何从远程图床上引用图片
 */
import { getWorksData, queryWorksDetails, getWorksCount } from '@/api/works';
import axios from 'axios';

export default {
	data() {
		return {
			title: '发现',
			// works: [],
			selected: 0, // 当前被选中的项(时间或者follower)
			pageSize: 10,
			currentPage: 1,
			count: 50,
			items: [],
		};
	},
	methods: {
		sortOfTime() {
			document.getElementById('t-clicked').style.color = 'red';
			document.getElementById('f-clicked').style.color = 'gray';
			this.selected = 0;
			this.currentPage = 5;
			const data = {
				method: this.selected,
				page: this.currentPage,
				rows: this.pageSize,
			};
			this.getWorksData(data);
		},
		sortOfFocused() {
			document.getElementById('t-clicked').style.color = 'gray';
			document.getElementById('f-clicked').style.color = 'red';
			this.selected = 1;
			this.currentPage = 1;
			const data = {
				method: this.selected,
				page: this.currentPage,
				rows: this.pageSize,
			};
			this.getWorksData(data);
		},
		// 发送请求
		getWorksData(data) {
			getWorksData(data)
				.then(res => {
					this.items = res.data;
					// console.log(this.items);
					// getWorksCount().then(res => {
					//   this.count = res.data.count;

					// }).catch(err => {
					//   console.log('获取作品总数失败！');
					// });
				})
				.catch(err => {
					console.log('获取作品失败' + err);
				});
		},
		pageChange(page) {
			this.currentPage = page;
			// this.sortOfFocused();
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
	width: 100%;
	margin-top: $h-nav;
	display: flex;
	flex-direction: column;
	align-items: center;
	.sort {
		@include margin-tl(2em, 1em);
		margin-left: 92vw;
		width: 20%;
	}
	.main {
		width: 100vw;
    display: flex;
    
	}
	.pagination {
		@include margin-tb(3rem, 3rem);
		margin-left: -7vw;
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
section {
	display: flex;
	flex-wrap: wrap;
	&::after {
		content: '';
		flex-grow: 99;
	}
}

</style>

