<template>
  <div class="nav-wrap">
    <div class="nav-left">
      logo
    </div>
    <div class="nav-center">
      <router-link
        v-for="(v, i) of theNav"
        :key="i" :to="v.link">
        {{v.name}}
      </router-link>
    </div>
    <div class="nav-right">
      <div class="nav-search">
        <el-input
          placeholder="请输入需要搜索的内容"
          prefix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </div>
      <div class="nav-login">
        <span @click="goSignin()">登录</span>
          |
        <span @click="goSignup()">注册</span>
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
    };
  },
  props: {
    nav: {
      type: Array,
      required: true,
    },
  },
  computed: {
    theNav() {
      if (this.nav.length) return this.nav.filter(x => x.name);
    },
  },
  methods: {
    goSignin() {
      this.$router.push('/signin');
    },
    goSignup() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style lang="scss" >
@import 'src/assets/scss/index';

.nav-wrap {
  width: 100%;
  height: $h-nav;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: $clr-white;
  align-items: center;
  transition: all .3s ease;
  box-shadow: $shadow-nav;
  overflow: hidden;
  .nav-left{

  }
  .nav-center{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .nav-right{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .nav-search{
      width: 12rem;
      margin-right: 2rem;
      .el-input__inner{
        border: none;
        border-bottom: 1px solid $clr-border;
      }
    }
    .nav-login{
      span{
        cursor: pointer;
        margin: 0 .2rem;
        &:hover{
          color: $clr-main;
        }
      }
    }
  }
  a {
     display: inline-block;
     text-align: center;
     color: $clr-black;
     text-decoration: none;
     font-size: 1rem;
     line-height: 55px;
     padding: 0 .5rem;
     margin: 0 1rem;
     border-bottom: solid .1rem transparent;
     &:hover{
       color: $clr-main;
     }
     &.active{
       color: $clr-main;
       border-bottom-color: $clr-main;
     }
   }
}
</style>
