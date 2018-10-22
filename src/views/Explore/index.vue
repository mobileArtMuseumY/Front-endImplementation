<template>
  <div class="container">
    <pro-registration-btn></pro-registration-btn>
    <div class="sort">
      <label>分类：</label>
      <span @click="sortOfTime()">发布时间</span>
      <span @click="sortOfFocused()">关注度</span>
    </div>
      <!-- <img :src="item.attachmentShowPath" alt="works" @click="Display()"> -->
    <section>
      <div class="main" v-for="item in works" :key="item">
        <!-- <img :src="item" alt="works" style="width: {{ item.width*200/item.height }}px;"> -->
        <img :src="item" alt="works" >
      </div>
      <!-- <div class="main">
        <works-display :worksId="item" v-for="(item, index) in items" :key="index"></works-display>
      </div> -->
    </section>
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
 * 作用：发现
 * 状态：两种                                          代码完成(未测试)
 * 样式要求：
 *   1. 无
 * 问题：
 *   1. 如果让div在vertical的方向设置距离               笨方法完成(设置margin)
 *   2. 让图片“自适应”屏幕宽度                         完成
 *   3. 图片放入静态资源服务器中，config中index.js，proxyTable有什么关系？
 *   4. 如何从远程图床上引用图片
 */
import picture1 from '@/../static/images/home/r11.jpg';
import picture2 from '@/../static/images/home/r12.jpg';
import picture3 from '@/../static/images/home/r13.jpg';
import picture4 from '@/../static/images/home/r21.jpg';
import picture5 from '@/../static/images/home/r22.jpg';
import picture6 from '@/../static/images/home/r23.jpg';
import picture7 from '@/../static/images/home/r24.jpg';
import picture8 from '@/../static/images/home/ice.jpg';
import picture9 from '@/../static/images/home/road.jpg';
import picture10 from '@/../static/images/home/snowing.jpg';
import picture11 from '@/../static/images/home/sunflower.jpg';
import picture12 from '@/../static/images/home/sunset.jpg';
import picture13 from '@/../static/images/home/yellowFlower.jpg';
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
			works: [
				picture1,
				picture2,
				picture3,
				picture4,
				picture5,
				picture6,
				picture7,
				picture8,
				picture9,
				picture10,
				picture11,
			],
      items: [],
      timeClicked: false,
      focusClicked: false,
		};
	},
	methods: {
		sortOfTime() {
      this.timeClicked = true;
      this.focusClicked = false;
			this.selected = 0;
			this.currentPage = 5;
			const data = {
				method: this.selected,
				page: this.currentPage,
				rows: this.pageSize,
      };
      console.log(data);
      this.getWorksData(data);
		},
		sortOfFocused() {
      this.focusClicked = true;
      this.timeClicked = false;
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
          console.log(this.items);
					// getWorksCount().then(res => {
          //   this.count = res.data.count;

          // }).catch(err => {
          //   console.log('获取作品总数失败！');
          // });
				})
				.then(err => {
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
		flex-grow: 1;
		margin: 0.3rem;
		img {
			cursor: pointer;
			border-radius: 1px;
			height: calc(20vw);
			max-width: 100%;
			min-width: 100%;
			object-fit: cover;
			vertical-align: bottom;
			transition: all 1s ease 0s;
			box-shadow: $shadow-work;
			z-index: 4;
			&:hover {
				transform: translateY(-7px);
				transition: all 0.5s ease 0s;
			}
		}
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

