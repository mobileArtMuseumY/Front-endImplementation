<template>
  <div class="home">
    <!-- <div v-loading="loading" element-loading-text="loading..." style="min-height: 35vw;" v-if="!error"></div> -->
    <div class="banner">
      <el-row>
        <el-button type="danger" class="button" @click="signup()">注册</el-button>
      </el-row>
    </div>

    <div class="describe">
      <h3>该如何运作我们的网站？</h3>
      <div class="content">
        {{describe}}
      </div>
    </div>

    <div class="display">
      <h3>精品展示</h3>
      <div class="works">
          <div v-for="item in work" :key="item">
            <img :src="item" alt="picture">
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import picture1 from '../../../static/images/works/bird.jpg';
import picture2 from '../../../static/images/works/currants.jpg';
import picture3 from '../../../static/images/works/flower.jpg';
import picture4 from '../../../static/images/works/rustic.jpg';
import picture5 from '../../../static/images/works/water-bottle.jpg';
import picture6 from '../../../static/images/works/woman.jpg';

export default {
  data() {
    return {
      describe: 'Here is the description of the site operation...',
      works: 'there are some works...',
      work: [picture1, picture2, picture3, picture4, picture5, picture6],
    };
  },
  methods: {
    signup() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.home {
   width: 100%;
   background-color: $clr-white;
   margin-top: .2rem;
  .banner {
    position: relative;
    height: $h-banner;
    background-image: url('/static/images/banner/background.jpg');
    background-size: cover;
    .button{
      position: relative;
      width: 6.25rem;
      left: 15%;
      top: 23rem;
    }
  }
  .describe {
    position: relative;
    padding: 3rem;
    width: 40%;
    height: 18rem;
    border: .06rem solid $clr-border;
    .content {
      padding: .3rem;
      border: .06rem solid $clr-border;
    }
  }
  .display {
    position: relative;
    padding: 3rem;
    height: 44rem;
    border: .06rem solid $clr-border;
    .works {
      padding: .3rem;
      border: .06rem solid $clr-border;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      img {
        width: 13rem;
        height: 15rem;
        margin-left: 5rem;
        margin-top: 1.5rem;
      }
    }
  }
}

</style>
