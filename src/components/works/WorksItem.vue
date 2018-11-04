<template>
  <div class="works-item">
    <div class="works-img">
      <a @click="openWorksDetails(works.id)">
        <img :src="address + works.attachmentShowPath" :alt="works.attachmentShowName" :key="works.id" >
      </a>
      <div class="hover">
        <a @click="openWorksDetails(works.id)">
          <label >{{ works.attachmentShowName }}</label>
        </a>
        <svg-icon icon="collection" @click.native="goToCollect(works.id)" id="collect" class="collect-icon" style="width: 15px; height: 15px;"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 发现中作品item
 * 问题：
 * 1. .hover想要实现的效果是：当前不可见，当图片被hover被hover时显示
 * 2. 点击.hover时，图片不能实现blur的效果
 * 3. 图片多的时候排版问题
 * 4. 这里的icon颜色值不能控制，nav中的可以？？
 */
import { queryWorksDetails } from '@/api/works';
import { mapGetters } from 'vuex';

export default {
	props: {
		works: {},
	},
	data() {
		return {
			address: 'http://120.79.239.141:8080/',
		};
	},
	computed: {
		...mapGetters(['user']),
	},
	methods: {
		openWorksDetails(worksId) {
			console.log('查看作品详情');
			this.$router.push({
        name: 'WorksDetails',
        params: {
          worksId,
        }
      });
		},
		goToCollect(worksId) {
			if (this.user.signIn) {
				console.log('你进来了？？？');
				document.getElementById('collect').style.color = 'red';
				this.$store.dispatch('CollectWorks', worksId);
			} else {
				this.$message({
					message: '您需要先登录才能收藏哦~',
					type: 'warning',
				});
				return;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.works-img {
	margin: 0.3rem;
	transition: all 1s ease 0s;
  overflow: hidden;
	img {
		cursor: pointer;
		border-radius: 1px;
		height: calc(15vw);
		max-width: 100%;
		min-width: 100%;
		object-fit: cover;
		vertical-align: bottom;
		box-shadow: $shadow-work;
		z-index: 4;
		&:hover {
			filter: blur(2px);
		}
	}
	.hover {
		display: flex;
		transform: translateY(-1.3rem);
		justify-content: space-around;
		// display: none;
		&:hover {
			display: flex;
		}
	}
	&:hover {
		transform: translateY(-0.5rem);
		transition: all 0.5s ease 0s;
	}
}

// 没效果？？
.collect-icon {
	cursor: pointer;
	&:hover {
		color: $clr-main;
	}
}
</style>

