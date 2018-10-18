<template>
  <div class="container">
    <pro-registration-btn></pro-registration-btn>
    <div class="filter">

    </div>
    <div class="main">

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
export default {
	data() {
		return {
			msg: '人才排行榜',
			pageSize: 8,
			currentPage: 1,
			count: 100,
			items: [],
		};
	},
	methods: {
		pageChange(page) {
			this.currentPage = page;
			// this.sortOfFocused();
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	margin-top: $h-nav;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.filter {
		position: relative;
		background-color: #fff;
		margin-top: 2rem;
		border-radius: 4px;
		width: 80vw;
		height: 6rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.main {
		width: 80vw;
		height: 130rem;
		background-color: #fff;
		border-radius: 4px;
		margin-top: 1rem;
	}
	.pagination {
		margin-top: 3rem;
		margin-bottom: 3rem;
		margin-left: -7vw;
	}
}
</style>
