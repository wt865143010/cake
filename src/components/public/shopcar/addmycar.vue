<template>
    <div class="cart-box">
      <div class="box-1">
        <img :src="'/api/images/cake/'+productsrc" alt="" class="cart-box-img">
        <div class="closeCart1" @click="closeCart">×</div>
        <div class="box-1-news">
          <div class="ctitle">{{productctitle}}</div>
          <div class="etitle">{{productetitle}}</div>
          <div class="price">￥{{productprice}}</div>
        </div>
      </div>
      <div class="box-2">
        <div>
          <span>规格选择</span>
          <select name="" id="guigechecked">
            <option value="" v-for="item in specs">{{item.specs_value}}</option>
<!--            <option value="2">3磅（908g）-4-7人食</option>-->
<!--            <option value="3">4磅（908g）-4-7人食</option>-->
          </select>
        </div>
        <div>
          <span>数量选择</span>
          <div class="changenum">
            <button @click="jian">-</button>
            <span>{{num}}</span>
            <button @click="jia">+</button>
          </div>
        </div>
      </div>
      <div class="box-3">
        <div class="closecart" @click="closeCart">取消</div>
        <div class="addcart" @click="addToCart(productsrc,productctitle,productetitle,productprice,num,productId)">确认</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "addmycar",
      data(){
          return {
            num:1,
            specs:[]
          }
      },
      updated() {
        // this.$axios.get('/api/getSpecs.do?priductid='+this.$props.productid)
        //   .then(resp=>{
        //     this.specs=resp.data
        //   })
      },

      created() {
        //   this.$axios.get('/api/getSpecs.do?priductid='+this.$props.productid)
        // .then(resp=>{
        //   this.specs=resp.data
        // })
      },
      props:['productctitle','productetitle','productprice','productsrc','productId'],
      methods:{
          jian(){
            if (this.num>1){
              this.num--;
            }
          },
        jia(){
          this.num++;
        } ,
        closeCart(){
          this.$emit('closeCart')
          // console.log(122222)
          // document.getElementsByClassName("cart-box")[0].style.display="none";
          this.num=1
        },
        addToCart(productsrc,productctitle,productetitle,productprice,num,productId){
          console.log(productsrc)
          console.log(productctitle)
          console.log(productetitle)
          console.log(productprice)
          console.log(num);
          console.log(productId)
          let guige=$("#guigechecked").find('option:selected').text();
          console.log($("#guigechecked").find('option:selected').text());
          // this.$axios.post('/api/addtocart.do',parms)
          // this.$axios.get('/api/addtocart.do',num)
          this.$axios.get('/api/addtocart.do?productsrc='+productsrc+'&&productctitle='+productctitle+'&&productetitle='+productetitle
          +'&&productprice='+productprice+'&&num='+num+'&&guige='+guige+'&&productid='+productId)
          .then(resp=>{
            console.log(resp.data)
          })
          this.closeCart();
        },
        getspecs(productId){
          console.log(productId)
          this.$axios.get('/api/getSpecs.do?priductid='+productId)
            .then(resp=>{
              this.specs=resp.data
            })
        }
      }
    }
</script>

<style scoped>
  .cart-box{
    width: 400px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
    z-index: 11;
    background-color: white;
    padding-top: 12px;
    /*text-align: left;*/
    /*display: none;*/
  }
  .cart-box-img{
    width: 100px;
    height: 100px;
    /*position: absolute;*/
    /*left: 20px;*/
  }
  .box-1{
    /*position: absolute;*/
    /*left: 20px;*/
    padding-left: 20px;
    width: 400px;
    display: flex;
    /*z-index: 12;*/
  }
  .closeCart1{
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 30px;
  }
  .closeCart1:hover{
    cursor: pointer;
  }
  .box-1-news{
    text-align: left;
    margin-left: 10px;
  }
  .box-1-news div{
    margin-bottom: 8px;
  }
  .ctitle{
      font-size: 16px;
  }
  .etitle{
    font-size: 16px;
        color: #a2a2a2;
  }
  .price{
    font-size: 16px;
  }
  .box-2{
    display: flex;
    flex-wrap: wrap;
  }
  .box-2 select{
    border: none;
    font-size: 16px;
    color: #a2a2a2;
    margin-left: 100px;
  }
  .changenum button{
    width: 25px;
    height: 25px;
    border-radius: 25px;
    border: none;
    font-size: 20px;
    text-align: center;
    line-height: 25px;
    color: #a2a2a2;
  }
  .changenum{
    margin-left: 190px;
  }
  .box-2 div:nth-child(1){
    margin-top: 10px;
    width: 400px;
    height: 50px;
    border-top: 1px solid darkgray;
    padding-left: 20px;
    text-align: left;
    line-height: 50px;
    color: #a2a2a2;
  }
  .box-2>div:nth-child(2){
    margin-top: 10px;
    width: 400px;
    height: 50px;
    border-top: 1px solid darkgray;
    padding-left: 20px;
    text-align: left;
    line-height: 50px;
    display: flex;
    color: #a2a2a2;
  }
  .box-3{
    width: 400px;
    height: 50px;
    display: flex;
    margin-top: 29px;
  }
  .closecart{
    width: 200px;
    height: 50px;
    background-color: #a2a2a2;
    line-height: 50px;
    text-align: center;
  }
  .addcart{
    width: 200px;
    height: 50px;
    background-color: gold;
    line-height: 50px;
    text-align: center;
  }
</style>
