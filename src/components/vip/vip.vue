<template>
    <div>
      <div class="top">
        <img src="/api/images/vip/user.gif" alt="" class="user">
        <div>
          <span>当前余额（元）￥<strong class="font50">{{mymoney}}</strong></span>
          <span class="recharge" @click="openSave">充值</span>
        </div>
        <div>
          <img src="/api/images/vip/email.png" alt="">
          <span>我的消息</span>
        </div>
      </div>
      <div class="bottom">
        <div>
          <img src="/api/images/vip/quxian.png" alt="">
         <div class="username">
           <strong>{{username}}</strong> <br>                     <!--{{username[0]}}-->
           <router-link to="" tag="span">
             <img src="/api/images/vip/relogin.png" alt="" class="qiehuan"> <span>切换账号</span>
           </router-link>
         </div>
          <div class="v1">V1</div>
          <div class="upclass">还差消费500元升级至V2</div>
          <div class="integral">当前积分<strong>0</strong></div>
        </div>
        <div class="vipdetail">
          <div class="left">
            <ul>
              <li>
                <div>V1</div>
              </li>
              <li>V2</li>
              <li>V3</li>
              <li>V4</li>
              <li>V5</li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li>
                <span class="floatL">免费领取会员卡</span>
                <span class="floatR">累计消费0元</span>
              </li>
              <li>
                <span class="floatL">参加抢红包活动</span>
                <span class="floatR">累计消费500元</span>
              </li>
              <li>
                <span class="floatL">尊享永久订购9.8折优惠</span>
                <span class="floatR">累计消费2000元</span>
              </li>
              <li>
                <span class="floatL">尊享永久订购9.5折优惠</span>
                <span class="floatR">累计消费10000元</span>
              </li>
              <li>
                <span class="floatL">进入蛋糕五折购买区</span>
                <span class="floatR">累计消费0元</span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <!--充值弹出框-->
      <div class="saveMoney" v-show="saveShow">
        <input type="text" placeholder="卡号" v-model="cartid"> <br>
        <input type="password" placeholder="密码" v-model="cartpwd">
        <div class="ruler">
          <p>规则说明</p>
          <ul>
            <li>使用余额可购买MCAKE官网全品类产品;</li>
            <li>请关注MCAKE官方微信（Mcake1893）订购。</li>
            <li>若发生退货，余额支付部分将退回;</li>
            <li>上海、杭州、北京地区需提前5小时订购，苏州地区需提前8小时订购;</li>
            <li>使用余额支付时不再开具发票; </li>
            <li>MCAKE对余额充值规则具有最终解释权。 </li>
          </ul>
        </div>
        <button @click="savemoney">充值</button>
      </div>
      <bg1 v-show="bgShow" @closeAll="closeAll"></bg1>
    </div>
</template>

<script>
  import bg1 from "../public/bg/bg1";
    export default {
        name: "vip",
      data(){
          return {
            username:[],
            cartid:'',
            cartpwd:'',
            saveShow:false,
            bgShow:false,
            mymoney:[]
          }
      },
      components:{
        bg1:bg1
      },
      created() {
          this.$axios.get('/api/getU.do')
        .then(resp=>{
          this.username=resp.data;
        })
        this.$axios.get('/api/getM.do')
          .then(resp=>{
            // console.log(resp.data);
            this.mymoney=resp.data[0].money;
          })
      },
      methods:{
        openSave(){
          this.saveShow=true;
          this.bgShow=true;
        },
        savemoney(){
          console.log(this.cartid)
          console.log(this.cartpwd)
          let that=this
          this.$axios.post('/api/savemoney.do',{id:this.cartid,pwd:this.cartpwd})
          .then(resp=>{
            that.saveShow=false;
            that.bgShow=false;
            that.$axios.get('/api/getM.do')
            .then(resp=>{
              // console.log(resp.data);
              that.mymoney=resp.data[0].money;
            })
          })
        },
        closeAll(){
          console.log(111)
          this.saveShow=false;
          this.bgShow=false;
        }
      }
      // relogin(){
      //     this.$axios.get('/api/mylogout.do')
      //   .then(resp=>{
      //     this.$router.push({path:'/home'})
      //   })
      // }
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .bottom ul li{
    list-style: none;
    padding: 0;
  }
  .top{
    display: flex;
    width: 1400px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    padding-top: 50px;
  }
  .bottom{
    position: relative;
    width: 1400px;
    margin: 0 auto;
  }
  .user{
    width: 100px;
    margin-left: 100px;
  }
  .top>div:nth-of-type(1){
    margin-left: 80px;
    position: absolute;
    bottom: 20px;
    left: 180px;
  }
  .font50{
    font-size: 50px;
  }
  .recharge{
    position: absolute;
    background-image: url("/api/images/vip/yBG.png");
    width: 151px;
    height: 44px;
    line-height: 44px;
    left: 300px;
    text-align: center;
  }
  .top>div:nth-of-type(2){
    width: 100px;
    height: 100px;
    position: absolute;
    right: 0;
  }
  .username{
    position: absolute;
    left: 100px;
    top: 30px;
  }
  .v1{
    position: absolute;
    top: 10px;
    right: 30px;
    font-size: 200px;
    color: gold;
  }
  .upclass{
    position: absolute;
    width: 460px;
    height: 33px;
    background-image: url("/api/images/vip/cha.png");
    top: 550px;
    left: 0;
    line-height: 33px;
    color: white;
  }
  .integral{
    position: absolute;
    top: 530px;
    right: 50px;
  }
  .integral>strong{
    font-size: 50px;
  }
  .vipdetail{
    display: flex;
    margin-top: -4px;
  }
  .bottom li{
    height: 100px;
    line-height: 100px;
  }
  .left{
    width: 300px;
    background-color: #323236;
  }
  .left li{
    color: white;
    text-align: center;
  }
  .right{
    width: 1100px;
  }
  .left li:nth-of-type(1){
    color: gold;
    height: 90px;
    padding-top: 10px;
    /*position: absolute;*/
    /*z-index: 2;*/
    /*left: 150px;*/
  }
  .left li:nth-of-type(1) div{
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: #46464E;
    margin: 0 auto;
    line-height: 80px;
    /*margin-top: 10px;*/
  }
  .right li:nth-of-type(1){
    background-color: #E7E7E7;
  }
  .floatL{
    margin-left: 50px;
    float: left;
  }
  .floatR{
    float: right;
    margin-right: 50px;
  }
  .saveMoney{
    position: absolute;
    top: 150px;
    left: 35%;
    width: 488px;
    height: 480px;
    background-color: white;
    text-align: center;
    z-index: 15;
  }
  .saveMoney input{
    margin-top: 10px;
    width: 400px;
    height: 50px;
    border: none;
    border-bottom: 1px solid #5d5d5d;
    color: #a2a2a2;
  }
  .saveMoney input:nth-of-type(1){

  }
  .saveMoney li{
    margin-left: 20px;
    color: #a2a2a2;
  }
  .ruler{
    width: 400px;
    text-align: left;
    margin-left: 50px;
    margin-top: 50px;
    color: #a2a2a2;
  }
  .saveMoney button{
    margin-top: 50px;
    width: 150px;
    height: 50px;
    background-color: #ffe32a;
    border: none;
    border-radius: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
  }
</style>
