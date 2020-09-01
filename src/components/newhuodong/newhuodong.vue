<template>
    <div >
      <huodong v-bind:mymsg="msg"></huodong>
    </div>
</template>

<script>
  import huodong from '../public/huodongbox/huodongbox'
    export default {
        name: "newhuodong",
      components:{
          huodong:huodong,
      },
      data(){
          return {
            msg: [{name: '2020年7月会员日', title: '会员积分超值兑换', src: "/api/images/new/1.jpg"},
              {name: '参与“夏日活动”享受立减优惠', title: '夏日活动', src: "/api/images/new/2.jpg"},
              {name: '2020年新人活动', title: '2020年新用户特享折扣', src: "/api/images/new/3.jpg"}]
          }
      }
    }
</script>

<style scoped>

</style>
