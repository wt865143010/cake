<template>
    <div>
      <div>
        <div id="tatil">
          <router-link to="/MY_order" tag="span">我的订单</router-link>
          <span>>订单详情 </span>
        </div>
        <ul class="order_info" v-for="item in myorder_baseinfo">
          <li>订单编号：{{item.id}}</li>
          <li>订购时间：{{item.delivery_day}}  {{item.dlivery_time}}</li>
          <li>如有疑问，请拨打客服热线：4006-678-678</li>
        </ul>
        <div class="product_info" v-for="value in myorder_info">
          <img :src="'/api/images/cake/'+value.imgsrc" alt="">
          <div class="produvt_name">
            <p>{{value.name}}</p>
            <p>{{value.english_name}}</p>
            <p>标配餐具</p>
          </div>
          <span>10份</span>
          <span>{{value.specs_value}}</span>
          <span>数量：{{value.product_num}}</span>
          <span>￥{{value.product_num*value.price}}</span>
        </div>

        <div class="info" v-for="item in myorder_baseinfo">
          <h3>收货信息</h3>
          <div>
            <h4>{{item.address}}</h4>
            <h4>{{item.delivery_day}}  {{item.dlivery_time}}</h4>
            <h4>{{item.receiver}} {{item.tell}}</h4>
          </div>
        </div>
        <div class="info" v-for="item in myorder_baseinfo">
          <h4>物流信息</h4>
          <div>
            <span v-show="item.order_type==1">你的订单已提交</span>
            <span>{{item.delivery_day}}  {{item.dlivery_time}}</span>
          </div>
        </div>
        <div class="info" v-for="item in myorder_baseinfo">
          <h4>金额明细</h4>
          <div>
            <p>商品金额：￥{{price_sum}}</p>
            <p>优惠券: ￥{{item.y_vaule}}</p>
            <p>积分：￥{{point=item.point_num}}</p>
            <p>实付金额：￥{{money=item.y_e}}</p>
            <p v-if="item.order_type==1">未支付(微信支付)</p>
            <p v-if="item.order_type==2">已支付(微信支付)</p>
          </div>
        </div>
        <div class="info" v-for="item in myorder_baseinfo">
          <h4>订单状态</h4>
          <h3 v-if="item.order_type==1">{{flag="待付款"}}</h3>
          <h3 v-else-if="item.order_type==0">{{flag="已取消"}}</h3>
          <h3 v-else-if="item.order_type==2">{{flag="已付款"}}</h3>
        </div>
        <div class="info" v-for="item in myorder_baseinfo" v-if="item.order_type==1">
          <h4>订单操作</h4>
          <div class="operation"v-for="item in myorder_baseinfo">
            <div @click="cancel(item.id)">取消订单</div>
            <div @click="topay(item.id)">去付款</div>
          </div>
        </div>
        <cancel v-show="isshow" @close="closeAll"  @confirm="confirm" :order_type="order_type"></cancel>
        <bg1 v-show="isshow" @closeAll="closeAll"></bg1>
      </div>

    </div>
</template>

<script>
  import cancel from "./cancel";
  import bg1 from "../public/bg/bg1"
    export default {
        name: "order_info",
      data(){
        return {
          isshow:false,
          flag:"",
          type:true,
          myorder_info:[],
          myorder_baseinfo:[],
          price_sum:0,
          order_type:"",


          /*===================================提交订单后========================================================================*/
          point:"298",//提交来的积分
          balance:"0",//提交来的余额
          red_paper:"0",//提交过来的红包金额
          money:"0"//提交过来的订单金额


        }

      },
      created() {
        console.log(this.$route.query.order_id)
        let order_id=this.$route.query.order_id
        this.point=this.$route.query.point //提交过来的积分
        // this.balance=this.$router.query.money //提交来的余额
        // this.red_paper=this.$router.query.red_paper //提交过来的红包金额
        // this.money=this.$router.query.money //提交过来的红包金额
        console.log(order_id)
        console.log(this.point)
        this.$axios.post("/api/order_info.do",{order_id:order_id}).then((response)=>{
          this.myorder_info=response.data
          this.myorder_info.forEach((value,i)=>{
            this.price_sum+=value.product_num*value.price
          })
        })
        this.$axios.post("/api/order_baseinfo.do",{order_id:order_id}).then((response)=>{
          this.myorder_baseinfo=response.data
        })
      },
      methods:{
        cancel(num){
          console.log("点击取消订单")
          console.log(num)
          this.order_type=num
          this.isshow=true

        },
        closeAll(){
          this.isshow=false
        },
        confirm(){
          this.isshow=false
          this.flag="已取消"
          this.type=false
          let order_id=this.$route.query.order_id
          this.$axios.post("/api/order_baseinfo.do",{order_id:order_id}).then((response)=>{
            this.myorder_baseinfo=response.data
          })
        },
        /*============去付款=====================================================================================================*/
        topay(order_id){
          console.log(this.money)
          console.log(this.point)
          this.$axios.post('/api/topay.do',{order_id:order_id}).then(response=>{//修改付款后的订单状态为2

            this.$axios.post("/api/order_baseinfo.do",{order_id:order_id}).then((response)=>{
              this.myorder_baseinfo=response.data
            })


            this.$axios.post('/api/addpoint.do',{point:this.point,money:this.money})//付款后添加积分
            this.$axios.post('/api/payment.do',{payMoney:this.$route.query.yue})//付款后扣除余额
          })

          // console.log(this.$route.query.yue)





        }
      },
      components:{
          cancel,
        bg1
      },


    }
</script>

<style scoped>
  #tatil{
    width: 100%;
    height: 100px;
    line-height: 100px;
    margin-left: 50px;
  }
  #tatil>span{
    color: black;
    font-size: 25px;
    font-family: 楷体;

  }
  #tatil>span:first-of-type:hover{
    cursor: pointer;
    color: #919191;

  }
  .order_info{
    list-style: none;
    width: 92.5%;
    height: 50px;
    margin-left: 50px;
    background-color: rgba(255, 255, 255, 0.76);
    margin-top: 10px;
  }
  .order_info>li{
    float: left;
    margin-left: 150px;
    line-height: 50px;
    text-align: center;
  }
  img{
    width: 150px;
    float: left;
  }
  .product_info{
    background-color:white;
    width: 90%;
    margin-left: 50px;
    border-top: 1px solid black;
    padding: 20px;
    height: 150px;
    display: flex;
  }
  .produvt_name{
    float: left;
    margin-top: 30px;
    margin-left: 50px;
    width: 50%;

  }
  .product_info>span{
    float: left;
    margin-left: 80px;
    margin-top: 60px;
    display: inline-block;
    width: 20%;
  }
  .info{
    display: flex;
    justify-content: space-between;
    background-color:white;
    width: 90%;
    margin-left: 50px;
    border-top: 1px solid black;
    padding: 20px;
  }
  .operation{
    width: 350px;
    height: 50px;
  }
  .operation div{
    width: 150px;
    height: 50px;
    float: left;
    text-align: center;
    line-height: 50px;
    border-radius: 40px;
    border: 1px solid #e9e9e9;
  }
  .operation>div:first-of-type{
   box-shadow:1px 1px 5px #e9e9e9;
  }
  .operation>div:last-of-type{
    background-color: yellow;
    margin-left: 20px;
  }

</style>
