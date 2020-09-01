<template>
<div>
  <h2>我的订单</h2>
  <ul id="order">
    <li>全部订单</li>
    <li>待收货</li>
    <li>待付款</li>
    <li>待审核</li>
    <li>已取消</li>
    <li>已完成</li>
    <li>已退货</li>
  </ul>
  <ul class="order_info">
    <li>订单信息</li>
    <li>数量</li>
    <li>金额</li>
    <li>订单状态</li>
    <li>操作</li>
  </ul>
  <order_product @cancel="move" v-show="show" ref="orderP"></order_product>
  <cancel v-show="isshow" @confirm="confirm" @think="think" :order_type="order_type"></cancel>
  <bg1 v-show="isshow"></bg1>

</div>
</template>

<script>
  import order_product from "./order_product";
  import cancel from "./cancel";
  import bg1 from "../public/bg/bg1";
    export default {
        name: "MY_order",
      data(){
          return {
           order_num:[],
            isshow:false,
            show:true,
            order_type:"",
          }
      },

      components:{
        order_product,
        cancel,
        bg1,
      },
      methods:{
        move(num){
          console.log(num)
          this.order_type=num[0][0]
          console.log(this.order_type)
          this.isshow=true;
        },
        confirm(){
          this.isshow=false
          this.$refs.orderP.reGet()
        },
        think(){
          this.isshow=false
        }
      }
    }
</script>

<style scoped>
  h2{
    margin-left: 50px;
    margin-top: 50px;
  }
#order{
  list-style: none;
  display: inline-block;
  margin-top: 40px;
}
  #order>li{
    float: left;
    margin-left: 50px;
  }
  #order>li:hover{
    font-weight: bold;
    cursor: pointer;
  }
  #order>li:first-of-type{
    font-weight: bold;
  }
  .order_info{
    list-style: none;
    width: 92.5%;
    height: 50px;
    margin-left: 50px;
    background-color: rgba(255, 255, 255, 0.76);
    margin-top: 40px;
  }
  .order_info>li{
    float: left;
    margin-left: 150px;
    line-height: 50px;
    text-align: center;
  }
  img{
    width: 150px;
    float: left;
  }
  .product_info{
    background-color:white;
    width: 90%;
    margin-left: 50px;
    border-top: 1px solid black;
    padding: 20px;
    height: 160px;
  }
  .produvt_name{
    float: left;
    margin-top: 50px;
    margin-left: 50px;
  }
  .produvt_name>p{
    margin-top: 10px;
  }
  span{
    float: left;
    margin-left: 200px;
    margin-top: 80px;
  }
  .product{
    border: 1px solid red;
    height: 160px;
    width: 100%;
  }
  span:hover{
    cursor: pointer;
  }

</style>
