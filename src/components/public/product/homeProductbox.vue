<template>
  <div class="homeProductBox">
          <router-link :to="{path:'/xiangQing',query:{id:productid}}" tag="div">          <!-- 跳转到详情页面-->
      <img :src="'/api/images/cake/'+src" class="homeProductImg">
      <div class="cTitle">{{productCtitle}}</div>
      <div class="eTitle">{{productEtitle}}</div>
          </router-link>
      <div class="homePrice">￥{{productPrice}}</div>
      <img src="static/image/addcar.png" class="homeAddShopCar" @click="addcar">
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "productbox",
      props:['src','productCtitle','productEtitle','productPrice','productid'],
      methods:{
          addcar(){
            this.$emit('appAddcar')
          }
      }

    }
</script>

<style scoped>
  .homeProductBox{
    /*border: 1px solid gold;*/
    width: 450px;
    height: 510px;
    background-color: #F5F5F5;
    /*padding-top: 30px;*/
    /*padding-left: 30px;*/
    position: relative;
    margin-bottom: 50px;
    margin-left: 30px;
  }
  .homeProductImg{
    position: absolute;
    left: 30px;
    top: 30px;
  }
  .cTitle{
    position: absolute;
    left: 30px;
    top: 30px;
    font-size: 15px;
  }
  .eTitle{
    position: absolute;
    left: 30px;
    top: 55px;
    font-weight: normal;
    font-size: 12px;
    color: #7a7a7a;
  }
  .homePrice{
    position: absolute;
    left: 30px;
    top: 460px;
    font-weight: 500;
    font-size: 18px;
  }
  .homeAddShopCar{
    position: absolute;
    right: 30px;
    top: 460px;
  }
</style>
