<template>
    <div id="main">
      <div class="myMain">
        <div class="p-top">
          <h3>配件说明</h3>
          <p>每份标配餐具：<span class="p-red">1个餐盘、1把餐勺 * 巧克力牌和生日蜡烛并非标配，如有需要，勾选后即可免费获取</span></p>
        </div>
        <div class="p-body">
          <h3>配件选择</h3>
          <div class="p-nth1 p-div">
            <div class="p-img"><img src="static/image/other033.jpg" alt=""></div>
            <p class="p1">巧克力牌</p>
            <button  class="btn2" @click="myCheck($event)"></button>
            <p class="hidden-p">
              <input type="text" placeholder="限9个汉字或18个字符" name="bdCard" value="happy"  class="p-input">
              <button class="btn1">确认</button>
            </p>
          </div>
          <div class="p-div">
            <div class="p-img"><img src="static/image/fitting_53.jpg" alt=""></div>
            <p class="p1">生日蜡烛</p>
            <button class="btn2" @click="myCheck($event)"></button>
          </div>
          <div class="p-div">
            <div class="p-img"><img src="static/image/fitting_52.jpg" alt=""></div>
            <p class="p2">额外餐具</p>
            <p class="p2">￥5.00/包（5个餐盘5个餐勺）</p>
            <p class="p3">
              <button class="btn2" @click="addBtn($event)"></button>
              <button class="btn2"  @click="xddBtn($event)">-</button>
              <span>0</span>
              <button class="btn2" @click="addBtn1($event)">+</button>
            </p>
          </div>
          <div class="p-div">
            <div class="p-img"><img src="static/image/fitting_55.jpg" alt=""></div>
            <p class="p2">额外生日蜡烛</p>
            <p class="p2">￥2.00/支</p>
            <p class="p3">
              <button class="btn2" @click="addBtn($event)"></button>
              <button class="btn2" @click="xddBtn($event)">-</button>
              <span>0</span>
              <button class="btn2" @click="addBtn1($event)">+</button>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "peiJian",
      data(){
        return{
          num1:1,
          num2:0
        }
      },
      methods:{
        myCheck(e){
          console.log(e.target);
          if (e.target.getAttribute('class')=="btn2"){
            e.target.setAttribute('class','btn2 c-yellow');
          }else {
            e.target.setAttribute('class','btn2')
          }
        },
        addBtn(e){
          if (e.target.getAttribute('class')=="btn2"){
            e.target.setAttribute('class','btn2 c-yellow');
           e.target.nextSibling.nextSibling.nextSibling.nextSibling.textContent=1
          }else {
            e.target.setAttribute('class','btn2');
            e.target.nextSibling.nextSibling.nextSibling.nextSibling.textContent=0;
          }
        },
        addBtn1(e){
          let a= Number(e.target.previousSibling.previousSibling.textContent);
          a++;
          e.target.previousSibling.previousSibling.textContent=String(a);
          if (a>0){
            e.target.parentNode.childNodes[0].setAttribute('class','btn2 c-yellow');
          }
        },
        xddBtn(e){
          let b= Number(e.target.nextSibling.nextSibling.textContent);
          if (b>0){
            b--;
            e.target.nextSibling.nextSibling.textContent=String(b);
            if (b==0){
              e.target.parentNode.childNodes[0].setAttribute('class','btn2');
            }
          }


        }

      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #main{
    width: 1400px;
    margin: 0 auto;
  }
  .myMain{
    width: 1400px;
    margin: 0 0 38px;
    padding: 22px 0 0;
  }
  .p-top{
    height: 99px;
    padding: 0 0 0 32px;
    background-color: white;

  }
  .p-top>h3{
    margin: 0 0 12px;
    padding-top: 32px;
  }
  .p-top>p{
    font-size: 14px;
  }
.p-red{
  color: red;
}
  .p-body{
    padding-left: 32px;
    height: 362px;
    background-color: white;
    margin-top: 2px;
  }
  .p-body>h3{
    padding-top: 32px;
  }
  .p-body>div{
    float: left;
    text-align: center;
  }
  button{
    width: 20px;
    height: 20px;
    border-radius: 20px;
    outline-style: none;
    border: 1px silver solid;
    cursor: pointer;
   margin: 0 5px;
  }
  .p-nth1{
    width: 243px;

  }
  .p-input{
    width: 152px;
    height: 22px;
  }
  .p-img>img{

  }
  .hidden-p{
    margin-top: 12px;
    margin-left: 18px;
  }
  .p-img{
    margin-bottom: 12px;
  }
  .btn1{
    width: 48px;
    height: 22px;
    background-color: #ffd919;
    font-size: 13px;
    border: none;
  }
  .p1{
    font-size: 14px;
    margin-bottom: 14px;
    height: 34px;
  }
  .p2{
    font-size: 14px;
    height: 24px;
  }
  .p3{
   font-size: 14px;
  }
  .btn2{
    margin-top: 5px;
    vertical-align:middle;
  }
  .p3>span{
    vertical-align: bottom;
  }
  .p-div{
    margin-right: 48px;
  }
  .hidden-p{
    display: none;
  }
  .c-yellow{
    background-color: yellow;
  }
</style>
