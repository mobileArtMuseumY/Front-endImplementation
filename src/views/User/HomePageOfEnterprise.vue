<template>
  <div class="container">
    <div class="sideBar">
      <div class="profile">
        <svg-icon icon="user"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
  width: 100%;
	margin-top: $h-nav;
  background-color: #f7f8fa;
  height: 60rem;
  .sideBar {
    width: 25vw;
    height: 50rem;
		border: 0.05rem solid $clr-border;
    border-radius: 4px;
  }
}

</style>
