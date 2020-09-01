<template>
  <div class="box">
    <h1>请登录后再访问</h1>
    <button class="enter" @click="enterLogin">确认</button>
    <button class="close">取消</button>
  </div>
</template>

<script>
    export default {
        name: "enterLog",
      methods:{
        enterLogin(){
          this.$router.push({path: '/home',query:{num:1}})
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 500px;
    height: 300px;
    margin: 0 auto;
    text-align: center;
    background-color: white;
  }
  .enter{
    border: none;
    background-color: gold;
    width: 100px;
    height: 30px;
    margin-top: 100px;
  }
  .close{
    border: none;
    background-color: #333333;
    width: 100px;
    height: 30px;
    margin-top: 100px;
  }
</style>
