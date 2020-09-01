<template>
  <div class="otherProductBox">
        <router-link :to="{path:'/xiangQing',query:{id:productid}}" tag="div">           <!--跳转到详情页面-->
    <img :src="'/api/images/cake/'+src" class="otherProductImg">
    <div class="cTitle">{{productCtitle}}
      <slot name="aa"></slot>
    </div>
    <div class="eTitle">{{productEtitle}}</div>
        </router-link>
    <div class="homePrice">￥{{productPrice}}</div>
    <img src="static/image/addcar.png" class="otherAddShopCar" @click="addcar">
  </div>
</template>

<script>
    export default {
        name: "otherProductBox",
      props:['src','productCtitle','productEtitle','productPrice','productid'],
      methods:{
        addcar(){
          console.log("我被点击了 是在otherProductbox")
          this.$emit('appAddcar')
        }
      }

    }
</script>

<style scoped>
  .otherProductBox{
    /*border: 1px solid gold;*/
    width: 350px;
    height: 450px;
    /*background-color: #F8F8F8;*/ background-color: #f8f8f8;

    /*padding-top: 30px;*/
    /*padding-left: 30px;*/
    position: relative;
    margin-bottom: 30px;
    margin-left: 20px;
  }
  .otherProductImg{
    width: 350px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .cTitle{
    position: absolute;
    /*left: 30px;*/
    top: 360px;
    font-size: 15px;
  }
  .eTitle{
    position: absolute;
    /*left: 30px;*/
    top: 385px;
    font-weight: normal;
    font-size: 12px;
    color: #7a7a7a;
  }
  .homePrice{
    position: absolute;
    /*left: 30px;*/
    top: 410px;
    font-weight: 500;
    font-size: 18px;
  }
  .otherAddShopCar{
    position: absolute;
    right: 25px;
    top: 410px;
  }
</style>
