<template>
  <div class="wrap">
    <div
      class="header"
      style="background-image: url(/static/images/home/background.png); width: 100%; height: 150px;"
    ></div>
      <!-- :v-if="isHomepage" -->
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
          name: "首页",
          link: "/home"
        },
        {
          name: "发布项目",
          link: "/project/publish"
        },
        {
          name: "浏览项目",
          link: "/project/view"
        },
        {
          name: "人才排行榜",
          link: "/rank/student"
        },
        {
          name: "发现",
          link: "/explore"
        }
      ],
      currentRoute: '',
      isHomepage: false,
    };
  },
  // watch: {
  //   $route(to) {
  //     console.log(to);
  //     if(to.path === '/home') {
  //       this.isHomepage = true;
  //       console.log(this.isHomepage);
  //     } else {
  //       this.isHomepage = false;
  //       console.log(this.isHomepage);
  //     }
  //   }
  // }

};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.main-wrap {
  min-height: calc(100vh + 100px);
}
</style>
