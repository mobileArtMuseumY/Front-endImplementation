<template>
  <div class="the-talent">
    <div class="left">
      <img
        :src="address + theTalent.avatar"
        v-show="theTalent.avatar"
        style="width: 70px; height: 70px; color: #5E5E5E; border-radius: 50%; "
        alt="studentAvatar"
        class="avatar-of-student"
      >
      <svg-icon
        icon="user"
        style="width: 70px; height: 70px; color: #5E5E5E; "
        class="avatar-of-business"
        v-show="!theTalent.avatar"
      ></svg-icon>
      <a @click="goToStudentHome(theTalent.id)">
        <label class="student-name" style="cursor: pointer;">
          <strong>{{ theTalent.loginName}}</strong>
        </label>
      </a>
      <p class="description">{{ theTalent.introduction }}</p>
      <label>{{ theTalent.followerCount }}</label>
      <label>followers</label>
    </div>
    <div class="right">
      <div class="swiper-container">
        <el-carousel height="250px">
          <el-carousel-item v-for="(list, index) in theTalent.worksDTOList" :key="index">
            <img :src="address + list.attachmentShowPath" alt="list.attachmentShowName">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 单个学生出色作品展示
 */
import { mapGetters } from "vuex";
import { followOthers, unFollowOthers } from "@/api/user";

export default {
  props: {
    theTalent: ""
  },
  data() {
    return {
      address: "http://120.79.239.141:8080/",
      followed: false,
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
    goToStudentHome(studentId) {
    console.log('id')
    console.log(this.theTalent.id)
    console.log(studentId)
      if (this.role === "passer") {
        this.$message({
          message: "您需要先登录才能follow别人哦~",
          type: "warning"
        });
        return;
      } else {
        this.$router.push({
          name: "StudentHomepage",
          params: {
            id: studentId
          }
        });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.the-talent {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: $border;
  &:first-child {
    border-top: none;
  }
  .left {
    @include wh(40%, 15rem);
    .avatar-of-student {
      @include wh(70px, 70px);
    }
    .student-name {
      position: absolute;
      transform: translate(50%, 50%);
      font-size: 17px;
      color: $clr-footer-font;
    }
  }
  .right {
    @include wh(40%, 15rem);
    text-align: center;
    img {
      cursor: pointer;
      border-radius: 1px;
      width: 20vw;
    }
  }
}
.wh_show_bgcolor {
  background-color: $clr-main;
} // 覆盖不了样式

.description {
  padding: 0 0.5rem 0 0;
  line-height: 20px;
  width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 改变行数
  -webkit-box-orient: vertical;
  color: $clr-footer-font;
}
</style>

