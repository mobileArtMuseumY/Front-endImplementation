<template>
  <div class="tip">
    <svg-icon icon="success" v-if="type === 'success'"></svg-icon>
    <svg-icon icon="warning" v-if="type === 'warning'"></svg-icon>
    <label>{{ msg }}</label>
  </div>
</template>

<script>
/**
 * 信息图示页面
 * 1. 邮箱验证提示
 * 2. 注册审核
 * 3. 项目发布审核
 * 4. 支付确认
 * 5. 余额不足
 */
export default {
  prop: {
    msg: '',
    type: '',
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';



</style>