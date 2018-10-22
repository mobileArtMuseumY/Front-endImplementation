<template>
  <div class="works">
    <div class="works-img">
      <a @click="openWorksDetails(works.id)">
        <img src="works.attachmentShowPath" :alt="works.attachmentShowName" :key="works.id">
      </a>
      <div class="hover">
        <a @click="openWorksDetails(works.id)">
          <label>{{ works.attachmentShowName }}</label>
        </a>
         <a @click="collect(works.id)">
           <!-- <svg-icon icon="collection">{{ data.worksNum }}</svg-icon> -->
           <svg-icon icon="collection"> 32 </svg-icon>
           <!-- 点击颜色改变 -->
         </a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作品item
 */
import { queryWorksDetails } from '@/api/works';
import { mapGetters } from 'vuex';

export default {
	props: {
		works: {},
	},
	data() {
		return {
			lala: {
				worksUrl: '',
				worksName: '',
				worksId: Number,
				worksNum: Number,
			},
		};
	},
	computed: {
		...mapGetters(['user']),
	},
	methods: {
		openWorksDetails(worksId) {
			this.$router.push('/works/details/worksId=' + worksId);
		},
		collect(worksId) {
			if (user.signin) {
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
</style>



