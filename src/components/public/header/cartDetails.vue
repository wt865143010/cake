<template>
  <div id="cartBox">
    <div id="cartDetails">
      <div id="cartTitle">
        <img src="../../assets/cart/mycart.png" alt="">
        <p>
          <span>赠券</span>
          <span>已满足条件，订单完成可获赠优惠券</span>
          <span>已参加</span>
        </p>
      </div>
      <div id="cartList">
        <div class="cartListTop">
          <div>商品信息</div>
          <div>规格</div>
          <div>数量</div>
          <div>单价</div>
          <div>操作</div>
        </div>
        <ul class="cartGoodsBox">
          <li class="cartLists" v-for="(val,index) in cartGoods" :key="index">
            <div class="goodsMsg">
              <input type="checkbox" :value="val.id" v-model="val.isCheck" @click="checkOne(index)" >
              <div class="goodsImg">
                <img :src="$host + val.product_imgsrc " alt="">
              </div>
              <div class="goodsNameMsg">
                <p>{{val.product_name}}</p>
                <p>{{val.product_englishname}}r</p>
                <p>餐具：标配餐具(免费)10份</p>
              </div>
            </div>
            <div class="goodsSize">
              <span @click="getMoreSpecs(val.product_id,index)">{{val.product_specs}}<span
                class="el-icon-arrow-down"></span></span>
              <div class="productSpecs" v-show="aIndex == index">
                <p v-for="item in productS" @click="changeSpecs(item.specs_value,item.product_id,index)" :key="item.product_specs_id">
                  {{item.specs_value}}</p>
              </div>
            </div>
            <div class="goodsNum">
              <span class="jian" @click="numChange(val.product_id,-1,index)">-</span>
              <input type="number" v-model="val.product_num" @change="inputChange(val.product_id,index)">
              <span class="jia" @click="numChange(val.product_id,1,index)">+</span>
            </div>
            <div class="goodsOnePrice">
              <span>￥<span>{{val.product_price.toFixed(2)}}</span></span>
            </div>
            <div class="caoZuo">
              <span class="el-icon-delete" @click="delGood(val.product_name)"></span>
            </div>
          </li>


        </ul>
        <div class="peiJian">
          <h2>加购配件</h2>
          <div class="items-list">
            <div class="peiJianItems">
              <img src="../../assets/cart/s1.jpg" alt="">
              <h3>I LOVE MOM 巧克力牌</h3>
              <p>
                <span>￥<span>12.90</span></span>
                <span class="el-icon-shopping-cart-full"></span>
              </p>
            </div>
            <div class="peiJianItems">
              <img src="../../assets/cart/s1.jpg" alt="">
              <h3>I LOVE MOM 巧克力牌</h3>
              <p>
                <span>￥<span>12.90</span></span>
                <span class="el-icon-shopping-cart-full"></span>
              </p>
            </div>
          </div>
        </div>
        <div class="pay-detail">
          <div class="pay-icon">
            <input type="checkbox" v-model="isAllChecked" @click="checkAll()">
            <span>全选</span>
          </div>
          <div class="payR">
            <div class="pay-info">
              <div>
                <p>已选择 <span>{{selectNo}}</span> 件商品</p>
                <p class="payfont">共计 <span>{{myTotal[0]}}</span> 件商品</p>
              </div>
              <p class="payfont">配送范围内满100元包邮</p>
            </div>
            <div class="topay">
              <div class="pay-money">
                <span>合计：</span>
                <span>￥<span>{{myTotal[1]}}</span></span>
              </div>
              <div class="pay-btn">
                router
                <button>继续挑选</button>
                <button>结算</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cartDetails",
    data() {
      return {
        aIndex: '',
        // 控制是否选中
        cartCheck: 0,//选中状态
        unCarCheck: 1,//未选中的状态
        cartGoods: [],//数据库中的购物车数据
        selectGoods:[],//购物车中选中的购物车商品
        productS: [],//商品的所有规格
        totalNum: 0,//选中商品总数
        totalPrice: 0,//选中商品总价
        isAllChecked: true//购物车商品是否全部选择
      }
    },
    computed: {
      myTotal() {
        // console.log(this.cartGoods)
        this.totalNum = 0;
        this.totalPrice = 0;
        this.cartGoods.forEach(value => this.totalNum += parseInt(value.product_num));
        this.selectGoods.forEach(val => {
          // console.log(val.product_price)
          this.totalPrice += val.product_price * parseInt(val.product_num);
        });
        return [this.totalNum, this.totalPrice.toFixed(2)]
      },
      selectNo(){
        let selects = 0;
        this.selectGoods.forEach(val => {
           selects += parseInt(val.product_num)
        });
        return selects
      }
    },
    created() {
      this.$axios.get('/api/buyCart.do')
        .then(resp => {
          // console.log(resp.data);
          this.cartGoods = resp.data;
          this.cartGoods.forEach(val => {
            // val.isCheck = true;
            this.$set(val,'isCheck',true)
            this.selectGoods.push(val);
          })
          // console.log(this.cartGoods)
        })
    },
    methods: {
      // 单选
      checkOne(index) {
        if (this.cartGoods[index].isCheck === false) {
          this.cartGoods[index].isCheck = true;
          let allIsChecked = this.cartGoods.some(val => {
            return val.isCheck == false
          });
          if (allIsChecked){
            this.isAllChecked = false;
          }else {
            this.isAllChecked = true;
          }
          this.selectGoods.push(this.cartGoods[index]);
        } else {
          this.cartGoods[index].isCheck = false;
          this.isAllChecked = false;
          this.selectGoods.splice(index,1)
        }
      },
      // 全选
      checkAll() {
        if (this.isAllChecked === false) {
          this.selectGoods = [];
          for (let i = 0; i < this.cartGoods.length; i++) {
            this.cartGoods[i].isCheck = true;
            this.selectGoods.push(this.cartGoods[i])
          }
          // console.log(this.selectGoods)

        } else {
          for (let i = 0; i < this.cartGoods.length; i++) {
            this.cartGoods[i].isCheck = false;
            this.selectGoods = []
          }
          // console.log(this.selectGoods)

        }
        this.isAllChecked = !this.isAllChecked;
      },

    // 获得更多规格
    getMoreSpecs(msg, index) {

      if (this.aIndex == index) {
        this.aIndex = -1;
      } else {
        this.aIndex = index;
      }
      this.$axios.get('/api/getMoreSpecs.do', {params: {product_id: msg}})
        .then(resp => {
          this.productS = resp.data;
        })
    },
    // 更换规格，单价也会更随改变
    changeSpecs(msg1, msg2, index) {
      if (this.aIndex == index) {
        this.aIndex = -1;
      } else {
        this.aIndex = index;
      }
      this.$axios.get('/api/changeSpecs.do', {params: {specs: msg1, specsId: msg2}})
        .then(resp => {
          // console.log(resp.data)
         this.cartGoods.forEach((val,index) => {
           if(val.product_id == msg2){
           this.$set(val,'product_specs',resp.data[0].specs_value);
           this.$set(val,'product_price',resp.data[0].price);
           this.$set(this.selectGoods[index],'product_specs',resp.data[0].specs_value);
           this.$set(this.selectGoods[index],'product_price',resp.data[0].price);
           }
         })
        });
    },
      // 删除购物车商品
    delGood(goodsName) {
      this.$axios.get('/api/delGoods.do', {params: {name: goodsName}})
        .then(resp => {
          this.cartGoods.forEach((val,index) => {
            if (val.product_name == goodsName){
              this.cartGoods.splice(index,1);
              this.selectGoods.splice(index,1)
            }
          })
        })
    },
    numChange(product_id, num, index) {
      // console.log(num)
      if (num == 1) {
        this.cartGoods[index].product_num++;
        // console.log(this.cartGoods[index].product_num)
      } else {
        this.cartGoods[index].product_num--;
        if (this.cartGoods[index].product_num <= 1) {
          this.cartGoods[index].product_num = 1
        }
      }
      this.$axios.get('/api/changeCartNum.do', {
        params: {
          product_id: product_id,
          num: this.cartGoods[index].product_num
        }
      }).then(resp => {
        this.cartGoods.forEach((val,i) => {
          if (val.product_id == product_id){
            this.$set(val,'product_num',this.cartGoods[index].product_num);
            this.$set(this.selectGoods[i],'product_num',this.cartGoods[index].product_num);
          }
        })
      })
    },
    inputChange(product_id, index) {
      if (this.cartGoods[index].product_num <= 1) {
        this.cartGoods[index].product_num = 1
      }
      this.$axios.get('/api/changeCartNum.do', {
        params: {
          product_id: product_id,
          num: this.cartGoods[index].product_num
        }
      }).then(resp => {
        this.cartGoods.forEach((val,i) => {
          if (val.product_id == product_id){
            this.$set(val,'product_num',this.cartGoods[index].product_num);
            this.$set(this.selectGoods[i],'product_num',this.cartGoods[index].product_num);
          }
        })
      })
    }
  }
  ,
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #cartBox {
    background-color: #f8f8f8;
    width: 100%;
    /*position: absolute;*/
    /*z-index: 12;*/
  }

  #cartDetails {
    max-width: 1400px;
    min-width: 1200px;
    margin: 0 auto;
    /*outline: 1px solid red;*/
    padding-top: 70px;
    box-sizing: border-box;
  }

  #cartTitle {
    margin-bottom: 60px;
  }

  #cartTitle p {
    font-size: 14px;
    margin-top: 32px;;
  }

  #cartTitle p span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
  }

  #cartTitle p span:nth-child(1) {
    /*width: 20px;*/
    background-color: #e91820;
    color: #fff;
    border-radius: 20px;
    margin-right: 10px;
    padding: 0 10px;
  }

  #cartTitle p span:nth-child(3) {
    color: #e91820;
    margin-left: 30px;
  }

  #cartList {
    padding-bottom: 30px;
  }

  .cartListTop {
    display: flex;
    margin-bottom: 12px;
    border-radius: 10px;
    overflow: hidden;
  }

  .cartListTop div {
    text-align: center;
    background-color: #fff;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
  }

  .cartListTop div:nth-child(1),
  .goodsMsg {
    width: 38%;
  }

  .cartListTop div:nth-child(2),
  .cartListTop div:nth-child(3),
  .goodsSize,
  .goodsNum {
    width: 16%;
  }

  .cartListTop div:nth-child(4),
  .cartListTop div:nth-child(5),
  .goodsOnePrice,
  .caoZuo {
    width: 15%;
  }

  .cartGoodsBox {
    background-color: #fff;
    padding: 10px 0;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
  }

  .cartLists {
    display: flex;
    /*margin-bottom: 10px;*/
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0;
  }

  .cartLists:last-child {
    border: none;
  }

  .cartLists .goodsMsg {
    display: flex;
    align-items: center;
  }

  .goodsMsg input {
    font-size: 30px;
    line-height: 135px;
    margin-left: 30px;
  }

  .goodsImg {
    margin: 0 30px;
    box-sizing: border-box;
  }

  .cartLists .goodsImg img {
    display: block;
    width: 135px;
  }

  .goodsNameMsg p {
    margin: 0;
    padding: 0;
  }

  .goodsNameMsg p:nth-child(1) {
    font-weight: 700;
  }

  .goodsNameMsg p:nth-child(2),
  .goodsNameMsg p:nth-child(3) {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .goodsSize {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

  }

  .goodsSize .productSpecs {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 6px 0;
    box-sizing: border-box;
    background-color: #efefef;
    border-radius: 5px;
  }

  .productSpecs p {
    font-size: 14px;
    color: #5d5d5d;
    width: 190px;
    text-align: center;
    height: 22px;
    cursor: pointer;
  }

  .productSpecs p:hover {
    color: #000;
  }

  .goodsSize span span {
    margin-left: 5px;
    font-size: 20px;
  }

  .goodsNum {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goodsNum span {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    font-weight: 600;
    border: 1px solid #606060;
    cursor: pointer;
  }

  .goodsNum input {
    width: 30px;
    outline: none;
    border: none;
    text-align: center;
  }

  .goodsNum span:hover {
    background-color: #ffe32a;
  }

  .goodsOnePrice {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  .caoZuo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
  }

  .caoZuo span:hover {
    color: #ef2627;
  }


  .items-list {
    display: flex;
    padding: 0 0 0 60px;
  }

  .peiJian {
    padding: 20px 0 40px 0;
    box-sizing: border-box;
  }

  .peiJian h2 {
    margin: 20px 0;
  }

  .peiJianItems {
    margin: 0 20px;
  }

  .peiJianItems img {
    width: 150px;
    text-align: center;
    border: 1px solid #e8e8e8;
  }

  .peiJianItems h3 {
    font-size: 15px;
    font-weight: 400;
    margin: 10px 0;
  }

  .peiJianItems p {
    display: flex;
    justify-content: space-between;
  }

  .peiJianItems p span {
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
  }

  .peiJianItems p > span:last-child {
    font-size: 18px;
    width: 30px;
    height: 30px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
    background-color: #ffe32a;
  }

  .pay-detail {
    height: 310px;
    background-color: #fff;
    /*margin-bottom: 30px;*/
    padding: 30px 30px;
    box-sizing: border-box;
  }

  .pay-detail {
    display: flex;
  }

  .payR {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .pay-icon {
    width: 100px;
    margin-right: 50px;
    font-size: 20px;
  }

  .pay-icon span:nth-child(1) {
    font-size: 25px;
    cursor: pointer;
  }

  .payfont {
    color: #5d5d5d;
  }

  .pay-info,
  .topay {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pay-money {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pay-money span:nth-child(2) {
    font-weight: 800;
    font-size: 25px;
  }

  .pay-btn {
    display: flex;
    justify-content: center;

  }

  .pay-btn button {
    width: 150px;
    height: 45px;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 5px;
    border-radius: 22px;
    font-weight: 600;
    font-size: 17px;
  }

  .pay-btn button:nth-child(1) {
    background-color: #fff;
    border: 1px solid #606060;
  }

  .pay-btn button:nth-child(2) {
    background-color: #ffe32a;
  }

  .pay-icon span[data-all='0'] {
    color: #ffe32a;

  }

  .pay-icon span[data-all='1'] {
    color: #606060;
  }
/*input数字输入框样式*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  /*多选框样式*/
  input[type="checkbox"]{width:20px;height:20px;display: inline-block;text-align: center;vertical-align: middle; line-height: 18px;position: relative;}
  input[type="checkbox"]::before{content: "";position: absolute;top: 0;left: 0;background: #fff;width: 100%;height: 100%;border: 1px solid #d9d9d9}
  input[type="checkbox"]:checked::before{content: "\2713";background-color: #fff;position: absolute;top: 0;left: 0;width:100%;border: 1px solid #e50232;color:#e50232;font-size: 20px;font-weight: bold;}
</style>
