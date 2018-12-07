<template>
  <div class="container">
    <div class="works-item-container">
      <works-items-self
        :worksItem="worksItem"
        type="bid"
        :projectId="projectId"
        v-for="(worksItem, index) in worksItems"
        :key="index"
      ></works-items-self>
    </div>
  </div>
</template>

<script>
import { getSelfWorks } from "@/api/works";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      worksItems: "",
      projectId: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {},
  mounted() {
    this.projectId = this.$route.params.projectId;
    const data = {
      id: this.user.userInfo.userId,
      page: 1,
      rows: 10
    };
    // 获取作品信息
    getSelfWorks(data)
      .then(res => {
        this.worksItems = res.data;
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "获取作品信息失败！"
        });
      });
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  padding-top: $h-nav;
  .works-item-container {
    display: flex;
  }
}
</style>