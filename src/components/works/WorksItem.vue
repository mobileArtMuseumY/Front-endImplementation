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
      <div class="hover">
        <a @click="openWorksDetails(works.id)">
          <label>{{ works.attachmentShowName }}</label>
        </a>
        <svg-icon
          icon="collection"
          @click.native="goToCollect(works.id)"
          id="collect"
          class="collect-icon"
          style="width: 15px; height: 15px;"
        ></svg-icon>
      </div>
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
      worksData: []
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    openWorksDetails(worksId) {
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
    },
    goToCollect(worksId) {
      if (this.user.signIn) {
        document.getElementById("collect").style.color = "red";
        this.$store.dispatch("CollectWorks", worksId);
      } else {
        this.$message({
          message: "您需要先登录才能收藏哦~",
          type: "warning"
        });
        return;
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
    border: $border;
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
    .hover {
      display: flex;
      transform: translateY(-1.3rem);
      justify-content: space-around;
      &:hover {
        display: flex;
      }
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


