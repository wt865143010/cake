<template>
  <div id="pay">
    <div class="payTitle">
      <span class="el-icon-goods"></span>
      <span>Shopping cart</span>
      <span class="payNum">{{myTotal[0]}}</span>
    </div>
    <ul class="payGoods">
      <li v-for="val in cartGoods">
        <div>
          <img :src="'/api/images/cake/' + val.product_imgsrc" alt="">
          <span class="goodsName">{{val.product_name}}</span>
        </div>
        <div>
          <span class="goodsHeight">{{val.product_specs}}</span>

        </div>
        <div>
          <span>￥<span class="goodsPricce">{{val.product_price.toFixed(2)}}</span> * <span
            class="sum">{{val.product_num}}</span></span>
        </div>
        <span class="delgoods el-icon-close" @click="delGood(val.product_name)"></span>
      </li>

    </ul>
    <div class="allprice">
      <div>
        <p>合计:</p>
        <p><span class="payNum">{{myTotal[0]}}</span>件商品</p>
      </div>
      <div>
        <p>￥<span id="zongJia">{{myTotal[1].toFixed(2)}}</span></p>
        <p>运费：￥<span>0.00</span></p>
      </div>
    </div>
    <div class="carBtns">
      <router-link to="/cartDetails" tag="div">
        <button class="carIn">进入购物车</button>
      </router-link>

      <router-link to="/dingdan" tag="div">
        <button class="carBuy">去结算</button>
      </router-link>

    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsCart",
    data() {
      return {
        cartGoods: [],
        totalNum: 0,
        totalPrice: 0,
      }
    },
    created() {
      // this.$axios.get('/api/buyCart.do')
      //   .then(resp => {
      //     // console.log(resp.data);
      //     this.cartGoods = resp.data;
      //   });
    },
    computed: {
      myTotal(){
        this.totalNum = 0;
        this.totalPrice = 0;
        this.cartGoods.forEach(val => {
          // console.log(val);
          this.totalNum += parseInt(val.product_num);
          this.totalPrice += val.product_price * val.product_num;
        })
        return [this.totalNum,this.totalPrice]
      }
    },
    methods: {
      delGood(goodsName) {
        this.$axios.get('/api/delGoods.do', {params: {name: goodsName}})
          .then(resp => {
            this.cartGoods.forEach((val,index) => {
              if (val.product_name == goodsName){
                this.cartGoods.splice(index,1);
              }
            })
          })
      },
      getproduct(){
        this.$axios.get('/api/buyCart.do')
        .then(resp=>{
          this.cartGoods=resp.data;
        })
      }

    }
  }
</script>

<style scoped>
  #pay {
    width: 500px;
    /*outline: 1px solid red;*/
    /*margin-top: 121px;*/
    /*float: right;*/
    position: fixed;
    right: 0;
    z-index: 15;
    background-color: white;
  }

  .payTitle {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    border-bottom: 1px solid #b3b3b3;
    font-size: 13px;
    color: #b3b3b3;
    position: relative;
  }

  .payTitle span:nth-child(1) {
    font-size: 20px;
  }

  .payTitle span:nth-child(3) {
    position: absolute;
    top: 25px;
    left: 40px;
    /*width: 15px;*/
    padding: 0 5px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    border-radius: 7.5px;
    background-color: #ffe32a;
    color: #000;
    font-weight: 600;
  }

  .payGoods {
    list-style: none;
    height: 250px;
    padding: 15px 0;
    margin: 0;
    box-sizing: border-box;
    overflow-y: scroll;
  }

  .payGoods li {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 30px;
    margin-bottom: 12px;
    cursor: pointer;
    line-height: 30px;
    font-size: 15px;
    color: #666;
    padding: 0 40px 0 30px;
  }

  .payGoods li img {
    width: 30px;
    vertical-align: middle;
  }

  .payGoods li:hover {
    background-color: #efefef;
  }

  .payGoods li:hover .delgoods {
    display: block;
  }

  .delgoods {
    position: absolute;
    right: 5px;
    top: 3px;
    border: 1px solid #666;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    box-sizing: border-box;
    display: none;
  }

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

  .allprice {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    box-sizing: border-box;
  }

  .allprice p {
    margin: 0;
    padding: 0;
  }

  .allprice div:nth-child(1) p:nth-child(1) {
    font-size: 15px;
  }

  .allprice div:nth-child(1) p:nth-child(2) {
    font-size: 13px;
    color: #666;
  }

  .allprice div:nth-child(2) p:nth-child(1) {
    font-size: 18px;
    font-weight: 800;
  }

  .allprice div:nth-child(2) p:nth-child(2) {
    font-size: 13px;
  }

  .carBtns {
    display: flex;
  }

  .carBtns button {
    flex: 1;
    border: none;
    outline: none;
    height: 70px;
  }
  .carBtns div{
    flex: 1;
  }

  .carIn{
    background-color: #333333;
    color: #fff;
    width: 100%;
  }
  .carBuy{
    background-color: #ffe32a;
    width: 100%;
  }
  /*.carBtns button:nth-child(1) {*/
  /*  background-color: #333;*/
  /*  color: #fff;*/
  /*}*/

  /*.carBtns button:nth-child(2) {*/
  /*  background-color: #ffe32a;*/
  /*}*/
</style>
