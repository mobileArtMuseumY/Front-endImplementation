<template>
  <div class="container">
    <div class="swiper-container">
      <el-carousel height="500px">
        <el-carousel-item v-for="(list, index) in homeWorksList" :key="index">
          <img :src="list.position" alt="list" style="width: 100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="content-container">
      <h3>该如何运作我们的网站？</h3>
      <div class="description-container">{{ description }}</div>
    </div> -->
    <div class="display-container">
      <h3>经典教程</h3>
      <div class="works-container">
        <div v-for="(item, index) in works" :key="index">
          <a :href="item.link">
            <img :src="item.picture" alt="works" @click="goToDisplay()">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作用：网站首页
 * 状态：一种
 * 样式要求：暂时没有(将来可能需要添加一些特效，以后找到了想加的再贴过来~)
 * 问题：暂时没有
 */

import picture1 from "@/../static/images/home/1.png";
import picture2 from "@/../static/images/home/2.png";
import picture3 from "@/../static/images/home/3.png";
import picture4 from "@/../static/images/home/4.png";
import picture5 from "@/../static/images/home/5.png";
import picture6 from "@/../static/images/home/6.png";
import picture7 from "@/../static/images/home/7.png";
import picture8 from "@/../static/images/home/8.png";
import { pay } from "@/api/user";

export default {
  data() {
    return {
      description: "Here is the description of the site operation...",
      works: [
        {
          picture: picture1,
          link: "https://uiiiuiii.com/aftereffects/1212128657.html"
        },
        {
          picture: picture2,
          link: "https://uiiiuiii.com/draw/1212129319.html"
        },
        {
          picture: picture3,
          link: "https://uiiiuiii.com/illustrator/1212127060.html"
        },
        {
          picture: picture4,
          link: "https://uiiiuiii.com/inspiration/1616130073.html"
        },
        {
          picture: picture5,
          link: "https://uiiiuiii.com/inspiration/1616130093.html"
        },
        {
          picture: picture6,
          link: "https://uiiiuiii.com/inspiration/1616130316.html"
        },
        {
          picture: picture7,
          link: "https://uiiiuiii.com/inspiration/1616130403.html"
        },
        {
          picture: picture8,
          link: "https://uiiiuiii.com/knowledge/1212130264.html"
        }
      ],
      homeWorksList: [
        {
          position: "/static/images/home/初飒1.jpg"
        }
        ,
        {
          position: "/static/images/home/初飒2.jpg"
        }
        ,
        {
          position: "/static/images/home/初飒3.jpg"
        }
        ,
        {
          position: "/static/images/home/石海霞.jpg"
        }
        ,
        {
          position: "/static/images/home/龙雨作品展示.jpg"
        }
      ]
    };
  },
  methods: {
    goToSignUp() {
      this.$router.push({
        name: "SignUp"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  width: 100%;
  // padding-top: $h-nav;
  .swiper-container {
    width: 90%;
    margin: auto;
    margin-top: 1rem;
    // height: $h-banner;
    // background-image: url("/static/images/home/background.jpg");
    // background-size: cover;
  }
  // .content-container {
  //   padding: 3rem;
  //   @include wh(40%, 18rem);
  //   .description-container {
  //     padding: 0.3rem;
  //     box-shadow: $shadow-work;
  //     @include wh(17rem, 15rem);
  //   }
  // }
  .display-container {
    margin: 4rem auto;
    h3 {
      margin-left: 3rem;
      margin-bottom: 3rem;
    }
    .works-container {
      width: 90%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      img {
        border-radius: 3px;
        transform: scale(1);
        cursor: pointer;
        transition: all 1s ease 0s;
        // margin-top: 1rem;
        // margin-left: 0.5rem;
        &:hover {
          transform: scale(1.01);
          transition: all 1s ease 0s;
        }
      }
      &:after {
        content: "";
        width: 15vw;
        margin-top: 0.5em;
      }
    }
  }
}
</style>
