<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '这是忘记密码部分啦~',
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
  margin-top: $h-nav;
}

</style>