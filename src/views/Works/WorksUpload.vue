<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '学生上传作品',
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
