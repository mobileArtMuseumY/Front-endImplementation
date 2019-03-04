<template>
  <div class="container">
    <pro-registration-btn></pro-registration-btn>
    <div class="filter">
      <div class="search">
        <el-input placeholder="search" prefix-icon="el-icon-search" v-model="search" clearable></el-input>
      </div>
      <div class="sort">
        <label>分类：</label>
        <span @click="sortOfFocused()">关注度</span>
      </div>
    </div>
    <div class="main">
      <the-talent :theTalent="item" v-for="(item, index) in items" :key="index"></the-talent>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="rows"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getStudentRanking, getStudentCount } from "@/api/user";

export default {
  data() {
    return {
      rows: 10,
      total: Number,
      currentPage: 1,
      offset: 0,
      limit: 20,
      items: [],
      search: ""
    };
  },
  methods: {
    sortOfFocused() {
      const data = {
        page: this.currentPage,
        rows: this.rows
      };
      getStudentRanking(data)
        .then(res => {
          this.items = res.data;
          getStudentCount()
            .then(res => {
              this.total = res.data;
            })
            .catch(err => {
              console.log("获取项目总数和失败！");
            });
        })
        .catch(err => {
          console.log(err + "获取学生信息失败！");
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.sortOfFocused();
    }
  },
  mounted() {
    this.sortOfFocused();
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  // padding-top: $h-nav;
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
    margin-bottom: 2rem;
  }
  .pagination-container {
    margin-bottom: 2rem;
  }
}

span {
  margin: 0.3rem;
  font-size: 0.8rem;
  color: $clr-gray;
}
</style>

<style lang="scss">

.btn-prev {
  background-color: white;
}

.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  background-color: white;
}
</style>

