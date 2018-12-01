<template>
  <div class="container">
    <div class="main">
      <div class="title">
        <h2>作品详细信息</h2>
      </div>
      <div class="works-form">
        <el-form :model="worksData">
          <el-form-item label="作品名称：">
            <el-input v-model="worksData.worksName"></el-input>
          </el-form-item>
          <el-form-item label="作品描述：">
            <el-input v-model="worksData.worksDescribe"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { queryWorksDetails } from "@/api/works";

export default {
  data() {
    return {
      worksData: []
    };
  },
  mounted() {
    const data = {
      worksId: this.$route.params.worksId
    };
    queryWorksDetails(data)
      .then(res => {
        this.worksData = res.data;
      })
      .catch(err => {
        console.log("获取作品详情失败！");
      });
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  padding-top: $h-nav;
}
</style>
