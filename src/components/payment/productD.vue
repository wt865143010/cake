<template>
    <div id="main">
      <div v-for="value in myxx" class="main2">
        <div class="main1">
          <div class="imgD"><img :src="'/api/images/cake/'+value.product_imgsrc" alt=""></div>
          <div class="sure-name">
            <p class="s-title">{{value.product_name}}</p>
            <p class="s-en">{{value.product_englishname}}</p>
            <p class="s-canJu">
              <span class="s-span">标配餐具</span>
              <span class="s-span1">10份标配餐具(免费)</span>
            </p>
            <p class="s-canJu">
              <span class="s-span">餐具选择</span>
              <input id="chose1" type="radio" name="choseC">
              <label for="chose1">需要餐具</label>
              <input id="chose2" type="radio" name="choseC">
              <label for="chose2">不需要餐具</label>
            </p>
          </div>
          <div id="sure-num1">
            <p>{{value.product_specs}}</p>
          </div>
          <div id="sure-num2">
            <p>{{value.product_num}}</p>
          </div>
          <div id="sure-money">
            <p>￥{{value.product_price*value.product_num}}</p>
          </div>
        </div>
        <peijian></peijian>
      </div>

      <chooseYouhui :imgsrc1="img1" :yhtitle="title1">
        <template v-slot:item>
          <div class="item" v-for="(val,index) in myyouhui" :style="{opacity:(aIndex === index ? 1 : 0.5)}"
               @click="chooseyh(val,index)">
            <div class="yhmoney">
              {{val.y_value}}
            </div>
            <div class="yhtiaojian">
              {{val.y_name}}
            </div>
          </div>
        </template>
        <template v-slot:tianjia>
          <div class="tjyouhui">
            <input type="text" placeholder="请输入优惠券编码" v-model="youhuiquan">
            <div class="tjbtn" @click="enter">添加</div>
          </div>
        </template>
      </chooseYouhui>
      <chooseYouhui :imgsrc1="img2" :yhtitle="title2">
        <!--      <template v-slot:item>-->
        <!--        <div class="item" v-for="(val,index) in myyouhui" :style="{opacity:(bIndex === index ? 1 : 0.5)}"-->
        <!--             @click="choosehb(val,index)">-->
        <!--          <div class="yhmoney">-->
        <!--            {{val.num}}-->
        <!--          </div>-->
        <!--          <div class="yhtiaojian">-->
        <!--            {{val.txt}}-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </template>-->
      </chooseYouhui>
      <chooseYouhui :imgsrc1="img3" :yhtitle="title3">
        <template v-slot:userinfo>
          <div class="userinfo">
            <div>账户可用余额 <span>{{yemoney}}</span>元（余额使用最小单位为1元）</div>
            <div class="el-icon-success" @click="chooseye($event)"></div>
          </div>
        </template>
      </chooseYouhui>
      <chooseYouhui :imgsrc1="img3" :yhtitle="title4">
        <template v-slot:userinfo>
          <div class="userjfinfo">
            <div>账户可用积分 <span>{{jfmoney}}</span>分（每100积分可抵用1元人民币）</div>
            <div class="el-icon-success" @click="choosejf($event)"></div>
          </div>
        </template>
      </chooseYouhui>
      <payWay></payWay>
      <div class="money-b">
        <p class="d-p1">商品金额：<span class="d-s0">{{getallmoney}}</span></p>
        <p>优惠券：￥ <span>-{{yhqmoney}}</span></p >
        <p>红包：￥ <span>-{{hbqmoney}}</span></p >
        <p>余额：￥ <span>-{{keyongye}}</span></p >
        <p>积分：￥ <span>-{{usejf}}</span></p >
        <p class="d-p2"><span class="d-s1">合计：</span><span class="d-s2">￥</span><span class="d-s3">{{gettotalmoney}}</span></p>
        <router-link :to="{path:'/order_info',query:{order_id:orderid,point:jfmoney,yue:yue}}" class="p-button"><button class="p-button" @click="getAll">提交订单</button></router-link>
      </div>
    </div>
</template>

<script>
  import peijian from './peiJian'
  import payWay from "./payWay";
  import chooseYouhui from "./chooseYouhui";
    export default {
        name: "productD",
        props:{mymsg:{type:Array}},
      data(){
      return{
        myxx:[],
        allMoney:0,
        orderid:'',
        img1: 'mycard01.png',
        title1: '优惠券',
        img2: 'mycard02.png',
        title2: '红包',
        img3: 'icon14.png',
        title3: '使用余额',
        title4: '使用积分',
        aIndex: '',
        bIndex: '',
        yhqmoney: 0,
        hbqmoney: 0,
        yemoney: 0,
        userye:0,
        jfmoney: 0,
        usejf:0,
        myyouhui: [],
        yue:0,
        youhuiquan:''

      }
      },
      methods:{



          //================================添加优惠券====================================================
        enter: function () {
          let that=this;
          this.$axios.get("/api/checkyouhui.do",{params:{code:this.youhuiquan}}).then(function (resp) {
            console.log(resp.data);

            if (resp.data.length>0){
              let mycode=resp.data[0].y_use;
              let name=resp.data[0].y_name;
              let value=resp.data[0].y_value;
              let least=resp.data[0].y_least;
              that.$axios.get("/api/saveyouhui.do",{params:{mycode,name,value,least}}).then(function (resp) {
                console.log(resp.data);
                that.y_num=resp.data.length;
                that.$message.success({
                  message: '添加成功！！！',
                  center: true,
                  offset:200
                })  ;
                that.huoquyhq()
              });
              // that.$axios.get("/api/delyouhui.do",{params:{mycode}}).then(function (resp) {
              //   console.log(resp.data)
              // })
            }else {
              this.$message.error({
                message: '输入有误！！！',
                center: true,
                offset:200
              })
            }
          })
        },
        huoquyhq(){
          this.$axios.get('/api/getyouhuiquan.do')
            .then(resp => {
              // console.log(resp.data)
              this.myyouhui = resp.data;
            });
        } ,

        /*=================================================================================================*/
        uuid(len, radix) {
          var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
          var uuid = [], i;
          radix = radix || chars.length;

          if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
          } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
              if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
              }
            }
          }
          return uuid.join('');
        },
        /*===============================================================================================================*/
        getAll() {
          this.$emit('getAddress')  ;
          let that=this;
          console.log(typeof this.usejf);
          this.mymsg.push([this.yhqmoney,parseFloat(this.usejf)*100,parseFloat(this.keyongye)+parseFloat( this.gettotalmoney)]);
          console.log(this.mymsg)
          this.orderid=this.uuid(10,20)    ;
          this.$axios.post("/api/finishDD.do",{
            myxx:that.myxx,
            mymsg:that.mymsg,
            uuid:this.orderid
          })












          // console.log(this.mymsg);
          // this.myxx.push(this.mymsg);
            // this.$axios.get("/api/finishDD.do",{params:{id:that.myxx[i].product_id,}})
         /* this.$axios.post("/api/finishDD.do",{
                  myxx:that.myxx,
                  mymsg:that.mymsg
            })
          .then(resp=>{
            console.log(resp.data);

              that.orderid=resp.data;


          });*/
          this.$axios.get("/api/delAll.do",{params:{user_id:1}}).then(function (resp) {
            console.log("清除购物车成功")
            // console.log(resp.data);
          })

            // this.$axios.get("/api/delAll.do",{params:{user_id:1}}).then(function (resp) {
            //   console.log("清除购物车成功")
            // })

          //
          // this.$axios.get("/api/saveaddress.do",{params:{
          //     name:that.mymsg[0],
          //     tel:that.mymsg[1],
          //     address:that.mymsg[2],
          //     day:that.mymsg[3],
          //     date:that.mymsg[4]
          //   }}).then(function (resp) {
          //   console.log(resp.data);
          // })
        } ,
        chooseyh(val, index) {
          if (this.getallmoney > val.y_least){
            if (this.aIndex === index) {
              this.yhqmoney = 0;
              this.aIndex = -1;  //在这里就将它赋值为-1  由于：-1 !=  index 所以其他内容隐藏 ，被点击的则打开
              // this.keyongye();
            } else {
              this.aIndex = index;    //这里是把index赋值给isShow，isShow=index则显示
              this.yhqmoney = val.y_value;
              // this.keyongye();
            }
          }else{
            this.$message.error({
              message: '购买总价不满足优惠条件！！！',
              center: true,
              offset:200
            })
          }
        },
        choosehb(val, index) {
          if (this.bIndex === index) {
            this.hbqmoney = 0;
            this.bIndex = -1;  //在这里就将它赋值为-1  由于：-1 !=  index 所以其他内容隐藏 ，被点击的则打开
          } else {
            this.bIndex = index;    //这里是把index赋值给isShow，isShow=index则显示
            this.hbqmoney = val.num;
            console.log(this.hbqmoney)
          }
        },
        chooseye(e) {
          if (e.target.style.color == 'rgb(255, 227, 42)') {
            e.target.style.color = '#000';
            this.userye = 0;
          } else {
            e.target.style.color = '#ffe32a';
            this.keyongye()
          }
        },
        choosejf(e) {
          if (e.target.style.color == 'rgb(255, 227, 42)') {
            e.target.style.color = '#000';
            this.usejf = 0;
            console.log()
            // this.keyongye();
          } else {
            e.target.style.color = '#ffe32a';
            this.usejf = (this.jfmoney / 100).toFixed(2);
            // this.keyongye();
          }
        },
      },
      components:{
        peijian:peijian,
        payWay:payWay,
        chooseYouhui
      },
      computed:{
        getallmoney(){
          this.myxx.forEach(val => {
            this.allMoney += val.product_price *val.product_num
          });
          return this.allMoney.toFixed(2)
        },
        gettotalmoney(){
          let heji =  this.getallmoney - this.yhqmoney - this.hbqmoney - this.usejf - this.userye
          return heji.toFixed(2)
        },
        keyongye(){
          let keyong = this.getallmoney - this.yhqmoney - this.hbqmoney - this.usejf;
          console.log(keyong);
          if (this.yemoney > keyong){
            this.userye = keyong;
          }else{
            this.userye = this.yemoney;
            console.log(this.userye)
          }
          this.yue=this.userye;
          return this.userye
        }
      },
      created() {
          let that=this;
          this.$axios.get("/api/buyCart.do").then(function (resp) {
            console.log(resp.data);
            that.myxx=resp.data;
            console.log(that.myxx);
          });
        this.huoquyhq();
        // this.$axios.get('/api/getyouhuiquan.do')
        //   .then(resp => {
        //     // console.log(resp.data)
        //     this.myyouhui = resp.data;
        //   });

        this.$axios.get('/api/useyue.do')
          .then(resp => {
            console.log(resp.data[0])
            this.yemoney = resp.data[0].money;
            console.log(this.yemoney);
          });

        this.$axios.get('/api/getpoint.do')
          .then(resp => {
            console.log(resp.data[0])
            this.jfmoney = resp.data[0].allpoint.toFixed(2);
          })
      },
      destroyed() {

      }

    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
#main{
  /*background-color: white;*/
  width: 1400px;
  /*height: 205px;*/
  margin: 0 auto;
}
.main1{
  width: 1400px;
  /*height: 205px;*/
  padding: 16px 0;
  background-color: white;
  display: flex;
  justify-content: left;
  margin-top: 18px;
}
  .imgD>img{
   width: 170px;
    height: 170px;
  }
  .imgD{
    margin: 0 18px;
  }
  .sure-name{
    width: 350px;
    text-align: left;
    margin-left: 28px;
    margin-right: 18px;
    padding-top: 22px;
  }
  .s-title{
    font-weight: bolder;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 4px;
  }
  .s-en{
    font-size: 13px;
    margin-top: 4px;
    margin-bottom: 4px;
    font-weight: initial;
    color: #484848;
  }
  .s-span{
    display: inline-block;
    background-color: rgba(255, 191, 198, 0.44);
    color: red;
    font-weight: lighter;
    padding: 2px 10px;
    border-radius: 14px;
    margin-right: 4px;
  }
  .s-span1{
    color: #484848;
  }
  .s-canJu{
    margin-top: 10px;
  }
  .s-canJu>span{
    font-size: 14px;
  }
  input{
    cursor: pointer;
  }
  label{
    font-size: 14px;
    color: #484848;
  }
  #sure-num1{
    width: 183px;
    margin: 0 0 0 18px;
    padding: 69px 0 0 15px;
  }
  #sure-num1>p{
    font-size: 14px;
  }
  #sure-num2{
    margin: 0 0 0 18px;
    padding: 69px 0 0 15px;
    width: 165px;
  }
  #sure-num2>p{
    font-size: 14px;
  }
  #sure-money{
    margin: 0 0 0 18px;
    padding: 68px 0 0;
    width: 170px;
  }
  #sure-money>p{
    background-color: #9e9e9e;
    display: inline;
    font-weight: bolder;
  }
  .money-b{
    height: 384px;
    padding-top: 98px;
    padding-bottom: 50px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
  }
  .p-button{
    width: 150px;
    height: 44px;
    text-align: center;
    outline-style: none;
    border: none;
    border-radius: 22px;
    background-color: #ffde2d;
    cursor: pointer;
  }
  .money-b>p{
    margin-bottom: 10px;
  }
  .d-s0{
    font-weight: bold;
  }
  .d-p2{
    line-height: 44px;
  }
  .d-s1{
    font-weight: bold;
    font-size: 18px;
  }
  .d-s2{
    font-size: 24px;
    font-weight: bold;
  }
.d-s3{
  font-size: 42px;
  font-weight: normal;
}

  .userinfo .el-icon-success {
    color: #ffe32a;
  }
</style>
