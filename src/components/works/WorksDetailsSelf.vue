<template>
  <div>
    <div class="works-details-self" style="display: flex;">
      <div class="left-container">
        <!-- <img :src="studentItem.avatar" alt="studentAvatar" class="avatar-of-student"> -->
        <div style="display: flex;">
          <svg-icon icon="user" style="width: 50px; height:50px;"></svg-icon>
          <span class="student-name">
            <strong>{{ studentItem.loginName }}</strong>
          </span>
        </div>
        <div>
          <div style="margin-top: 1rem; margin-left: .3rem;">
            <a @click="goToStudentHome(studentItem.studentId)">作品集</a>
          </div>
          <ul v-if="studentItem.skillList">
            <div class="skill-list-container">
              <li
                v-for="skill in studentItem.skillList"
                :key="skill.id"
                class="skill-item"
              >{{ skill.skillName }}</li>
            </div>
          </ul>
        </div>
      </div>
      <div class="decription-container" :v-if="isSelf === 0 || studentItem.worksId">
        <p
          class="description"
        >this is the description of this worksthis is the description of this worksthis is the description of this works</p>
        <!-- <p class="description">{{ studentItem.worksDescribe }}</p> -->
        <div class="details-container">
          <svg-icon
            icon="email"
            @click.native="goToConnectStudent(studentItem.studentId, 'email')"
            class="icon"
            id="email"
          ></svg-icon>
          <a @click="worksDetails(studentItem.worksId)">详情信息</a>
        </div>
      </div>
      <div class="right-container">
        <div class="price-container">
          <span>违约次数/交易次数：{{ studentItem.breakTime }}/{{ studentItem.count }}</span>
          <span>报价(RMB)：{{studentItem.price }}</span>
        </div>
        <div class="icon-container">
          <svg-icon
            icon="bookmarker"
            style="width: 35px; height: 35px; transform: translate(2rem, -2rem);"
            @click.native="goToMark(studentItem.studentId)"
            class="icon"
            :id="markId"
          ></svg-icon>
          <svg-icon
            icon="check"
            style="width: 25px; height: 25px; transform: translateX(2.2rem);"
            @click.native="goToSelectBid(studentItem.worksId)"
            class="icon"
            :id="bidId"
            v-if="isSelf === 0"
          ></svg-icon>
        </div>
      </div>
      <el-dialog :visible.sync="worksDialogVisible" style="height:95vh">
        <div class="swiper-container">
          <el-carousel height="430px">
            <el-carousel-item v-for="(list, index) in worksData.waterPictureDTOList" :key="index">
              <img
                :src="address + list.attachmentWatermarkPath"
                :alt="address + list.attachmentWatermarkPath"
              >
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * 企业看自己项目的详情
 * type:
 * 学生： bidding 学生除了自己作品的投标作品列表
 *       myworks 自己投标的作品
 * 企业：bidding 所有的投标作品
 */
import { queryWorksDetails } from "@/api/works";
import { followOthers, unFollowOthers, enterpriseSelectBid } from "@/api/user";
import { mapGetters } from "vuex";

export default {
  props: {
    studentItem: "",
    isSelf: "",
    projectId: "",
    type: ""
  },
  data() {
    return {
      address: "http://120.79.239.141:8080/",
      worksDialogVisible: false,
      worksData: [],
      markId: this.studentItem.studentId + 1,
      bidId: this.studentItem.studentId + 2
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    console.log(this.type);
  },
  methods: {
    goToStudentHome(studentId) {
      this.$router.push({
        name: "StudentHomepage",
        params: {
          id: studentId
        }
      });
    },
    worksDetails(worksId) {
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
    goToConnectStudent(studentId, id) {
      this.$message({
        message: "敬请期待~"
      });
    },
    goToMark(studentId) {
      if (!(this.user.userInfo.userId === studentId)) {
        const data = {
          followedId: studentId
        };
        if (!(document.getElementById(this.markId).style.color === "red")) {
          followOthers(data)
            .then(res => {
              this.changeColor(true, this.markId);
              this.$message({
                type: "success",
                message: "关注成功！"
              });
            })
            .catch(() => {
              console.log("关注失败！");
            });
        } else {
          unFollowOthers(data)
            .then(res => {
              this.changeColor(false, this.markId);
              this.$message({
                type: "success",
                message: "取消关注成功！"
              });
            })
            .catch(() => {
              console.log("取消关注失败！");
            });
        }
      } else {
        this.$message({
          type: "warning",
          message: "自己不能关注自己哦~"
        });
      }
    },
    // 选标进入订单确认界面
    goToSelectBid(worksId, id) {
      this.$confirm("选定后将不能更改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = {
          projectId: this.projectId,
          worksId: worksId
        };
        this.$router.push({
          name: "OrderConfirm",
          params: {
            data: data
          }
        });
      });
    },
    changeColor(type, id) {
      if (type) {
        document.getElementById(id).style.color = "red";
      } else {
        document.getElementById(id).style.color = "gray";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.works-details-self {
  // .empty-container {
  //   // width:
  // }
  padding: 1rem 1rem 2rem 2rem;
  margin: 1rem;
  border-bottom: 0.06rem solid #bcbcbc;
  display: flex;
  // border: $border;
  justify-content: space-between;
  .left-container {
    // border: $border;
    .avatar-of-student {
      @include wh(50px, 50px);
    }
    .student-name {
      font-size: 10px;
      margin-left: 1rem;
    }
    .go-to-home {
      margin-top: 2rem;
    }
  }
  // .center-container {
  //   // border: $border;
  //   display: flex;
  //   width: 25vw;
  //   justify-content: space-between;
  //   flex-direction: column;
  //   .details-container {
  //     display: flex;
  //     justify-content: space-between;
  //   }
  //   .description {
  //     margin: 0;
  //     width: 25vw;
  //     line-height: 1.5rem;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     display: -webkit-box;
  //     -webkit-line-clamp: 2; // 改变行数
  //     -webkit-box-orient: vertical;
  //     color: $clr-footer-font;
  //   }
  // }
  .details-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .description {
    margin: 0;
    width: 25vw;
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 改变行数
    -webkit-box-orient: vertical;
    color: $clr-footer-font;
  }
  .right-container {
    // border: $border;
    display: flex;
    > div {
      margin-left: 2rem;
      &:first-child {
        margin-left: 0rem;
      }
    }
    .price-container {
      display: flex;
      flex-direction: column;
      > span {
        margin-top: 1rem;
        &:first-child {
          margin-top: 0rem;
        }
      }
    }
    .icon-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

.icon {
  &:hover {
    color: $clr-main;
  }
}
</style>

