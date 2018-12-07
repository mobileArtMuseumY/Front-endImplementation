<template>
  <div class="works-item-self">
    <div class="works-img">
      <a @click="goToWorksDetails(worksItem.id)">
        <img
          :src="address + worksItem.attachmentShowPath"
          :alt="worksItem.attachmentShowName"
          :key="worksItem.id"
        >
      </a>
    </div>
    <div class="dialog-container">
      <el-dialog :visible.sync="worksDialogVisible" style="height:95vh">
        <div class="swiper-container">
          <el-carousel height="430px">
            <el-carousel-item v-for="(list, index) in worksData.waterPictureDTOList" :key="index">
              <img :src="address + list.attachmentWatermarkPath" alt="list.attachmentWatermarkPath">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: space-between;"
        >
          <a
            @click="deleteWorks(worksItem.id)"
            style="cursor: pointer; color: red;"
            v-if="type === 'details'"
          >删除作品</a>
          <a
            @click="studentGoToBid(worksItem.id)"
            style="cursor: pointer; color: red;"
            v-if="type === 'bid'"
          >投标</a>
          <a @click="modifyWorks(worksItem.id)" style="cursor: pointer;">修改作品信息 >>></a>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * 主页中的作品item
 * 其中type参数：
 * bid是投标
 * details是查看项目详情
 */
import { queryWorksDetails, deleteWorksById } from "@/api/works";
import { mapGetters } from "vuex";
import { studentGoToBid } from "@/api/user";

export default {
  props: {
    worksItem: {},
    type: "",
    projectId: ""
  },
  data() {
    return {
      address: "http://120.79.239.141:8080/",
      worksDialogVisible: false,
      worksData: [],
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
  },
  methods: {
    goToWorksDetails(worksId) {
      this.worksDialogVisible = true;
      const data = {
        worksId
      };
      queryWorksDetails(data)
        .then(res => {
          this.worksData = res.data;
        })
        .catch(err => {
          console.log("查看作品详情失败！");
        });
    },
    modifyWorks(worksId) {
      // 修改作品信息
      this.$router.push({
        name: "WorksUpload",
        params: {
          id: worksId
        }
      });
    },
    deleteWorks(worksId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const data = {
            worksId: worksId
          };
          deleteWorksById(data)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "errpr",
                message: "删除作品失败！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    studentGoToBid(worksId) {
      const data = {
        worksId: worksId,
        projectId: this.projectId
      };
      studentGoToBid(data)
        .then(res => {
          this.$message({
            type: "success",
            message: "投标成功！"
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "投标失败！"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.works-item-self {
  margin: 0.3rem;
  transition: all 1s ease 0s;
  overflow: hidden;
  img {
    max-width: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
    box-shadow: $shadow-work;
    z-index: 4;
  }
}
</style>



