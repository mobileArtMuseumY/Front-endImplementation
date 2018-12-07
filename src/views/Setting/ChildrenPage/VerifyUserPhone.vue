<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '验证用户手机',
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';


.container {
	padding-top: $h-nav;
  // border: $border;
  // height: 100%;
}

</style>
