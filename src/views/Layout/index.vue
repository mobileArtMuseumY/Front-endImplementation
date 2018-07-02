<template>
  <div class="wrap">
    <the-nav :nav="nav"></the-nav>
    <router-view></router-view>
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
