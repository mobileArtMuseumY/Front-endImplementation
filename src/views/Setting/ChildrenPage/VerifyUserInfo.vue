<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '验证用户信息',
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';


.container {
  padding-top: $h-nav;
  border: 0.06rem solid red;
  display: flex;
}

</style>
