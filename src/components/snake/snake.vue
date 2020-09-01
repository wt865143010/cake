<template>
    <div id="snake">
      <otherProduct @appAddcar="appAddcar" :otherProduct="otherProduct"></otherProduct>
      <addmycar v-show="exist" @closeCart="closeCart" ref="getSpecs"
                :productctitle="myProduct.name"
                :productetitle="myProduct.english_name"
                :productprice="myProduct.price"
                :productsrc="myProduct.imgsrc"
                :productId="myProduct.id"
      ></addmycar>
    </div>
</template>

<script>
  import '../../../static/font/iconfont.css'
  import '../../../static/font/iconfont'
  import otherProduct from "../public/product/otherProduct";
  // import scene_flavor from "./scene_flavor";
  import addmycar from "../public/shopcar/addmycar";
  import bg1 from "../public/bg/bg1";
  export default {
    name: "snake",
    data(){
      return {
        myProduct:[],//产品数组
        specs:[],//产品规格数组
        exist:false,
        isexist:false,
        otherProduct:[]
        // otherProduct:[]
      }

    },
       created() {
         this.$axios.get("/api/product.do?type="+2+"&&cj_id="+0+"&&kw_id="+0)
         .then(resp=>{
           this.otherProduct=resp.data;
         })
     },

    components:{
      otherProduct,
      addmycar,
      bg1
    },
    methods: {
      appAddcar(productId) {
        /*console.log("我被点击了")*/
        this.isexist=true
        this.exist=true;
        /* console.log( this.exist)
         console.log(this)
         console.log(productId)*/
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
      closeCart(){
        this.exist=false
        this.isexist=false
        console.log(this.exist)
      }
    },

  }
</script>

<style scoped>

  #snake{
    margin-top: 50px;
    width: 100%;
  }

</style>
