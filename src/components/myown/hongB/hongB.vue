<template>

  <div id="coupon">
    <div>
      <!-- 我的红包 -->
      <h2 class="my-h2">我的红包</h2>
      <div class="card1-box">
        <div class="card1-left">
          <p>
            <span class="my-span3 now-card my-hb1" @click="changeColor2()">0</span><br>
            <i>可用</i>
          </p>
          <p>
            <span class="my-span3  my-hb2" @click="changeColor3()">0</span><br>
            <i>不可用</i>
          </p>
        </div>
        <div class="card1-right">
          <div class="noData">暂无数据</div>
          <div class="clear"></div>
          <div class="pageSize" id="page"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hongB",
    methods: {
      changeColor2: function () {
        // console.log("进入函数");
        let obj1=$(".my-span3")[0];
        let obj2=$(".my-span3")[1];
        if(obj1.style.color==""&&obj2.style.color==""){
          obj1.style.color="yellow";
          obj2.style.color="";
        }else if(obj1.style.color==""&&obj2.style.color=="yellow"){
          obj1.style.color="yellow";
          obj2.style.color="";
        }
        // console.log("颜色1="+ obj1.style.color);
        // console.log("颜色2="+ obj2.style.color);
      },
      changeColor3: function () {
        // console.log("进入函数");
        let obj1=$(".my-span3")[0];
        let obj2=$(".my-span3")[1];

        if(obj1.style.color=="yellow"&&obj2.style.color==""){
          obj1.style.color="";
          obj2.style.color="yellow";
        }
        else if(obj1.style.color==""&&obj2.style.color==""){
          obj1.style.color="";
          obj2.style.color="yellow";
        }
        // console.log("颜色11="+ obj1.style.color);
        // console.log("颜色22="+ obj2.style.color);
      },
    },


  }

</script>

<style scoped>
  #coupon {
    background: #f8f8f8;
  }

  #coupon > div {
    width: 1400px;
    margin: 0 auto;
  }

  .my-h2 {
    width: 1400px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 26px;
    background: #eee;
    color: #b5b5b5;
  }

  .card1-box {
    width: 1400px;
    height: 446px;
    background: #fff;
  }

  .card1-left {
    float: left;
    width: 298px;
    height: 400px;
    padding-top: 46px;
    background: #323236;
  }

  .card1-left p {
    text-align: center;
    margin-bottom: 28px;
    cursor: pointer;
  }

  .card1-right {
    float: right;
    width: 1050px;
    height: 390px;
    padding-top: 56px;
    position: relative;
    margin-right: 14px;
  }

  .noData {
    margin-bottom: 120px;
    text-indent: 326px;
  }

  .pageSize {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 38px;
    font-size: 14px;
    color: #a4a4a4;
  }

  .enter input {
    width: 338px;
    height: 40px;
    background: #fff;
    border: none;
    outline: none;
    font-size: 14px;
    text-indent: 18px;
    color: #000;
    border-bottom: 1px solid #b2b2b2;
    margin-right: 24px;
  }

  .card1-left p{
    text-align: center;
    margin-bottom: 28px;
    cursor: pointer;
  }
  .card1-left span{
    font-size: 36px;
    text-align: center;
    color: #19191b;
  }
  .card1-left i{
    font-size: 14px;
    text-align: center;
    color: #7d7d7e;
  }
  /*.card1-left .now-card{*/
  /*  color: #f1d628;*/
  /*}*/






</style>
