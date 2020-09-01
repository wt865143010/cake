<template>
  <div id="myhead">

    <div id="main">
      <div id="headerLeft">
        <router-link to="/shouye" id="logo"><img src="static/image/logo.png" alt=""></router-link>

        <router-link to="" class="myLi margin1">
          <span class="iconfont icon-diliweizhi"></span>
          <p>上海市</p>
        </router-link>
        <div class="myLi margin2" id="producto">
          <div class="myS" @click="productOpen">
            <div class="line"></div>
            <span class="iconfont icon-caidan" ></span>
            <p>所有产品</p>
          </div>
        </div>
        <router-link to="/home" class="myLi margin2" id="myNone" >
          <div class="line"></div>
          <span class="iconfont icon-shouye" @click="closeAllBox"></span>
          <p @click="closeAllBox">首页</p>
        </router-link>
        <router-link :to="{path:'/enterscene',query:{cj_id:0,kw_id:0}}" class="myLi" >
          <div class="line"></div>
          <span class="iconfont icon-dangao" @click="closeAllBox"></span>
          <p @click="closeAllBox">蛋糕</p>
        </router-link>
        <router-link to="/snake" class="myLi">
          <div class="line"></div>
          <span class="iconfont icon-jinkoubinggangaodian
" @click="closeAllBox"></span>
          <p @click="closeAllBox">小食</p>
        </router-link>
        <router-link to="/newhuodong" class="myLi">
          <div class="line"></div>
          <span class="iconfont icon-new" @click="closeAllBox"></span>
          <p @click="closeAllBox">最新活动</p>
        </router-link>
        <router-link to="/yinhang" class="myLi">
          <div class="line"></div>
          <span class="iconfont icon-qian" @click="closeAllBox"></span>
          <p @click="closeAllBox">银行活动</p>
        </router-link>
        <router-link to="/vip" class="myLi">
          <div class="line"></div>
          <span class="iconfont icon-huiyuan-" @click="closeAllBox"></span>
          <p @click="closeAllBox">会员中心</p>
        </router-link>
      </div>
      <div id="headerRight">
        <div class="myLi margin2"  id="logino" @click="openMyown">
          <span class="iconfont icon-gerenzhongxin" ></span>
          <p >{{msg}}</p>
        </div>
<!--        <router-link to="" class="myLi margin2" >-->
<!--          <span class="iconfont icon-gerenzhongxin" @click="openMyown"></span>-->
<!--          <p @click="openMyown">登录/注册</p>-->
<!--        </router-link>-->
        <div  class="myLi margin2" id="mycarss">
          <span class="iconfont icon-icon-" @click="openMycart"></span>
          <p @click="openMycart">购物车</p>
        </div>
        <div  class="myLi myLi1 margin3" id="mymoress">
          <div  class="myS" @click="moreOpen">
            <span class="iconfont icon-gengduoneirong"></span>
            <p>更多</p>
          </div>
        </div>
      </div>
    </div>
    <div class="myH"></div>
    <!--    所有产品-->
    <allProduct v-show="myshow" @transferMyshow="getMyshow" class="animate zoomInLeft" ></allProduct>
<!--    更多-->
    <mymore v-show="moreshow" @transferMore="getMore"></mymore>

    <!--我的-->
    <MY v-show="isShow" @closeAllBox="closeAllBox" ref="myuser"></MY>

    <!--登陆-->
    <myLogin v-show="myLoginShow" @closeAllBox="closeAllBox"></myLogin>

    <!--购物车弹框-->
    <goodsCart v-show="goodsCartSohw" ref="goodsCart"></goodsCart>


    <div class="pagebody">
<!--      <router-view></router-view>-->
    </div>
  </div>

</template>
<script>
  // import animate from 'animate.css'
  import $ from 'jquery'
  import allProduct from './allProduct'
  import mymore from'./myMore'
  import MY from './MY'
  import myLogin from "./myLogin";
  import goodsCart from "./goodsCart";
    export default {
        name: "mynav",

      data(){
          return{
            myshow:false,
            moreshow:false,
            isShow:false,
            myLoginShow:false,
            goodsCartSohw:false,
            msg:''
          }
      },
      created() {
        this.$axios.get('/api/getU.do')
          .then(resp=>{
            if (resp.data==''||resp.data==undefined){
              this.msg='注册/登录'
            }else {
              this.msg='我的'
            }
          })
      },
      updated() {
          this.$axios.get('/api/getU.do')
        .then(resp=>{
          if (resp.data==''||resp.data==undefined){
            this.msg='注册/登录'
          }else {
            this.msg='我的'
          }
        })
      },
      methods:{
        productOpen(){
        console.log(1);
          this.myshow=true;
          this.moreshow=false
          this.isShow=false
          this.myLoginShow=false
          this.goodsCartSohw=false
          this.$emit('productOpenBg')
        },
        moreOpen(){
          this.moreshow=true
          this.myshow=false
          this.isShow=false
          this.myLoginShow=false
          this.goodsCartSohw=false
          this.$emit('moreOpenBg')
        },
        getMyshow(msg){
         this.myshow=msg
          this.moreshow=false
          this.isShow=false
          this.myLoginShow=false
          this.goodsCartSohw=false
          this.$emit('closeBg')
        },
        getMore(msg){
          this.moreshow=msg;
          this.moreshow=false
          this.isShow=false
          this.myLoginShow=false
          this.goodsCartSohw=false
          this.$emit('closeBg')
        },
        openMyown(){
          this.$axios.get('/api/checkUser.do')
          .then(resp=>{
            console.log(resp.data)
            if (resp.data!=2){
              console.log('已登录')
              this.isShow=true;
              this.myshow=false;
              this.moreshow=false;
              this.myLoginShow=false;
              this.goodsCartSohw=false;
              this.$emit('openBg')
              let username=resp.data;
              this.$refs.myuser.getUser(username)
              // this.closeAllBox()
            }else {
              console.log('未登录')
              this.isShow=false;
              this.myshow=false;
              this.moreshow=false;
              this.myLoginShow=true;
              this.goodsCartSohw=false;
              this.$emit('openBg')
            }
          })


        },
        closeAllBox(){
            this.myshow=false;
            this.moreshow=false;
            this.isShow=false;
            this.myLoginShow=false;
            this.goodsCartSohw=false;
          this.$emit('closeBg')
        },
        openMycart(){
          this.$axios.get('/api/checkUser.do')
            .then(resp=>{
              console.log(resp.data)
              if (resp.data!=2){
                console.log('已登录')
                this.isShow=false;
                this.myshow=false;
                this.moreshow=false;
                this.myLoginShow=false;
                this.goodsCartSohw=true;
                this.$emit('openBg')
                this.$emit('openMycart')
                this.$refs.goodsCart.getproduct()
              }else {
                console.log('未登录')
                this.isShow=false;
                this.myshow=false;
                this.moreshow=false;
                this.myLoginShow=true;
                this.goodsCartSohw=false;
                this.$emit('openBg')
              }
            })
          //    this.goodsCartSohw=true;
          // this.myshow=false;
          // this.moreshow=false;
          // this.isShow=false;
          // this.myLoginShow=false;
          //    this.$emit('openMycart')
          //      this.$refs.goodsCart.getproduct()
        },

      },
      components:{
          allProduct:allProduct,
          mymore:mymore,
        MY:MY,
        myLogin:myLogin,
        goodsCart:goodsCart,
      },
      // updated() {
      //   this.myshow=this.$props.bgShow,
      //     this.moreshow=this.$props.bgShow,
      //     this.isShow=this.$props.bgShow
      // }
    }
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .pagebody{
    /*margin-top: 120px;*/
    /*position: relative;*/
    /*top: 120px;*/

  }
  .myH{
    height: 120px;
  }
  a{
    text-decoration: none;
    color: silver;
  }
  #main{
    width: 100%;
    height: 120px;
    border-bottom: 1px silver solid;
    font-size: 12px;
    text-align: center;
    background-color: white;
    /*color: #C1C0C0;*/
    position: fixed;
    z-index: 99;
  }
  p{
    margin-top: 10px;
  }
  #headerLeft{
    float: left;
  }
  #headerRight{
    float: right;
  }
  #logo{
    height: 120px;
    width: 260px;
    border-right: 1px silver solid;
  }
  #logo>img{
    margin-top: 10px;
  }
  .myLi{
    width: 90px;
    height: 120px;
    position: relative;
  }
  #main>div>a{
    float: left;
    cursor: pointer;
  }
  #producto{
    float: left;
    color: silver;
    cursor: pointer;
  }
  #logino{
    float: left;
    color: silver;
    cursor: pointer;
  }
  #mycarss{
    float: left;
    color: silver;
    cursor: pointer;
  }
  #mymoress {
    float: left;
    color: silver;
    cursor: pointer;
  }
  #headerLeft>.myLi{
    border-right: 1px silver solid;
  }
  #headerRight>.myLi{
    border-left: 1px silver solid;
  }
  .myLi>span{
    display: block;
    font-size: 24px;
    font-weight: bolder;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .myLi>.myS>span{
    display: block;
    font-size: 24px;
    font-weight: bolder;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .myLi1{
    width: 128px;
  }
  .line{
    width: 90px;
    height: 1px;
    border-top: 3px solid #f5f500;
    display: none;
    position: absolute;
    top: 0;
  }
  #headerLeft>.myLi:hover .line{
    display: block;
  }
  #headerLeft>.myLi:hover span{
    color: #463535;
  }
  #headerLeft>.myLi:hover p{
    color: #463535;
  }
  @media screen and (max-width: 1300px){

    #myNone{
      display: none;
    }
  }
  @media screen and (max-width: 1209px){
    #main{
      width: 1209px;
    }
  }
</style>
