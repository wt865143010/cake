<template>
  <div>
    <div class="title">
      <img src="static/image/title.png" alt="">
      <br>
      <div>
        <strong>新品推荐</strong>
        <br>
        <p class="eTitle">New Recommend</p>
      </div>
      <div>
        <p class="myTitle">New</p>
      </div>
    </div>
    <div class="myImgRouter">
      <router-link to="">
        <img src="static/image/finn.jpg" alt="">
      </router-link>
      <router-link to="">
        <img src="static/image/fleur.jpg" alt="">
      </router-link>
      <router-link to="">
        <img src="static/image/bulu.jpg" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "newProduct"
    }
</script>

<style scoped>
  .title{
    display: flex;
    width: 1400px;
    margin:0 auto;
  }
  .title>div:nth-of-type(2){
    flex: 1;
  }
  .myImgRouter{
    display: flex;
    width: 1280px;
    margin:0 auto;
  }
  .title strong{
    font-size: 26px;
  }
  .eTitle{
    color: #c3c3c3;
    font-size: 14px;
  }
  .myTitle{
    color: #c3c3c3;
    font-size: 20px;
  }
  .title>img{
    height: 85px;
  }
  .title div:nth-of-type(1){
    /*position: absolute;*/
    /*top: 180px;*/
    padding-top: 75px;
  }
  .myImgRouter{
    margin-top: 50px;
  }
</style>
