<template>
  <div class="home">
    <div class="banner">
      <button class="button" @click="goSignUp()">注册</button>
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
            <img :src="item" alt="picture" @click="Display()">
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
import picture7 from '../../../static/images/works/fog.jpg';
import picture8 from '../../../static/images/works/cat.jpg';

export default {
  data() {
    return {
      describe: 'Here is the description of the site operation...',
      works: 'there are some works...',
      work: [picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8],
    };
  },
  methods: {
    goSignUp() {
      this.$router.push('/signup');
    },
    Display() {},
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.home {
   width: 100%;
   margin-top: .2rem;
  .banner {
    position: relative;
    height: $h-banner;
    background-image: url('/static/images/banner/background.jpg');
    background-size: cover;
    .button{
      position: relative;
      width: 6.25rem;
      height: 2.3rem;
      left: 15%;
      top: 23rem;
      background-color: $clr-main;
      color: $clr-white;
      border: none;
    }
  }
  .describe {
    position: relative;
    padding: 3rem;
    width: 40%;
    height: 18rem;
    .content {
      padding: .3rem;
      box-shadow: $shadow-work;
      height: 17rem;
      width: 15rem;
    }
  }
  .display {
    position: relative;
    padding: 3rem;
    height: 45rem;
    .works {
      // padding: .3rem;
      // display: flex;
      // // flex-direction: row;
      // justify-content: space-around;
      // align-items: center;
      // flex-wrap: wrap;
      column-count: 4;
      box-shadow: $shadow-work;
      img {
        width: 13rem;
        height: 15rem;
        margin-left: 5rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: $shadow-work;
      }
    }
  }
}

</style>
