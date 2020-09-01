<template>
    <div id="payBox">
      <div id="payTitle">
        <p>选择支付方式</p>
        <p>在线支付 <span :class="dowmorup" @click="isshowpayway"></span></p>
      </div>
      <div id="payChoose" v-show="showpaychoose">
        <div class="chooseTitle">
          <div :class="class1" @click="showallpay($event)"></div>
          <img src="static/payimg/pay1.png" alt="">
          <div>
            <p>微信支付</p>
            <p>支付宝、微信、银行卡</p>
          </div>
        </div>
        <div class="allChoose" v-show="showpayway">
          <div class="allchooseTitle"  v-for="(item,index) in payways"  @click="chooseme(index)">
            <div class="el-icon-success" :style="{color:(aIndex == index ? '#ffe32a' : '#000')}"></div>
            <img :src="'static/payimg/'+item.wayimg" alt="">
            <div>
              <p>{{item.title1}} <span>{{item.zhekou}}</span></p>
              <p>{{item.title2}}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "payWay",
      data(){
          return {
            payways:[
              {wayimg:'WEIXIN.png',title1:'微信支付',title2:'微信安全支付',zhekou:''},
              {wayimg:'ALIPAY.png',title1:'支付宝',title2:'支付宝安全支付',zhekou:''},
              {wayimg:'UNION.png',title1:'银联在线',title2:'银联在线支付',zhekou:''},
              {wayimg:'CCB.png',title1:'建设银行',title2:'建设银行卡支付',zhekou:'8.5折'},
              {wayimg:'CMB.png',title1:'招商银行',title2:'招商银行卡支付',zhekou:'8.5折'},
              {wayimg:'DAYSPASS.png',title1:'得仕卡',title2:'得仕卡支付',zhekou:''},
              {wayimg:'ABC.png',title1:'农业银行',title2:'农业银行卡支付',zhekou:'8.5'},
              {wayimg:'ABC.png',title1:'农业银行',title2:'仅限信用卡支付',zhekou:''},
              {wayimg:'SPDB.png',title1:'浦发银行',title2:'仅限浦发银行卡支付',zhekou:''},
              {wayimg:'SPDB.png',title1:'浦发快捷',title2:'浦发银行快捷支付',zhekou:''},
            ],
            class1:'el-icon-success',
            showpayway:false,
            showpaychoose:true,
            aIndex:0,
            dowmorup:'el-icon-arrow-up'
          }
      },
      methods:{
        showallpay(e){
          e.target.style.color = '#ffe32a';
          this.showpayway = true
        },
        chooseme(index){
          if (this.aIndex === index) {
            this.aIndex = -1;  //在这里就将它赋值为-1  由于：-1 !=  index 所以其他内容隐藏 ，被点击的则打开
          } else {
            this.aIndex = index;    //这里是把index赋值给isShow，isShow=index则显示
          }
        },
        isshowpayway(){
          if (this.dowmorup == 'el-icon-arrow-up'){
            this.dowmorup = 'el-icon-arrow-down';
            this.showpaychoose = false
          }else{
            this.dowmorup = 'el-icon-arrow-up';
            this.showpaychoose = true
          }
        }
      }
    }
</script>

<style scoped>
  #payBox{
    margin-bottom: 50px;
  }
#payTitle{
  display: flex;
  justify-content: space-between;
  width: 1400px;
  margin: 0 auto;
  padding: 52px 0;
  cursor: pointer;
}
#payTitle p:nth-child(1){
  font-size: 18px;
  font-weight: 700;
}
#payTitle p:nth-child(2){
  font-size: 16px;
  color: #838383;
  display: flex;
  align-items: center;
}
#payTitle p:nth-child(2) span{
  display: inline-block;
  width: 25px;
  height: 25px;
  background-color: #ffe32a;
  border-radius: 50%;
  color: #fff;
  line-height: 24px;
  text-align: center;
  margin-left: 10px;
  margin-right: 40px;
  font-size: 18px;
  font-weight: 800;
}
#payChoose{
  background-color: #fff;
}
#payChoose,
.allChoose{
  width: 1400px;
  margin: 0 auto;
  cursor: pointer;

}
  .chooseTitle{
    display: flex;
    align-items: center;
    padding: 60px 35px;
    box-sizing: border-box;
    cursor: pointer;
  }
.allchooseTitle{
  display: flex;
  align-items: center;

}
.chooseTitle div{
  margin: 0 30px;
}
  .chooseTitle p:nth-of-type(2){
    font-size: 14px;
    color: #838383;
    margin-top: 5px;
  }
  .allchooseTitle{
    width: 300px;
    margin-bottom: 20px;
  }
.allchooseTitle img {
  width: 40px;
  margin: 0 15px;
}
.allchooseTitle p{
  font-size: 14px;
  color: #7d7d7d;
  line-height: 24px;
}
.allChoose{
  display: flex;
  flex-wrap: wrap;
  padding: 0 100px 30px 100px;
  box-sizing: border-box;

}
</style>
