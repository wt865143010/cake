<template>
    <div class="main_hb">
      <div class="my_hb">
        <div class="hb-banner">
          <img src="../../../static/image/hb-banner.png" alt="">
        </div>
        <div class="hb_t">
          <img src="../../../static/image/hy-title-1.png" alt="">
        </div>
        <div class="hb_b">
          <div><img src="../../../static/image/hb-1.png" alt=""><button>点击领取</button></div>
          <div><img src="../../../static/image/hb-2.png" alt=""><button>点击领取</button></div>
          <div><img src="../../../static/image/hb-3.png" alt=""><button>点击领取</button></div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "gethb"
    }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.my_hb{
  width: 1400px;
  margin: 0 auto;
}
  .hb-banner>img{
    width: 1400px;
    margin-left: 10px;
  }

  .hb_t>img{
  margin-left: 180px;
  }
  .hb_b{
    display: flex;
    /*width: 318px;*/
    justify-content: center;
    margin-top: 20px;
  }
  .hb_b>div{
    width: 318px;
    text-align: center;
  }
  .hb_b>div>button{
    /*display: inline-block;*/
    /*display: block;*/
    width: 100px;
    height: 25px;
    background-color: #ffd048;
    border: none;
    border-radius: 12.5px;
    cursor: pointer;
    outline-style: none;
    margin-top: 8px;
  }
</style>
