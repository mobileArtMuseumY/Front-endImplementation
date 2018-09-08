<template>
  <div class="footer">
    <div class="footer-session-container">
      <div class="footer-session logo">
        <icon class="icon" name="logo" scale="5"></icon>
        <div class="help">
          <icon class="icon" name="help" scale="2"></icon>
          <!-- 跳转到联系管理员页面 -->
          <a href="">帮助&amp;支持</a>
        </div>
      </div>
      <div class="footer-session">
        <div class="title">校园移动艺术馆</div>
          <div class="a">
            <!--
              1. 按照技能分类的项目页面
              2. 浏览项目页面
              3. 开发人员API页面
             -->
            <a href="">分类</a>
            <a href="">项目</a>
            <a href="">开发人员API</a>
          </div>
      </div>
      <div class="footer-session">
        <div class="title">关于</div>
          <div class="a">
            <a href="">关于我们</a>
            <a href="">平台是如何运作的</a>
            <a href="">联系我们</a>
          </div>
      </div>
      <div class="footer-session">
        <div class="title">条款</div>
         <div class="a">
           <!-- 待完成 -->
            <a href="">隐私条款</a>
            <a href="">隐私政策</a>
            <a href="">行为准则</a>
            <a href="">条款和条件</a>
            <a href="">费用及收费</a>
         </div>
      </div>
      <div class="footer-session">
        <div class="title">联系开发者</div>
          <div class="a">
            <div class="github">
              <icon class="icon" name="github" scale="2"></icon>
              <a href="https://github.com/mllove">mllove</a>
            </div>
            <div class="github">
              <icon class="icon github-icon" name="github" scale="2"></icon>
              <a class="github-name" href="https://github.com/syt-honey">syt-honey</a>
            </div>
            <a href="">mlhaprial1028@gmail.com</a>
            <a href="">honeysyt@foxmail.com</a>
          </div>
      </div>
    </div>
      <div class="copyright">
        <div class="content-copy">@2018 **** all rights reserved .</div>
        <div class="content-made">Made by H&Y <img src="\static\images\hearticon.png" alt="hearticon">.</div>
      </div>
  </div>
</template>

<script>
export default {

};
</script>

<style  lang="scss" scoped>
@import 'src/assets/scss/index';

.footer{
  position: relative;
  float: bottom;
  width: 100%;
  background-color: $clr-white;
  height: $h-footer;
  border: .06rem solid $clr-border;
}

.footer-session-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 3%;
}

.footer-session {
  display: flex;
  flex-direction: column;
}

.a {
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;
}

.logo {
  display: flex;
  flex-direction: column;
  padding-top: 4%;
}

.github-icon {
  margin-top: .3rem;
}

.github {
  margin-bottom: .5rem;
}

a {
  margin-top: .5rem;
  margin-bottom: .5rem;
}

.title {
  font-size: .9rem;
}

.copyright {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: $clr-footer-font;
  font-size: .8rem;
}

.content-copy,
.content-made {
  color: $clr-footer-font;
  font-size: .8rem;
}

</style>
