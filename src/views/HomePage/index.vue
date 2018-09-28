<template>
  <div class="home">
    <div class="banner">
      <button class="button" @click="goSignUp()">注册</button>
      <!-- <button class="button" @click="goTest()">test</button> -->
    </div>

    <div class="describe">
      <h3>该如何运作我们的网站？</h3>
      <div class="content">
        {{describe}}
      </div>
    </div>

    <div class="display">
      <h3>美图欣赏</h3>
      <div class="works">
          <div v-for="item in work" :key="item">
            <img :src="item" alt="picture" @click="Display()">
          </div>
      </div>
    </div>

  </div>
</template>

<script>
/**
 * 作用：网站首页
 * 状态：一种
 * 样式要求：暂时没有(将来可能需要添加一些特效，以后找到了想加的再贴过来~)
 * 问题：暂时没有
 */

import picture1 from '@/../static/images/home/bird.jpg';
import picture2 from '@/../static/images/home/currants.jpg';
import picture3 from '@/../static/images/home/flower.jpg';
import picture4 from '@/../static/images/home/rustic.jpg';
import picture5 from '@/../static/images/home/water-bottle.jpg';
import picture6 from '@/../static/images/home/woman.jpg';
import picture7 from '@/../static/images/home/fog.jpg';
import picture8 from '@/../static/images/home/cat.jpg';
import test from '@/api/user';
import axios from 'axios';

export default {
	data() {
		return {
			describe: 'Here is the description of the site operation...',
			works: 'there are some works...',
			work: [picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8],
		};
	},
	methods: {
		goSignUp() {
			// 暂时提供进入企业主页的入口，仅供测试时使用
			// this.$router.push('/enterpriseHomePage');
			this.$router.push('/studentHomePage');
			// this.$router.push('/signinbackup');
		},
		Display() {
			// 点击图片发生的动作
			// 暂时不需要
		},
		// goTest() {
		//   axios.get('/student/test')
		//   .then(res => console.log(res))
		//   .catch(err => console.log(err));
		// }
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.home {
	width: 100%;
	margin-top: 0.2rem;
	.banner {
		position: relative;
		height: $h-banner;
		background-image: url('/static/images/home/background.jpg');
		background-size: cover;
		.button {
			position: relative;
			width: 6.25rem;
			height: 2.3rem;
			left: 15%;
			top: 23rem;
			background-color: $clr-main;
			color: $clr-white;
			border: none;
		}
	}
	.describe {
		position: relative;
		padding: 3rem;
		width: 40%;
		height: 18rem;
		.content {
			padding: 0.3rem;
			box-shadow: $shadow-work;
			height: 17rem;
			width: 15rem;
		}
	}
	.display {
		position: relative;
		padding: 3rem;
		// height: 45rem;
		.works {
			padding: 1em;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-around;
			box-shadow: $shadow-work;
			// border: 0.06rem solid $clr-border;

			// 图片布局看的很不舒服，margin太多
			img {
				border-radius: 4px;
				width: 15vw;
				height: calc(20vw);
				margin: 1em;
				box-shadow: $shadow-work;
				border: 0.06rem solid $clr-border;
			}
			&:after {
				content: '';
				width: 15vw;
				margin: 0 1em;
			}
		}
	}
}
</style>
