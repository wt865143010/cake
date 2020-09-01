<template>
    <div id="xq-main">
      <div id="xq-myMain">
        <div class="img-top"><img :src="'/api/images/cake/'+myxq.m_imgsrc" alt=""></div>
        <div id="div-main">
          <div class="div-l">
            <div class="div-l1">
              <h2>{{myxq.name}}<span>商品评价</span></h2>
              <div class="left-t">
                <p class="xq-p-1">{{myxq.english_name}}</p>
                <p id="xq-p-2">{{myxq.time}}</p>
                <p class="xq-p-3">
                  <span v-for="value in base">{{value.name}}</span>
<!--                  <span>巧克力</span>-->
<!--                  <span>水果</span>-->
                </p>
              </div>
              <div class="left-b">
                <p class="basep"><span>口味基底</span>{{myxq.Tasty_base}}</p>
                <p><span>口感</span><span>{{myxq.tasty}}</span></p>
                <p><span>口味</span><span>{{myxq.taste}}</span></p>
                <p class="xq-p-4"><span>甜味</span><span>
                  <span>{{myxq.sweet}}级</span>

                </span></p>
                <p class="xq-p-5">{{myxq.free}}</p>
                <p class="xq-p-6">{{mysize}}</p>
                <p class="xq-p-7">若不及时食用，请放置0-10℃冷藏</p>
              </div>
            </div>
            <div class="div-b">
<!--              <div class="kong"></div>-->
              <div class="div-w" v-for="(value,index) in xq" @click="getOther($event,index)">
                <p class="xq-p-8">{{value.specs_value}}</p>
              </div>
            </div>
          </div>
          <div class="div-r">
            <div class="r-top">
              <p><span>换购</span>| 买蛋糕可至购物车参加优惠换购</p>
              <p><span>立减</span>| 会员积分超值兑换<i>详情></i></p>
              <p><span>赠券</span>| 2020年新用户赠券<i>详情></i></p>
            </div>
            <div class="r-bottom">
              <p class="xq-p-9"><span class="s-9-1">￥</span><span class="s-9-2">{{jiage}}</span></p>
              <p class="xq-p-10">
                <button class="xq-btn1" @click="addCar">加入购物车</button>
                <router-link to="/dingdan"><button class="xq-btn2" @click="addCar">立即订购</button></router-link>
<!--                  <button class="xq-btn2">立即订购</button>-->
              </p>
            </div>
          </div>
        </div>
        <div class="img-b"><img :src="'/api/images/cake/'+myxq.b_imgsrc" alt=""></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "xiangQing",
      data(){
          return{
            size:['SIZE:16cm*7.5cm','SIZE:19cm*7.5cm','SIZE:23cm*7.5cm','SIZE:29.5cm*7.5cm'],
            mysize:'SIZE:16cm*7.5cm',
            jiage:'',
            xq:[],
            myxq:{},
            base:{},
            productspecs:'',
            id:0
          }
      },
      created() {
          let that=this;
          this.id=this.$route.query.id;
          console.log(this.id);
          this.$axios.get("/api/xiangQing.do",{params:{id:this.id}}).then(function (resp) {
            that.xq=resp.data;
            console.log(that.xq);
            that.productspecs=that.xq[0].specs_value
          });
          this.$axios.get("/api/xiangQing1.do",{params:{id:this.id}}).then(function (resp) {
            that.myxq=resp.data[0];
            console.log(that.myxq);
            that.jiage=resp.data[0].price
          });
          this.$axios.get("/api/xiangQing2.do",{params:{id:this.id}}).then(function (resp) {
           that.base=[resp.data[0],resp.data[1]]
          })

      },
      methods:{
          getOther(e,index){
            let that=this;
            // console.log(this.xq[index].price);
            let mynode=e.target .parentNode.parentNode.childNodes;
            for (let i=0;i<mynode.length;i++){
              if (i==index){
                e.target.setAttribute("class","xq-p-8 xq-p-8-1");
                that.productspecs= e.target.textContent;
                console.log(that.productspecs)
              }else {
                mynode[i].childNodes[0].setAttribute("class","xq-p-8")
              }
            }
            return [this.jiage=this.xq[index].price,this.mysize=this.size[index]]
          },
        addCar(){
            let that=this;
            let addxq=that.myxq;
            // console.log([addxq.name,addxq.english_name,addxq.imgsrc,that.productspecs,1,that.jiage,that.id]);
            this.$axios.get("/api/addtocart.do",{params:{
                productctitle:addxq.name,
                productetitle:addxq.english_name,
                productsrc:addxq.imgsrc,
                guige:that.productspecs,
                num:1,
                userid:1,
                productprice:that.jiage,
                productid:that.id
              }}).then(function (resp) {
                console.log("添加成功")
            })
        }


      }
    }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.img-b{
  text-align: center;
}
.img-top>img{
  width: 100%;
}
  .img-b>img{
    width: 1400px;
  }
  #div-main{
    width: 1400px;
    height: 618px;
    background-color: white;
    position: relative;
    top: -75pt;
    width:1400px;
    margin: 0 auto;
  }
  .div-l{
    width: 910px;
    float: left;
    background-color: white;
    height: 618px;
    box-sizing: border-box;
    border-right: 1px silver solid;
  }
  .div-l1{
    padding-left: 109px;
  }
  .div-l1>h2{
    margin-top: 68px;
    margin-bottom: 8px;
    height: 32px;
    line-height: 32px;
  }
  .div-l1>h2>span{
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    background-color: #ffd04c;
    margin-left: 10px;
    width: 78px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 24px;
  }
  .div-r{
    width: 383px;
    float: left;
    background-color: white;
    height: 618px;
    padding: 18px 0 0 32px;
    box-sizing: border-box;
  }
  .left-t{
    margin-bottom: 24px;
  }
  .left-t>p{
    font-size: 14px;
  }
.left-b>p{
  font-size: 14px;
}
  .xq-p-1{
    margin-bottom: 24px;
  }
  #xq-p-2{
    margin-bottom: 32px;
    font-size: 16px;
  }
  .xq-p-3>span{
    display: inline-block;
    margin-right: 10px;
    width: 78px;
    height: 24px;
    text-align: center;
    background-color: #ffd04c;
    border-radius: 12px;
    line-height: 24px;
  }
  .xq-p-4{
    margin-bottom: 15px;
  }
  .xq-p-5{
    margin-bottom: 6px;
  }
  .xq-p-6{
    margin-bottom: 8px;
  }
  .xq-p-7{
    margin-top: 20px;
    color: red;
    margin-bottom: 6px;
  }
  .left-b>p>span{
    display: inline-block;
    width: 100px;
    text-align: left;
    margin-bottom: 10px;
  }

  .div-b{
    border-top: 1px silver solid;
    margin-top: 32px;
    padding-left: 109px;
    padding-top: 38px;
    box-sizing: border-box;
  }
  .div-w{
    width: 120px;
    height: 48px;
    display: inline-block;
    /*margin-left: 109px;*/
    margin-right: 50px;
    cursor: pointer;
  }
  .xq-p-8{
    font-size: 18px;
    color: #767676;
  }
  .xq-p-8-1{
    color: #212121;
  }
  .r-top{
    margin-top: 36px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 350px;
    height: 320px;
    box-sizing: border-box;
  }
  .r-top>p{
    margin: 0 0 10px;
    font-size: 15px;
    color: #767676;
    cursor: pointer;
  }
  .r-top>p>span{
    border: 1px red solid;
    color: red;
    display: inline-block;
    width: 62px;
    height: 21px;
    text-align: center;
    border-radius: 10px;
    margin-right: 10px;
  }
  i{
    float: right;
    font-style: normal;
    font-size: 16px;
  }
  .r-bottom{
    margin-top: 56px;
  }
  .xq-p-9{
    margin-bottom: 32px;
  }
  .s-9-1{
    font-size: 20px;
  }
  .s-9-2{
    font-size: 28px;
  }
  .xq-p-10{
    height: 40px;
  }
  .xq-p-10>button{
    width: 152px;
    height: 44px;
    line-height: 44px;
    outline-style: none;
    border-radius: 22px;
    font-size: 15px;
    cursor: pointer;
  }
  .xq-btn1 {
    background-color: white;
    border: 1px silver solid;
    margin-right: 20px;
  }
  .xq-btn2{
    background-color: #ffd04c ;
    border: none;
    width: 152px;
    height: 44px;
    line-height: 44px;
    outline-style: none;
    border-radius: 22px;
    font-size: 15px;
    cursor: pointer;
  }
  .basep{
    display: inline-block;
    width: 600px;
  }
  .bases{
    display: inline-block;
    width: 300px;
  }
</style>
