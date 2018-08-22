<template>
  <div class="footer">
    <div class="container">
      <div class="site-info">
        <ul class="site-info-ul">
          <h3 class="siu-h">占位置</h3>
          <ul>
            <li class="siuh-l"><a class="siuh-a" >关于</a></li>
            <li class="siuh-l"><a class="siuh-a">向导</a></li>
            <li class="siuh-l"><a class="siuh-a" >联系我们</a></li>
            <li class="siuh-l"><a class="siuh-a">帮助</a></li>
          </ul>
        </ul>
        <ul class="site-info-ul">
          <h3 class="siu-h">****移动艺术馆</h3>
          <ul>
            <li class="siuh-l"><a class="siuh-a" >关于</a></li>
            <li class="siuh-l"><a class="siuh-a">向导</a></li>
            <li class="siuh-l"><a class="siuh-a" >联系我们</a></li>
            <li class="siuh-l"><a class="siuh-a">帮助</a></li>
          </ul>
        </ul>
        <ul class="site-info-ul">
          <h3 class="siu-h">关于网站</h3>
          <ul>
            <li class="siuh-l"><a class="siuh-a" >API</a></li>
            <li class="siuh-l"><a class="siuh-a">网站logo</a></li>
          </ul>
        </ul>
        <ul class="site-info-ul">
          <h3 class="siu-h">联系开发者</h3>
          <ul>
            <li class="siuh-l"><a class="siuh-a" >mllove</a></li>
            <li class="siuh-l"><a class="siuh-a">syt-honey</a></li>
            <li class="siuh-l"><a class="siuh-a" >mlhaprial1028@gmail.com</a></li>
            <li class="siuh-l"><a class="siuh-a">honeysyt@foxmail.com</a></li>
          </ul>
        </ul>
      </div>
      <div class="copyright">
        <h4 class="content-copy">@2018 **** all rights reserved .</h4>
        <h4 class="content-made">Made by H&Y <img src="\static\images\hearticon.png" alt="hearticon">.</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style  lang="scss" scoped>
@import 'src/assets/scss/index';

li{
  list-style-type:none;
}

a {
  &:hover {
    border-bottom: .06rem solid $clr-border;
  }
}

.footer{
  background-color: $clr-white;
  height: $h-footer;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.container {
  width: 100%;
}

.site-info {
  height: $h-footer-siteinfo;
  padding: 0 2px 0 30px;
  position: relative;
}

.site-info-ul {
  width: 15rem;
  line-height: 1.1rem;
  float: left;
  padding: 0 20px 0 20px;
}

.siu-h {
  color: $clr-footer-font;
  font-size: .9rem;
  padding: 0 0 14px 43px;
}

.siuh-l {
  color: $clr-footer-font;
  font-size: .8rem;
  padding:  0 6px 4px 6px;
}

.siuh-a {
  color: $clr-footer-font;
}

.copyright {
  height: $h-footer-copyright;
  color: $clr-footer-font;
  font-size: .8rem;
  display: flex;
  float: left;
  margin: 0 20px;
}

.content-copy {
  margin-right: .8rem;
  color: $clr-footer-font;
  font-size: .8rem;
  line-height: 1rem;
  width: 1120px;
}

.content-made {
  color: $clr-footer-font;
  font-size: .8rem;
  line-height: 1rem;
}

</style>
