<template>
  <div>
<!--    <homeProduct @appAddcar="appAddcar"></homeProduct>-->
<!--    <lunbo></lunbo>-->
    <Swiper></Swiper>
    <newProduct></newProduct>
    <nowProduct @appAddcar="appAddcar"></nowProduct>
    <cuteProduct @appAddcar="appAddcar"></cuteProduct>

    <addmycar @closeCart="closeCart" ref="getSpecs"  v-show="cartShow"

              :productctitle="myProduct.name"
              :productetitle="myProduct.english_name"
              :productprice="myProduct.price"
              :productsrc="myProduct.imgsrc"
    :productId="myProduct.id"></addmycar>
  </div>
</template>

<script>
  // import lunbo from "./lunbo";
  import Swiper from './Swiper'
  import homeProduct from "../public/product/homeProduct";
  import Footer from "../public/footer/Footer";
  import addmycar from "../public/shopcar/addmycar";
  import newProduct from "./newProduct";
  import nowProduct from "./nowProduct";
  import cuteProduct from "./cuteProduct";
    export default {
        name: "home",
      data(){
          return {
            myProduct:[],
            cartShow:false
          }
      },
      created() {
        console.log(this.$route.query.num)
          if (this.$route.query.num==1){
            alert('请登录！');
          }
      },
      components:{
        homeProduct:homeProduct,
        Footer:Footer,
        addmycar:addmycar,
        newProduct:newProduct,
        nowProduct:nowProduct,
        cuteProduct:cuteProduct,
        Swiper:Swiper
      } ,
      methods:{
        appAddcar(productId){
          // console.log(productId)
          this.$axios.get('/api/getProductNews.do?productId='+productId)
          .then(resp=>{
            this.myProduct=resp.data[0];
            // console.log(this.myProduct)
          })
          // console.log(this.myProduct)
          this.cartShow=true
          this.$refs.getSpecs.getspecs(productId)
        },
        closeCart(){
          console.log(1111)
          this.cartShow=false;
        }
      }
    }
</script>

<style scoped>

</style>
