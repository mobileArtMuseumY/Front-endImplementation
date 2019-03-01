<template>
  <div class="container">
    <div class="main">
      <p>敬请期待~</p>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "如有需要，请联系我们的管理员，qq：691477228"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  padding-top: $h-nav;
  .main {
    @include wh(50%, 7rem);
    margin: 25vh auto;
    background-color: #f7f8fa;
    padding: 2rem;
    color: $clr-footer-font;
    box-shadow: $shadow-nav;
  }
}
</style>