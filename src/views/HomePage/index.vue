<template>
  <div class="container">
    <div class="banner">
      <button class="signup-button" @click="goToSignUp()">注册</button>
    </div>

    <div class="content">
      <h3>该如何运作我们的网站？</h3>
      <div class="describe">
        {{ describe }}
      </div>
    </div>

    <div class="display">
      <h3>美图欣赏</h3>
      <div class="works">
          <div v-for="item in works" :key="item">
            <img :src="item" alt="works" @click="goToDisplay()">
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

export default {
	data() {
		return {
			describe: 'Here is the description of the site operation...',
			works: [picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8],
		};
	},
	methods: {
		goToSignUp() {
			// 暂时提供进入企业主页的入口，仅供测试时使用
			// this.$router.push('/user/enterpriseHomePage');
			// this.$router.push('user//studentHomePage');
			this.$router.push('/signinFirst');
		},
		goToDisplay() {
			// 点击图片发生的动作
			// 暂时不需要
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	width: 100%;
	margin-top: $h-nav;
	.banner {
		height: $h-banner;
		background-image: url('/static/images/home/background.jpg');
		background-size: cover;
		.signup-button {
			position: relative;
      cursor: pointer;
			@include wh(6.25rem, 2.3rem);
			@include margin-tl(23rem, 15%);
			background-color: $clr-main;
			color: $clr-white;
			border: none;
		}
	}
	.content {
		padding: 3rem;
		@include wh(40%, 18rem);
		.describe {
			padding: 0.3rem;
			box-shadow: $shadow-work;
			@include wh(17rem, 15rem);
		}
	}
	.display {
		padding: 3rem;
		.works {
			width: 90%;
			padding: 1em;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-around;
			box-shadow: $shadow-work;
			img {
				border-radius: 3px;
				@include wh(17vw, 35vh);
				margin: 0.5em;
				transform: scale(1);
				transition: all 1s ease 0s;
				border: $border;
				&:hover {
					transform: scale(1.1);
					transition: all 1s ease 0s;
				}
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
