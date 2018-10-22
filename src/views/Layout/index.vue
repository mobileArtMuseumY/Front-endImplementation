<template>
  <div class="wrap">
    <the-nav :nav="nav"></the-nav>
    <div class="main-wrap">
       <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          name: '首页',
          link: '/home',
        },
        {
          name: '发布项目',
          link: '/project/publish',
        },
        {
          name: '浏览项目',
          link: '/project/view',
        },
        {
          name: '人才排行榜',
          link: '/rank/student',
        },
        {
          name: '发现',
          link: '/explore',
        },
      ],
      
    };
  },
};
</script>

<style lang="scss" scoped>
.main-wrap{
  min-height: calc(100vh - 56px - 120px)
}
</style>
