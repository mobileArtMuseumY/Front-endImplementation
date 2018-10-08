<template>
  <div class="container">
    <!-- <pro-registration-btn></pro-registration-btn> -->
    {{msg}}
    <div class="pagination">
      <p>hello</p>
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
	height: 80vw;
	margin-top: $h-nav;
	width: 100%;
  background-color: #f7f8fa;
  .pagination {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
}
</style>
