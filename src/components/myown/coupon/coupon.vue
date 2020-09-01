<template>

  <div id="coupon">
    <div>
      <!-- 我的优惠券 -->
      <h2 class="my-h2">我的优惠券</h2>
      <div class="card1-box">
        <div class="card1-left">
          <p>
            <span class="my-span2 now-card my-yhq1" @click="changeColor()">{{y_num}}</span><br>
            <i>可用</i>
          </p>
          <p>
            <span class="my-span2  my-yhq2" @click="changeColor1()">0</span><br>
            <i>不可用</i>
          </p>
        </div>
        <div class="card1-right">
<!--          <div class="noData">暂无数据</div>-->
<!--          <div class="clear"></div>-->
<!--          <div class="pageSize" id="page"></div>-->
          <div class="myC">
            <div class="mycard" v-for="a in myquan">
              <div class="c_left"><h2>{{a.y_value}}</h2></div>
              <div class="c-right"><p class="p-1">{{a.y_name}}</p><p class="p-3">COUPONS</p><p class="p-2">全场可用</p></div>
              <div class="c-bottom"><router-link to="/shouye" tag="button">立即使用</router-link></div>
            </div>
          </div>


<!--          <div class="mypage">-->
<!--            <p>-->
<!--              <span>1</span>-->
<!--              <span>2</span>-->
<!--              <span>下一页</span>-->
<!--            </p>-->
<!--          </div>-->
          <div class="enter">
            <input type="text" v-model="couponCode" placeholder="请输入优惠券编码">
            <button @click="enter">添加并绑定</button>
            <p class="cuowu">{{mytext}}</p>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="tips">优惠券编码不能为空</div>-->

  </div>
</template>

<script>
  export default {
    name: "coupon",
    data(){
      return{
        y_num:'',
        couponCode:'',
        mytext:'',
        myquan:[],
        quan:[],
        mypage:[]
      }
    },
    methods: {
      enter: function () {
        let that=this;
        console.log(this.couponCode);
          this.$axios.get("/api/checkyouhui.do",{params:{code:this.couponCode}}).then(function (resp) {
              console.log(resp.data);

            if (resp.data.length>0){
              let mycode=resp.data[0].y_use;
              let name=resp.data[0].y_name;
              let value=resp.data[0].y_value;
              let least=resp.data[0].y_least;
              that.$axios.get("/api/saveyouhui.do",{params:{mycode,name,value,least}}).then(function (resp) {
                console.log(resp.data);
                that.y_num=resp.data.length;
                that.mytext="添加优惠券成功";
                $(".cuowu").css({"color":"green"});
                that.getNum();
              });
              // that.$axios.get("/api/delyouhui.do",{params:{mycode}}).then(function (resp) {
              //   console.log(resp.data)
              // })
            }else {
              that.mytext="优惠券码输入有误请重新输入"
            }
          })
      },

      changeColor: function () {
        // console.log("进入函数");
        let obj1 = $(".my-span2")[0];
        let obj2 = $(".my-span2")[1];
        if (obj1.style.color == "" && obj2.style.color == "") {
          obj1.style.color = "yellow";
          obj2.style.color = "";
        } else if (obj1.style.color == "" && obj2.style.color == "yellow") {
          obj1.style.color = "yellow";
          obj2.style.color = "";
        }
        // console.log("颜色1="+ obj1.style.color);
        // console.log("颜色2="+ obj2.style.color);
      },
      changeColor1: function () {
        // console.log("进入函数");
        let obj1 = $(".my-span2")[0];
        let obj2 = $(".my-span2")[1];

        if (obj1.style.color == "yellow" && obj2.style.color == "") {
          obj1.style.color = "";
          obj2.style.color = "yellow";
        } else if (obj1.style.color == "" && obj2.style.color == "") {
          obj1.style.color = "";
          obj2.style.color = "yellow";
        }
        // console.log("颜色11="+ obj1.style.color);
        // console.log("颜色22="+ obj2.style.color);
      },

      getNum(){
        let that=this;
        this.$axios.get("/api/getyouhui.do").then(function (resp) {
          console.log("==============================");
          console.log(resp.data);
          that.y_num=resp.data.length;
          that.myquan=resp.data;
        })
      }
    },
    created() {
        this.getNum()
    }
  }

</script>

<style scoped>
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0);
  }

  /*定义滚动条的轨道，内阴影及圆角*/
  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(230, 230, 230, 0.05);
  }

  *:hover::-webkit-scrollbar-track {
    background-color: rgba(230, 230, 230, 0.5);
  }

  /*定义滑块，内阴影及圆角*/

  *::-webkit-scrollbar-thumb {
    height: 20px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: rgba(216, 216, 216, 0.4);
    transition: background-color 1s;
  }

  *:hover::-webkit-scrollbar-thumb {
    background-color: rgba(216, 216, 216, 1);
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(190, 190, 190, 1);
  }

  *::-webkit-scrollbar-thumb:active {
    background-color: rgba(160, 160, 160, 1);
  }
  .myC{
    overflow-y: scroll;
    height: 120px;
  }
  .mypage>p>span{
    display: inline-block;
    border: 1px silver solid;
    height: 32px;
    padding: 0 10px;
    line-height: 32px;
  }
  .mypage{
    text-align: center;
  }
  .cuowu{
    color: red;font-size: 14px;
  }
  .c-bottom{
    text-align: center;
    height: 50px;
    margin-top: 10px;
    margin-left: 20px;
  }
  .c-bottom>button{
    width: 120px;
    height: 30px;
    outline-style: none;
    border: none;
    background-color: #ffcf36;
    border-radius: 15px;
    cursor: pointer;
  }
  .c-right{
    color: white;
    height: 118px;
    display: inline-block;
  }
  .p-1{
    font-size: 20px;
    margin: 0;
    margin-top: 10px;
  }
  .p-3{
    margin: 0;
    font-size: 15px;
  }
  .mycard{
    background-image:url("../../../../static/image/youhui.png");
    width: 478px;
    height: 118px;
    margin-bottom: 60px;
    display: inline-block;
    margin-right: 15px;
  }
  .c_left{
    width: 180px;
    font-size: 56px;
    height: 118px;
    display: inline-block;
  }
  .c_left>h2{
    display: block;
    margin: 0;
    padding: 0;
    color: white;
    font-weight: normal;
    margin-left: 20px;
  }
  #coupon {
    background: #f8f8f8;
    position: relative;
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

  .card1-left span {
    font-size: 36px;
    text-align: center;
    color: #19191b;
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
  .enter{
    margin-top: 160px;
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

  .enter button {
    width: 154px;
    height: 44px;
    border: none;
    cursor: pointer;
    background-color: #f9d510;
    border-radius: 44px;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    outline: 0;
  }

  .card1-left i {
    font-size: 14px;
    text-align: center;
    color: #7d7d7e;
  }

  /*.card1-left .now-card {*/
  /*  color: #f1d628;*/
  /*}*/


</style>

