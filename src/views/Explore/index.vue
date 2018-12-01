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
import {
  getWorksDataPassersBy,
  queryWorksDetails,
  getWorksCount
} from "@/api/works";
import axios from "axios";

export default {
  data() {
    return {
      title: "发现",
      // works: [],
      selected: 0, // 当前被选中的项(时间或者follower)
      items: [],
      rows: 10,
      total: Number,
      currentPage: 1,
      offset: 0,
      limit: 20
    };
  },
  methods: {
    sortOfTime() {
      document.getElementById("t-clicked").style.color = "red";
      document.getElementById("f-clicked").style.color = "gray";
      this.selected = 0;
      this.currentPage = 5;
      const data = {
        method: this.selected,
        page: this.currentPage,
        rows: this.rows
      };
      this.getWorksDataPassersBy(data);
    },
    sortOfFocused() {
      document.getElementById("t-clicked").style.color = "gray";
      document.getElementById("f-clicked").style.color = "red";
      this.selected = 1;
      this.currentPage = 1;
      const data = {
        method: this.selected,
        page: this.currentPage,
        rows: this.rows
      };
      this.getWorksDataPassersBy(data);
    },
    // 发送请求
    getWorksDataPassersBy(data) {
      getWorksDataPassersBy(data)
        .then(res => {
          this.items = res.data;
          getWorksCount()
            .then(res => {
              this.total = res.data;
            })
            .catch(err => {
              console.log("获取作品总数和失败！");
            });
        })
        .catch(err => {
          console.log("获取作品失败！");
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.sortOfTime();
    }
  },
  mounted() {
    this.sortOfTime();
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  width: 100%;
  padding-top: $h-nav;
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
    content: "";
    flex-grow: 99;
  }
}
</style>

