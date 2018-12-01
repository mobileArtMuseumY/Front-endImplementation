<template>
  <div class="works-details-self">
    <div class="profile-container">
      <!-- <img :src="studentItems.avatar" alt="studentAvatar" class="avatar-of-student"> -->
      <svg-icon icon="user"></svg-icon>
      <span class="student-name"><strong>{{ studentItems.loginName }}</strong></span>
      <ul v-if="studentItems.skillList">
        <div class="skill-list-container">
            <li v-for="skill in studentItems.skillList" :key="skill.id" class="skill-item">{{ skill.skillName }}</li>
        </div>
      </ul>
    </div>
    <!-- 这里需要检测是否是自己 -->
    <div class="decription-container">
      <p>{{ studentItems.worksDescribe }}</p>
      <svg-icon icon="email"></svg-icon>
      <a>详情信息</a>
      <!-- 这里是一个弹出框 -->
    </div>
    <div class="price-container">
      <span>违约次数/交易次数：{{ studentItems.breakTime }}/{{ studentItems.count }}</span>
      <span>报价(RMB)：{{studentItems.price }}</span>
    </div>
    <div class="icon-container">
      <svg-icon icon="bookmarker"></svg-icon>
      <svg-icon icon="check"></svg-icon>
    </div>
  </div>
</template>

<script>
/**
 * 企业看自己项目的详情
 */

export default {
	props: {
		studentItems: {},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';
</style>

