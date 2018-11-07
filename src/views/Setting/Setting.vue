<template>
  <div class="container">
    {{msg}}
    {{ this.$route.params.info }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '设置',
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
