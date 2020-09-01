<template>
  <div id="cake">
    <scene_flavor></scene_flavor>
  </div>

</template>

<script>
  import '../../../static/font/iconfont.css'
  import '../../../static/font/iconfont'
  import scene_flavor from "./scene_flavor";
  export default {
    name: "cake",
    data(){
      return {
      }

    },
    components:{
      scene_flavor,
    },
   /* methods:{
      Addcar(productId) {
        console.log("我被点击了")
        this.isexist=true
        this.exist=true;
        /!* console.log( this.exist)
         console.log(this)
         console.log(productId)*!/
        this.$axios.post("/api/buy_product.do", {index: productId})//点击购物车获取产品信息
          .then(resp => {
            this.myProduct = resp.data;
            this.myProduct=this.myProduct[0]
            console.log(this.myProduct)
          })
        console.log(this.myProduct)
        // this.$axios.post("http://localhost:2666/product_specs.do", {index: productId})//点击购物车获取产品规格
        //   .then(resp => {
        //    this.specs=resp.data;
        //   })
        // this.productid=productId;
        this.$refs.getSpecs.getspecs(productId)

      },

    },
*/
  }
</script>

<style scoped>

  #cake{
    border: 1px solid black;
    width: 100%;
    /*margin:  auto;*/
    /*text-align: center;*/
  }

</style>
