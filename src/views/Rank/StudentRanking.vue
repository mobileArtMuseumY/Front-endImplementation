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
      <div class="sort">
        <label>分类：</label>
        <span @click="sortOfFocused()">关注度</span>
      </div>
    </div>
    <div class="main">
      <the-talent :theTalent="item" v-for="(item, index) in items" :key="index"></the-talent>
    </div>
    <div class="pagination">
      <template v-if="count">
        <ul>
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
import { getStudentRanking } from '@/api/user';

export default {
	data() {
		return {
			msg: '人才排行榜',
			pageSize: 8,
			currentPage: 1,
			count: 100,
      items: [],
      search: '',
		};
	},
	methods: {
		pageChange(page) {
			this.currentPage = page;
			// this.sortOfFocused();
    },
    sortOfFocused() {
      const data = {
        page: this.currentPage,
        rows: this.pageSize,
      };
      getStudentRanking(data).then(res => {
        this.items = res.data;
      }).catch(err => {
        console.log(err + '获取学生信息失败！');
      });
    },
  },
  mounted() {
    this.sortOfFocused();
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
		margin-top: 2rem;
		border-radius: 4px;
		@include wh(80vw, 4rem);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.search {
			width: 30%;
		}
	}
	.main {
		width: 80vw;
		background-color: #fff;
		border-radius: 4px;
	}
	.pagination {
		@include margin-tl(3rem, -7rem);
		margin-bottom: 3rem;
	}
}

span {
	margin: 0.3rem;
	font-size: 0.8rem;
	color: $clr-gray;
}
</style>
