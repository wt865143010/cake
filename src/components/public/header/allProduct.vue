<template>
    <div id="main">
      <div id="danGao" class="myTitle">
        <span  class="text1">所有蛋糕</span>
        <i class="myI">{{myNum[0]}}</i>
        <span class="text2">Products</span>
      </div>
      <div class="mySer">
        <h4 class="allList" @click="changeH(0)">
          <span>口味筛选</span>
          <span class="titleIcon"><img class="myIcon" src="static/image/arcoss-1.png" alt=""></span>
        </h4>
        <p class="p1" v-for="(value,n) in productArr" :key="n" @click="routerto(n)">{{value.name}}<span class="listNum" >{{value.myN}}</span></p>
      </div>
      <div class="mySer">
        <h4 class="allList" @click="changeH(1)">
          <span>场景筛选</span>
          <span class="titleIcon"><img class="myIcon" src="static/image/arcoss-1.png" alt=""></span>
        </h4>
        <p class="p1" v-for="(value,b) in changJin" :key="b " @click="routertoo(b)">{{value.name}}<span class="listNum">{{value.class_item_id}}</span></p>
      </div>
      <div id="xiaoShi" class="myTitle">
        <span  class="text1">所有小食</span>
        <i class="myI">{{myNum[1]}}</i>
        <span  class="text2">Snacks</span>
      </div>
      <div id="peiJian" class="myTitle">
        <span class="text1">所有配件</span>
        <i class="myI">{{pNum}}</i>
        <span class="text2">Parts</span>
      </div>
      <div id="search" class="myTitle">
        <form action="">
          <input type="text">
          <img src="static/image/btn.png" alt="" type="submit">
        </form>
      </div>
      <div id="myClose" @click="closeAll"><img src="static/image/close1.png" alt=""></div>
    </div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: "allProduct",
      data(){
        return{
          pNum:5,
          productArr:[],
          changJin:[],
          myNum:[],
          myshow:false
        }
      },
      methods: {
        changeH(obj) {
         let myH=$(".mySer")[obj].getElementsByTagName('p').length+1;
          for (let i=0;i<$(".mySer").length;i++){
            if (i==obj) {
              // console.log($(".mySer")[i]);
              if ($(".mySer")[i].style.height==0||$(".mySer")[i].style.height=='40px'){
                $(".mySer")[i].style.height=myH*31+'px';
                console.log($(".titleIcon")[i]);
                $(".titleIcon")[i].style.transform='rotate(180deg)'
              }else {
                $(".mySer")[i].style.height='40px';
                $(".titleIcon")[i].style.transform='rotate(360deg)'
              }
            }
            else {
              $(".mySer")[i].style.height='40px';
              $(".titleIcon")[i].style.transform='rotate(360deg)'
            }
          }
        },
        routerto(index){
            this.$router.push({
              path:'/enterscene',
              query:{
                cj_id:index+1,
                kw_id:0,
                type:1,
              }
            })
        },
        routertoo(index){
          this.$router.push({
            path:'/enterscene',
            query:{
              cj_id:0,
              kw_id:index+7,
              type:1
            }
          })
        },

        closeAll(){
          this.$emit('transferMyshow',this.myshow)
        }
      },
      created() {
        let  that=this;
        this.$axios.get("/api/allProduct.do").then(function (resp) {
          console.log(resp.data);
          return  that.productArr=resp.data
        });
        this.$axios.get("/api/allcj.do").then(function (resp) {
          console.log(resp.data);
          console.log(that.changJin);
           return that.changJin=resp.data;
        });
        this.$axios.get("/api/myNum.do").then(function (resp) {
          console.log(resp.data);
          return that.myNum=resp.data
        })
      }
    }
</script>

<style scoped>
#main{
  width: 428px;
  height: 670px;
  background-color: white;
  position: fixed;
  top: 0;
  text-align: left;
  padding: 40px;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 9999;
}
.text1{
  font-size: 20px;
  font-weight: bolder;
}
  .text2{
    float: right;
    color: silver;
    font-size: 14px;
    line-height: 26px;
  }
  .mySer{
    margin-left: 20px;
    height: 40px;
    overflow: hidden;
    transition: all .3s;
  }
  .mySer>p{
    margin-left: 20px;
  }
  .myIcon{
    width: 20px;
  }
  .allList{
    margin: 0;
    height: 40px;
    line-height: 40px;
  }
  .p1{
    height: 30px;
    line-height: 30px;
    margin-top: 0;
    margin-bottom: 0;
    color: silver;
    font-size: 14px;
  }
  .titleIcon{
    display: inline-block;
  }
  .listNum{
    float: right;
    color: #7e7c83;
  }
  #search{
    margin-top: 40px;
    position: relative;
  }
  #search>form>input{
    outline-style: none;
    border: none;
    border-bottom: 1px silver solid;
    width: 360px;
    height: 40px;
    font-size: 16px;
  }
  #search>form>img{
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .myI{

    background-color: yellow;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    margin-left: 10px;
  }
  #myClose{
    position: absolute;
    top: 60px;
    left: 500px;
    z-index: 99;
  }
</style>
