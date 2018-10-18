<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script>
/**
 * 1. 邮箱验证提示
 * 2. 注册审核
 * 3. 项目发布审核
 * 4. 支付确认
 * 5. 余额不足
 */
export default {
  data() {
    return {
      msg: '提示信息展示',
    };
  },
};
</script>

<style lang="scss" scoped>

</style>