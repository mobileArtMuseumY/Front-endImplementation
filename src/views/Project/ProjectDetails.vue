<template>
  <div class="container">
    {{msg}}
    {{ this.$route.params.id }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '项目作品详情',
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';


.container {
	padding-top: $h-nav;
}

</style>
