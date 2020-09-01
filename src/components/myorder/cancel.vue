<template>
    <div>
      <div class="reason">
        <p>取消理由</p>
        <div class="condition">修改生日牌</div>
        <div class="condition">修改配送时间</div>
        <div class="condition">修改配送地址</div>
        <div class="condition">修改支付方式</div>
        <div class="condition">修改订单产品</div>
        <div class="condition">无法使用代金卡/优惠券</div>
        <div class="condition">选择其他产品品牌</div>
        <div class="condition nobuy">不想买了</div>
        <p class="condition">其他</p>
        <input type="text"placeholder="请输入取消理由">
        <div class="condition" @click="confirm">确认取消</div>
        <div class="condition nobuy"@click="Think">再想想</div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "cancel",
      data(){
          return{

          }
      },
      props:['order_type'],
      methods:{
        Think(){
          this.$emit("think")
        },
        confirm(){
          this.$emit("confirm")
          let order_type=this.$props.order_type
          // console.log("===============")
          // console.log(order_type)
         this.$axios.post("/api/order_type.do",{order_type:order_type})
          .then(resp=>{   //修订单状态为 0
            this.$emit("confirm")
          })
        }
      }
    }
</script>

<style scoped>
.reason{
  position: fixed;
  width:400px;
  height:550px;
  top:0px;
  left:0px;
  bottom:0px;
  right:0px;
  margin:  auto;
  border: 1px solid #6e6e6e;
  background-color: #f8f8f8;
  z-index: 50;
}
  .condition{
    float: left;
    width: 170px;
    margin-left: 20px;
    margin-top: 20px;
    height: 40px;
    border: 1px solid #d4d4d4;
    border-radius: 40px;
    text-align: center;
    line-height: 40px;
    color: #6e6e6e;
  }
.nobuy{
  background-color: yellow;
}

  p:first-of-type{
    text-align: center;
    border-bottom: 1px solid #6e6e6e;
    height: 40px;
    line-height: 40px;
    color: #6e6e6e;
  }
  P:last-of-type{
    width: 170px;
    margin-top: 20px;
    margin-left: 100px;
    height: 40px;
    border: 1px solid #6e6e6e;
    border-radius: 40px;
    text-align: center;
    line-height: 40px;
    color: #6e6e6e;
  }
input{
  width: 350px;
  height: 50px;
  outline: none;
  border: 0;
  border-bottom: 1px solid #6e6e6e;
  margin-left: 20px;
}

</style>
