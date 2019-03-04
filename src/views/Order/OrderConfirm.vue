<template>
  <div class="container">
    <div class="swiper-container">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(list, index) in worksData.worksAttachmentList" :key="index">
          <img :src="address + list.attachmentWatermarkPath" alt="list.attachmentName">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-container">
      <div class="title">
        <h2>订单信息</h2>
      </div>
      <div class="order-form-container">
        <div class="order-form-inner-container">
          <el-form ref="orderInfo" status-icon :model="orderInfo">
            <el-form-item label="作品名称：">
              <el-input v-model="orderInfo.worksName" disabled></el-input>
            </el-form-item>
            <el-form-item label="作品价格：">
              <el-input v-model="orderInfo.price" disabled></el-input>
            </el-form-item>
            <el-form-item label="项目期望完成时长：">
              <el-input v-model="orderInfo.expectedTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="我的名称：">
              <el-input v-model="orderInfo.businessName" disabled></el-input>
            </el-form-item>
            <el-form-item label="我的手机号：">
              <el-input v-model="orderInfo.businessTel" disabled></el-input>
            </el-form-item>
            <el-form-item label="我的email：">
              <el-input v-model="orderInfo.businessEmail" disabled></el-input>
            </el-form-item>
            <el-form-item label="我的id：">
              <el-input v-model="orderInfo.businessId" disabled></el-input>
            </el-form-item>
            <el-form-item label="项目id">
              <el-input v-model="orderInfo.projectId" disabled></el-input>
            </el-form-item>
            <el-form-item label="作品id">
              <el-input v-model="orderInfo.worksId" disabled></el-input>
            </el-form-item>
          </el-form>
          <button class="confirm-button" @click="buyWorks(worksData.id)">确认购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 订单确认界面
 */
import { enterpriseSelectBid, buyWorks, pay } from "@/api/user";
import { getWorksById } from "@/api/works";

export default {
  data() {
    return {
      address: "http://120.79.239.141:8080/",
      orderInfo: "",
      worksData: {},
      payInfo: ""
    };
  },
  methods: {
    buyWorks() {
      buyWorks(this.orderInfo).then(res => {
        this.payInfo = res.data;
        const data = {
          out_trade_no: this.payInfo.id,
          product_code: "FAST_INSTANT_TRADE_PAY",
          total_amount: this.payInfo.price,
          subject: "移动艺术馆支付",
          body: this.payInfo.worksId
        };
        pay(data)
          .then(res => {
            console.log(res);
            const div = document.createElement("div");
            div.innerHTML = res;
            document.body.appendChild(div);
            document.forms.punchout_form.submit();
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  mounted() {
    const data = this.$route.params.data;
    // 获取确认订单的信息
    enterpriseSelectBid(data)
      .then(res => {
        this.orderInfo = res.data;
        // 获取顶部的作品
        getWorksById(data)
          .then(res => {
            this.worksData = res.data;
          })
          .catch(err => {
            console.log("查看作品详情失败！");
          });
      })
      .catch(() => {
        console.log("获取确认订单信息失败");
      });
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/index";

.container {
  // padding-top: $h-nav;
  .swiper-container {
    width: 80%;
    margin: 4rem auto;
  }
  .main-container {
    width: 80%;
    margin: 2rem auto;
    > div {
      margin: 0 auto;
      width: 80%;
    }
    .order-form-container {
      background-color: #fff;
      border: $border;
      border-radius: 4px;
      .order-form-inner-container {
        width: 80%;
        margin: 3rem auto;
        .confirm-button {
          @include margin-tb(2rem, 2rem);
        }
      }
    }
  }
}
</style>