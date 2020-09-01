<template>
    <div>
      <huodong v-bind:mymsg="msg" ></huodong>
    </div>
</template>

<script>
  import huodong from '../public/huodongbox/huodongbox'
    export default {
        name: "yinhang",
      components:{
          huodong:huodong
      },
      data(){
          return{
            msg:[{name:'盛京银行',title:'货到刷卡8.5折',src:"/api/images/yinhang/1.jpg"},
              {name:'招商银行（借记卡/信用卡）',title:'在线支付8.5折',src:"/api/images/yinhang/2.jpg"},
              {name:'农业银行',title:'在线支付8.5折',src:"/api/images/yinhang/3.jpg"},
              {name:'浦发货到8.5折',title:'货到刷浦发银行8.5折',src:"/api/images/yinhang/4.jpg"},
              {name:'平安银行',title:'货到刷卡8.5折',src:"/api/images/yinhang/5.jpg"},
              {name:'广发银行',title:'"发现精彩app"抢券低至5折',src:"/api/images/yinhang/6.jpg"},
              {name:'兴业银行',title:'货到刷卡8.5折',src:"/api/images/yinhang/7.jpg"},
              {name:'建行银行（信用卡）',title:'在线支付/货到刷卡8.5折',src:"/api/images/yinhang/8.jpg"},
              {name:'中信银行（信用卡）',title:'“动卡空间APP”抢券低至5折',src:"/api/images/yinhang/9.jpg"}],
          }
      }
    }
</script>

<style scoped>

</style>
