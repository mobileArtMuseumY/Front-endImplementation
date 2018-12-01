<template>
  <div class="the-talent">
    <div class="left">
      <!-- <img :src="theTalent.avatar" alt="studentAvatar" class="avatar-of-student"> -->
      <svg-icon
        icon="user"
        style="width: 70px; height: 70px; color: #5E5E5E; "
        class="avatar-of-business"
      ></svg-icon>
      <a @click="goToStudentHome(theTalent.id)">
        <label class="student-name" style="cursor: pointer;">
          <strong>{{ theTalent.loginName}}</strong>
        </label>
      </a>
      <p
        class="description"
      >there is the description.there is the description.there is the description.there is the description.</p>
      <!-- <p class="description">{{ theTalent.introduction }}</p> -->
      <!-- <label>{{ theTalent.followerCount }}</label> -->
      <label>12</label>
      <label>followers</label>
      <svg-icon
        icon="follow"
        style="width: 15px; height:15px;"
        class="follow-people"
        @click.native="goToFollow(theTalent.id)"
        id="follow-people"
      ></svg-icon>
    </div>
    <div class="right">
      <Swiper
        v-if="theTalent.worksDTOList.length > 0"
        :autoPlay="true"
        :showIndicator="true"
        interval="50000"
        duration="50000"
      >
        <Slide v-for="(list, index) in theTalent.worksVOList" :key="index">
          <img :src="address + list.attachmentShowPath" alt="list.attachmentShowName">
        </Slide>
      </Swiper>
    </div>
  </div>
</template>

<script>
/**
 * 单个学生出色作品展示
 */

export default {
  props: {
    theTalent: ""
  },
  data() {
    return {
      address: "http://120.79.239.141:8080/"
    };
  },
  // computed: {
  // 	...mapGetters(['user']),
  // },
  methods: {
    goToStudentHome(studentId) {
      this.$router.push({
        name: "StudentHomepage",
        params: studentId
      });
    },
    goToFollow(followedId) {
      document.getElementById("follow-people").color = "red";
      // 发送请求
    }
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
    .follow-people {
      &:hover {
        cursor: pointer;
        color: $clr-main;
      }
    }
  }
  .right {
    @include wh(40%, 15rem);
    img {
      cursor: pointer;
      border-radius: 1px;
      @include wh(100%, 15rem);
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

