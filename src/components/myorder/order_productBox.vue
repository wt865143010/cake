<template>
 <div>
   <div class="product_info" v-for="(value,index) in order_product">
     <img :src="'/api/images/cake/'+value.imgsrc">
     <div class="produvt_name">
       <p>{{value.name}} </p>
       <p>{{value.english_name}}</p>
     </div>
     <span>{{value.product_num}} </span>
     <span>￥{{value.price}}</span>
     <router-link :to="{path:'order_info',query:{order_id:value.myorder_id}}"
                  tag="span" v-if="index==0">
       <p v-show="order_type==0">已取消</p>
       订单详情
     </router-link>
     <span v-if="index==0">
       <div v-if="order_type==1">
         <p @click="topay(value.myorder_id)">去支付</p>
         <p id="cancel" @click="cancel(value.myorder_id)">取消订单</p>
       </div>
       <p v-if="order_type==0" @click="dele(value.myorder_id)">删除</p>
       <p v-else-if="order_type==2">已付款</p>
      </span>

   </div>
 </div>
</template>

<script>
    export default {
        name: "order_productBox",
      props:['orderid','order_type'],
      data(){
          return {
            order_product:[],

          }
      },
      methods:{
        cancel(myorder_id){
          console.log("点击取消我的订单")
          console.log(myorder_id)
          this.$emit("cancel",[myorder_id])
        },
        dele(myorder_id){//删除已取消的订单
          console.log("删除订单")
          console.log(myorder_id)
          this.$axios.post("/api/dele_myorder.do",{myorder_id:myorder_id}).then(response=>{
            if(response.data=="删除成功"){
              this.$axios.get('/api/my_orderProduct.do?orderid='+this.$props.orderid)
                .then((response)=>{
                  this.order_product=response.data;

                })

            }
          })
          this.$emit('upOreder')
        },

        /*========================去付款=============================================*/
        topay(order_id){
          this.$axios.post('/api/topay.do',{order_id:order_id}).then(response=>{
            console.log(response.data)
            if(response.data=="订单付款成功"){
             this.$emit('topay');

            }




          })
        }
      },
      created() {
        this.$axios.get('/api/my_orderProduct.do?orderid='+this.$props.orderid)
          .then((response)=>{
          this.order_product=response.data;
          console.log("////////////////////////")
          console.log(this.order_product);
        })
      }
    }
</script>

<style scoped>
  img{
    width: 150px;
    float: left;
  }
  .product_info{
    background-color:white;
    width: 90%;
    margin-left: 50px;
    /* border-top: 1px solid black;*/
    padding: 20px;
    height: 160px;
    display: flex;
  }
  .produvt_name p:first-of-type{
    font-weight: bold;
  }
  .produvt_name{
    float: left;
    margin-top: 50px;
    margin-left: 50px;
    width: 15%;
    height: 50%;
   /* border: 1px solid red;*/
  }
  .produvt_name>p{
    margin-top: 10px;
  }
  span{
    float: left;
    margin-left: 120px;
    margin-top: 60px;
    display: inline-block;
   /* border: 1px solid red;*/
    width: 10%;
    height: 50%;



  }
  span:hover{
    cursor: pointer;
  }
  #cancel{
  }

</style>
