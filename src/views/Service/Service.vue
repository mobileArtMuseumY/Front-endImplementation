<template>
  <div class="container">
    <div class="main">
      <p>敬请期待~</p>
    </div>
    <div class="footer">
      {{ msg }}
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
    margin: 4rem auto;
    background-color: #fff;
    padding: 2rem;
    color: $clr-footer-font;
  }
  .footer {
    width: 23%;
    color: $clr-footer-font;
    font-size: 13px;
    margin: 4rem auto;
  }
}
</style>