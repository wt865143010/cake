<template>
  <div>

    <nav>

      <div class="div">
        <span>场景:</span>
        <ul  class="ul1"><!--@click="dianji2($event)"-->
          <li class="myyellow" @click="alldianji1(0,$event)">全部</li>
          <li v-for="item in cjinfo" v-if="item.class_item_id<7" @click="alldianji1(item.class_item_id,$event)">{{item.name}}</li><!-- @click="alldianji1(item.class_item_id)"-->
        </ul>
      </div>

      <div  class="div">
        <span>口味:</span>
        <ul class="ul2">

          <li class="myyellow" @click="alldianji2(0,$event)">全部</li>
          <li @click="alldianji2(item.class_item_id,$event)" v-for="item in cjinfo" v-if="item.class_item_id>=7&&item.class_item_id<=15">{{item.name}}</li>
        </ul>
      </div>
    </nav>
    <div class="content">
      <div v-if="otherProduct.length==0" class="isno">
        查询不到相关产品
      </div>
      <otherProduct @appAddcar="appAddcar" :otherProduct="otherProduct"></otherProduct>
    </div>
    <addmycar v-show="exist" @closeCart="closeCart" ref="getSpecs"
              :productctitle="myProduct.name"
              :productetitle="myProduct.english_name"
              :productprice="myProduct.price"
              :productsrc="myProduct.imgsrc"
              :productId="myProduct.id"
    ></addmycar>
    <bg1 v-show="isexist"></bg1>
  </div>
</template>

<script>
  import addmycar from "../public/shopcar/addmycar";
  import bg1 from "../public/bg/bg1";
  import otherProduct from "../public/product/otherProduct";
  export default {
    name: "scene_flavor",
    data(){
      return{
        myProduct:[],//产品数组
        specs:[],//产品规格数组
        cjinfo:[],  //场景信息
        otherProduct:[],
        cj_id:'0',
        kw_id:'0',
        exist:false,
        isexist:false,
      }
    },
    components:{
      otherProduct:otherProduct,
      bg1,
      addmycar,

    },
    beforeCreate(){

    },
    created() {
      this.cj_id=this.$route.query.cj_id;
      this.kw_id=this.$route.query.kw_id;
      console.log([this.cj_id,this.kw_id]);
     this.$axios.get("/api/product.do?cj_id="+this.cj_id+"&&kw_id="+this.kw_id+"&&type="+1)
        .then(resp=>{
          this.otherProduct=resp.data;
        });
      this.$axios.get("/api/scene.do").then(resp=>{
        this.cjinfo=resp.data;
        console.log(this.cjinfo)
      })

    },

    methods: {

      alldianji1(cj_id,e){
        this.cj_id=cj_id
        console.log(this.cj_id)

        /*this.$axios.get("http://localhost:2666/product.do?cj_id="+this.cj_id+"&&kw_id="+this.kw_id)
          .then(resp=>{
            this.otherProduct=resp.data;
          })*/
        $(e.target).siblings().attr('class','')
        $(e.target).attr("class","myyellow")

        this.dianji()
      },
      alldianji2(kw_id,e){
        this.kw_id=kw_id
        console.log(this.kw_id)
        $(e.target).siblings().attr('class','')
        $(e.target).attr("class","myyellow")

        /* this.$axios.get("http://localhost:2666/product.do?cj_id="+this.cj_id+"&&kw_id="+this.kw_id)
           .then(resp=>{
             this.otherProduct=resp.data;
           })*/
        this.dianji()
      },
      dianji(){
        console.log(1111111111)
        this.$axios.get("/api/product.do?cj_id="+this.cj_id+"&&kw_id="+this.kw_id+"&&type="+1)
          .then(resp=>{
            console.log(resp.data)
            console.log(resp.data!='')
            if(resp.data!=''){
              this.otherProduct=resp.data;
            }else {
              this.otherProduct=[]
            }

          })
      },
     /* alldianji(e){
        $(e.target).siblings().attr('class','')
        $(e.target).attr("class","myyellow")
        let a=$('.ul1 li[class="myyellow"]').html();
        let b = $('.ul2 li[class="myyellow"]').html();
      },*/
     /* dianji1(e){
        this.alldianji(e);
      },
      dianji2(e){

        this.alldianji(e);
      },*/
     /* selec(num){
        this.mynum=num
      },*/
      appAddcar(productId) {

        this.isexist=true
        this.exist=true;
        this.$axios.post("/api/buy_product.do", {index: productId})//点击购物车获取产品信息
          .then(resp => {
            this.myProduct = resp.data;
            this.myProduct=this.myProduct[0]
          })
        // this.$axios.post("http://localhost:2666/product_specs.do", {index: productId})//点击购物车获取产品规格
        //   .then(resp => {
        //     this.myProuct_specs=resp.data;
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
  li{
    float: left;
    margin-left: 20px;
    text-align: center;
    line-height: 30px;
    /*width: 60px;*/
    /*height:30px;*/
  }
  li:hover{
    cursor: pointer;
  }
  .div{
    display: flex;
    /*border: 1px solid black;*/
  }
  /*.div span:nth-of-type(1){*/
  /*  line-height: 31px;*/
  /*}*/
  span{
    display: inline-block;
    /*margin-left: 40px;''*/
    width: 40px;
    line-height: 63px;
    padding-left: 160px;
    /*flex: 2;*/
    /*float: left;*/
  }
  ul{
    width: 50%;
    /*height: 40px;*/
    list-style: none;

    /*flex: 1;*/
  }
  nav{
    width: 90%;
    margin: 50px auto;
    height: 130px;
    background-color: white;
    /*border: 1px solid red;*/
  }
  .myyellow{
    background-color:yellow;
  }
  .content{
    width: 100%;
    height: 100%;
  }
  .isno{
    font-weight: bold;
    font-size: 35px;
    text-align: center;
  }






</style>
