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
          <div class="form-description">
            <textarea v-model="worksData.worksDescription" placeholder="请介绍您的作品..."></textarea>
          </div>
          <el-select
            v-model="worksData.selecSkill"
            multiple
            filterable
            placeholder="搜索技能..."
            @change="changeValueOfSkills"
          >
            <el-option
              v-for="item in skills"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-form-item label="报价">
            <div class="form-budget">
              <el-input v-model="worksData.budget"></el-input>
              <div class="RMB">
                <span>RMB</span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
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
  .main {
    width: 80%;
    background-color: #fff;
  }
}
</style>
