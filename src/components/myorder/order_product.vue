<template>
  <div>
    <div v-for="item in order">
      <ul class="order_info" >
        <li>订单编号: {{item.id}}</li>
        <li>订单时间：{{item.delivery_day}}</li>
        <li>配送时间：{{item.dlivery_time}}</li>
        <li>支付方式：微信支付</li>
      </ul>
    <order_productBox :orderid="item.id" @cancel="cancel" :order_type="item.order_type" @upOreder="upOreder" @topay="topay"></order_productBox>
    </div>
  </div>

</template>

<script>
  import order_productBox from "./order_productBox";
    export default {
        name: "order_product",
      data(){
        return {
          order:[],
          order_product:[],
          speces:[]
        }
      },
      props:['iscancel','istoPay'],
      components:{
        order_productBox
      },
      created() {
       this.$axios.get("/api/my_order.do").then((response)=>{
         this.order=response.data
       })
      },
      methods:{
        cancel(num){
            this.$emit("cancel",[num])
        },
        reGet(){
          this.$axios.get("/api/my_order.do").then((response)=>{
            this.order=response.data
          })
        },
        upOreder(){
          this.$axios.get("/api/my_order.do").then((response)=>{
            this.order=response.data
          })
        },

        /*=====================去付款===========================================*/
        topay(){
          this.$axios.get("/api/my_order.do").then((response)=>{
            this.order=response.data
          })
        }
      },
    }
</script>

<style scoped>
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
</style>
