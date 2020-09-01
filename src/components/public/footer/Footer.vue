<template>
  <footer>
    <div id="footer">
      <div class="footerTop">
        <div class="footerTopL">
          <img src="static/image/logo1.png" alt="">
          <p>订购热线：4006-678-678（8:00 - 20:00)</p>
          <p>客服邮箱：cs@mcake.com</p>
          <p>地址：上海市普陀区同普路1130弄3号楼</p>
          <p>食品生产许可证：SC12431010700121</p>
        </div>

        <div class="footerTopC">
          <ul>
            <li>
              <h3>关于我们</h3>
            </li>
            <li><a href="https://mall.mcake.com/page/about">企业介绍</a></li>
            <li><a href="https://mall.mcake.com/page/media">媒体合作</a></li>
            <li><a href="#">招贤纳士</a></li>
            <li><a href="#">呼叫中心</a></li>
          </ul>
          <ul>
            <li>
              <h3>帮助中心</h3>
            </li>
            <li><a href="#">投诉与建议</a></li>
            <li><a href="#">会员权益</a></li>
            <li><a href="#">购物指南</a></li>
            <li><a href="#">支付类</a></li>
            <li><a href="#">订单相关</a></li>
            <li><a href="#">配送服务</a></li>
          </ul>
          <ul>
            <li>
              <h3>发现</h3>
            </li>
            <li><a href="#">公告</a></li>
          </ul>
        </div>

        <div class="footerTopR">
          <ul>
            <li>
              <img class="weibo" src="static/image/weibo.png" alt="">
              <div class="Hover">
                <img src="static/image/wechat.png" alt="" title="关注公众号" class="weChat">
                <img class="erw" src="static/image/erw.jpg" alt="">
              </div>
            </li>
          </ul>

        </div>

      </div>
      <div class="footerBottom">
        <div class="footerBottomL">
          <p>上海卡法电子商务有限公司</p>
          <p>地址：上海市普陀区同普路1130弄3号楼</p>
          <p>洽谈电话：021-52691591</p>
          <p>社会信用代码：913101070678091460</p>
          <p>食品经营许可证：JY13101070034251</p>
        </div>
        <div class="footerBottomC">
          <p>上海卡法电子商务有限公司北京分公司</p>
          <p>地址：北京市朝阳区东四环中路82号3座16层1908</p>
          <p>洽谈电话：010-52088262</p>
          <p>社会信用代码：911101053484280752</p>
          <p>食品经营许可证：JY11105212634724</p>
        </div>
        <div class="footerBottomR">
          <p>上海卡法电子商务有限公司杭州分公司</p>
          <p>地址：杭州市拱墅区中环大厦607室</p>
          <p>洽谈电话：0571-28103688</p>
          <p>社会信用代码：913301060920344424</p>
          <p>食品经营许可证：JY13301050141226</p>
        </div>
      </div>
      <div class="myCopyright">
        Copyright © 2012-2020 上海卡法电子商务有限公司 版权所有 沪ICP备12022075号
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>
<style scoped>
  footer {
    text-align: left;
    background-color: black;
  }

  #footer {
    width: 1250px;
    height: 550px;
    position: relative;
    margin: 0 auto;
    line-height: 24px;
    background-color: black;
    /*outline: 1px solid red;*/
  }

  #footer > .footerTop {
    width: 80%;
    height: 200px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
  }

  #footer > .footerBottom {
    width: 80%;
    height: 150px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
  }

  .footerTop li, .footerTop p {
    color: #CCCCCC;
    font-size: 12px;
    list-style: none;
  }

  .footerTop h3 {
    color: white;
    font-size: 15px;
  }

  .footerTop ul li:nth-child(1) {
    margin-bottom: 20px;
  }

  .footerTop ul li {
    margin-bottom: 10px;
  }

  .footerTopC {
    width: 30%;
    display: flex;
    margin-left: 100px;
    justify-content: space-between;
  }

  .footerTopR {
    width: 14%;
    height: 60px;
    overflow: hidden;
    margin-left: 120px;
    cursor: pointer;
  }

  .footerTopR > img {
    float: left;
  }

  .footerTopR span {
    display: inline-block;
    font-size: 30px;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: white;
    line-height: 40px;
    text-align: left;
  }

  .footerBottom p {
    color: #CCCCCC;
    font-size: 12px;
  }

  .footerBottomC {
    width: 30%;
    margin-left: 130px;
  }

  .footerBottomR {
    width: 22%;
  }

  .myCopyright {
    width: 100%;
    text-align: center;
    color: #CCCCCC;
  }

  a {
    color: #CCCCCC;
    text-decoration: none;
  }

  li {
    height: 13px;
  }

  .Hover {
    width: 40%;
    height: 320%;
    margin-left: 55px;
  }

  .weChat {
    float: left;
  }

  .weibo {
    float: left;
  }

  .erw {
    width: 10%;
    float: top;
    visibility: hidden;
    position: absolute;
    left: 1000px;
    top: 20%;
  }

  .Hover:hover .erw {
    visibility: visible;
  }

</style>
