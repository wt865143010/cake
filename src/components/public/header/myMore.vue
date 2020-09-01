<template>
      <div id="myMore">
        <div class="m1">
          <span class="iconfont icon-gengduoneirong"></span>
          <span class="floatR">导航</span>
        </div>
        <div>
          <h3>服务热线</h3>
          <p>4006-678-678</p>
        </div>
        <div>
          <h3>服务时间</h3>
          <p>8:00 - 20:00</p>
        </div>
        <div>
          <h3>配送范围<span class="myS">查询</span> </h3>
          <p>配送范围内满100元包邮</p>
        </div>
        <router-link to="" class="close" >
          <div @click="closeAll">
            <img src="static/image/close1.png" alt="">
          </div>
        </router-link>
      </div>
</template>

<script>
    export default {
        name: "myMore",
        moreshow:false,
      methods:{
          closeAll(){
            this.$emit('transferMore',this.moreshow)
          }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
#myMore{
  position: fixed;
  right: 0;
  top: 0;
  width: 376px;
  height: 465px;
  background-color: white;
  z-index: 9999;
  padding-left: 76px;
  padding-top: 45px;
  box-sizing: border-box;
  text-align: left;
}
  .floatR{
    float: right;
    margin-right: 36px;
    font-size: 15px;
    color: silver;
  }
  .m1{
    margin-bottom: 128px;
  }
  h3{
    margin-bottom: 9px;
  }
  p{
    margin-bottom: 28px;
    font-size: 13px;
  }
  .myS{
    display: inline-block;
    background-color: yellow;
    font-size: 14px;
    font-weight: normal;
    border-radius: 18px;
    margin-left: 15px;
    width: 50px;
    text-align: center;
    cursor: pointer;
  }
  .close{
    position: absolute;
    top:60px ;
    right: 410px;
    cursor: pointer;
  }
</style>
