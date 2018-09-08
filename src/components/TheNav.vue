<template>
  <div class="nav-wrap">
    <div class="nav-left">
      <icon class="icon" name="logo" scale="5"></icon>
    </div>
    <div class="nav-center">
      <router-link
        v-for="(v, i) of theNav"
        :key="i" :to="v.link">
        {{v.name}}
      </router-link>
        {{msg}}
    </div>
    <div class="nav-right">
      <div class="nav-login">
        <span @click="goSignIn()">登录</span>
          |
        <span @click="goSignUp()">注册</span>
      </div>
      <div class="nav-search">
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="search"
          clearable>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-nav',
  data() {
    return {
      search: '',
      msg: 'hello',
    };
  },
  props: {
    nav: {
      type: Array,
      required: true,
    },
  },
  computed: {
    return: {
      theNav() {
        if (this.nav.length) {
          return this.nav.filter(x => x.name);
        }
      },
    },
  },
  methods: {
    goSignIn() {
      this.$router.push('/signin');
    },
    goSignUp() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style lang="scss" >
@import "src/assets/scss/index";

.nav-wrap {
  width: 100%;
  height: $h-nav;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: $clr-white;
  align-items: center;
  transition: all 0.3s ease;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: $shadow-nav;
  overflow: hidden;
  .nav-left {
    margin: 10%;
  }
  .nav-center {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 0.06rem solid $clr-border;
  }
  .nav-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .nav-search {
      width: 7rem;
      margin-left: 1rem;
      .el-input__inner {
        border: none;
        &:hover {
          border-bottom: 0.06rem solid $clr-border;
        }
      }
    }
    .nav-login {
      span {
        cursor: pointer;
        margin: 0 0.2rem;
        font-size: 0.8rem;
        &:hover {
          color: $clr-main;
        }
        //没用？？？
        &:visited {
          color: $clr-main;
        }
      }
    }
  }
  a {
    display: inline-block;
    text-align: center;
    color: $clr-black;
    font-size: 1rem;
    line-height: 3rem;
    padding: 0 0.5rem;
    margin: 0 1rem;
    border-bottom: solid 0.1rem transparent;
    &.active {
      color: $clr-main;
      border-bottom-color: $clr-main;
    }
  }
}

</style>
