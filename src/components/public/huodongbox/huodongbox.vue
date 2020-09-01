<template>
    <div id="main">
      <div class="mydiv" v-for="value in mymsg">
        <div class="myleft">
          <h2>{{value.name}}</h2>
          <p class="p-1">{{value.title}}</p>
          <p class="p-2"><router-link to="/hbpage" tag="button">点击进入</router-link></p>
        </div>
        <div class="myright">
          <img :src="value.src" alt="">
        </div>
      </div>
      <div></div>
    </div>
</template>

<script>
    export default {
        name: "huodongbox",
      props: {
        mymsg: {
          type: Array,
        }
      },
      data(){
          return{
          }
      },

    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #main{}
  .mydiv>div{
    /*display: inline-block;*/
    border: none;
  }

  .myleft{
    width: 500px;
    height: 320px;
    text-align: center;
  }
  h2{
    margin-top: 50px;
    margin-bottom: 10px;
    font-size: 28px;
  }
  .p-1{
    margin-bottom: 60px;
  }
  .p-2>button{
    height: 42px;
    width: 160px;
    background-color: #ffc43e;
    outline-style: none;
    border: none;
    border-radius: 21px;
    cursor: pointer;
  }
.mydiv{
  width: 1250px;
  height: 320px;
  margin: 0 auto;
  background-color: white;
  margin-bottom: 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
