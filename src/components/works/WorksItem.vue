<template>
  <div class="works-item">
    <div class="works-img">
      <a @click="openWorksDetails(works.id)">
        <img
          :src="address + works.attachmentShowPath"
          :alt="works.attachmentShowName"
          :key="works.id"
        >
      </a>
    </div>
    <div class="dialog-container">
      <el-dialog :visible.sync="worksDialogVisible" style="height: 70hw;">
        <div class="swiper-container">
          <el-carousel height="400px">
            <el-carousel-item v-for="(list, index) in worksData.waterPictureDTOList" :key="index">
              <img :src="address + list.attachmentWatermarkPath" alt="list.attachmentWatermarkPath">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-dialog>
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
import { queryWorksDetails } from "@/api/works";
import { mapGetters } from "vuex";

export default {
  props: {
    works: {}
  },
  data() {
    return {
      address: "http://120.79.239.141:8080/",
      worksDialogVisible: false,
      worksData: [],
      role: "passer"
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.role = this.user.role;
  },
  methods: {
    openWorksDetails(worksId) {
      if (this.role === "passer") {
        this.worksDialogVisible = true;
        const data = {
          worksId
        };
        queryWorksDetails(data)
          .then(res => {
            this.worksData = res.data;
          })
          .catch(err => {
            console.log("获取作品详情失败！");
          });
      } else {
        this.$router.push({
          name: "WorksDetails",
          params: {
            worksId: worksId
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.works-item {
  flex-grow: 1;
  .works-img {
    margin: 2px;
    transition: all 1s ease 0s;
    height: calc(20vw);
    img {
      cursor: pointer;
      height: calc(20vw);
      max-width: 100%;
      min-width: 100%;
      object-fit: cover;
      vertical-align: bottom;
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
}
</style>

<style lang="scss">
@import "src/assets/scss/index";

// 怎么覆盖
.el-dialog__headerbtn:hover {
  background-color: $clr-white;
}
</style>


