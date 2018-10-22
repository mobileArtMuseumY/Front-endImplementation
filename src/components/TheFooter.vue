<template>
  <div class="footer">
    <div class="footer-session-container">
      <div class="footer-session logo">
        <svg-icon icon="logo" style="width: 2rem;height: 2rem;"></svg-icon>
        <div class="help">
          <svg-icon icon="help" style="width: .9rem;height: .9rem;"></svg-icon>
          <a href="">帮助&amp;支持</a>
        </div>
      </div>
      <div class="footer-session">
        <div class="title">校园移动艺术馆</div>
          <div class="a">
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
              <svg-icon icon="github-icon" ></svg-icon>
              <a href="https://github.com/mllove">mllove</a>
            </div>
            <div class="github">
              <svg-icon icon="github-icon" ></svg-icon>
              <a class="github-name" href="https://github.com/syt-honey">syt-honey</a>
            </div>
            <a href="">mlhaprial1028@gmail.com</a>
            <a href="">honeysyt@foxmail.com</a>
          </div>
      </div>
    </div>
      <div class="copyright">
        <div class="content-copy">@2018 **** all rights reserved .</div>
        <div class="content-made">Made by H&Y <img src="\static\images\footer\hearticon.png" alt="hearticon">.</div>
      </div>
  </div>
</template>

<script>
/**
 * 作用：页面的footer
 * 状态：一种                                   已完成
 * 样式要求：
 *   1. 始终在最底部                           未完成
 *   2. hover时颜色变为红色($clr-main)        已完成
 * 问题：
 *   1. 当nav的样式为scopedfooter才能正常显示，为什么？
 *   2. nav的样式为什么不是scoped的？
 */
export default {
	name: 'the-footer',
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.footer {
	position: relative;
  float: bottom;
  @include wh(100%, $h-footer);
	background-color: $clr-white;
}
.footer-session-container {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.footer-session {
  margin-top: 3rem;
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
	margin-top: 0.3rem;
}
.github {
	margin-bottom: 0.5rem;
}
a {
	display: inline-block;
	text-align: left;
	padding: 0;
	margin: 0;
	height: 2rem;
}
.title {
	font-size: 0.9rem;
}
.copyright {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: $clr-footer-font;
	font-size: 0.8rem;
}
.content-copy,
.content-made {
	color: $clr-footer-font;
	font-size: 0.8rem;
}
.help {
	margin-left: 0.3rem;
}
</style>
