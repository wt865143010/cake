<template>
  <div>
    <div class="title">
      <img src="static/image/title.png" alt="">
      <br>
      <div>
        <strong>本季推荐</strong>
        <br>
        <p class="eTitle">Seasonal Recommend</p>
      </div>
      <div>
        <p class="myTitle">Seasonal</p>
      </div>

    </div>
    <div class="myImgRouter">
      <router-link to="">
        <img src="static/image/choco.jpg" alt="">
      </router-link>
    </div>
     <div class="nowproduct">
       <homeProduct @appAddcar="appAddcar" :num1="0" :num2="6"></homeProduct>
     </div>

  </div>
</template>

<script>
  import homeProduct from "../public/product/homeProduct";
    export default {
        name: "nowProduct" ,
      components:{
        homeProduct
      },
      data(){
        return {
          myProduct:[],
          cartShow:false
        }
      },
      methods:{
        appAddcar(productId){
          // // console.log(productId)
          // this.$axios.get('/api/getProductNews.do?productId='+productId+'&&limit=6')
          //   .then(resp=>{
          //     this.myProduct=resp.data[0];
          //     // console.log(this.myProduct)
          //   })
          // // console.log(this.myProduct)
          // this.cartShow=true
          this.$emit('appAddcar',[productId])
          // this.$refs.getSpecs.getspecs(productId)
        },
        closeCart(){
          this.cartShow=false;
        }
      }
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
   text-align: left;
    margin-top: 80px;
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
  .nowproduct{
    margin-top: 70px;
  }
</style>
