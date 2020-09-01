<template>
  <div>
    <div class="youhuiBox">
      <div class="youhuititle">
        <div class="yhtitleleft">
          <img :src="'static/youhui/'+imgsrc1" alt="">
          <span>{{yhtitle}}</span>
        </div>
        <div class="youhuiicon">
          <!--          <p>无可用</p>-->
          <div :class="zhedie" @click="iszhedie"></div>
        </div>
      </div>
      <div v-show="isshowmx">
        <div class="youhuiXQ">
          <slot name="item"></slot>
          <!--          <div class="item">-->
          <!--            <div class="yhmoney">-->
          <!--              50-->
          <!--            </div>-->
          <!--            <div class="yhtiaojian">-->
          <!--              满100减50-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <slot name="tianjia"></slot>
        <slot name="userinfo"></slot>
        <!--        <div class="tjyouhui">-->
        <!--          <input type="text" placeholder="请输入优惠券编码">-->
        <!--          <div class="tjbtn">添加</div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chooseYouhui",
    props: ['imgsrc1', 'yhtitle'],
    data() {
      return {
        zhedie: 'el-icon-arrow-down',
        isshowmx: false
      }
    },
    created() {
      // console.log(this.$props.imgsrc1);
    },
    methods: {
      iszhedie() {
        if (this.zhedie == 'el-icon-arrow-up') {
          this.zhedie = 'el-icon-arrow-down'
          this.isshowmx = false
        } else {
          this.zhedie = 'el-icon-arrow-up'
          this.isshowmx = true
        }
      },

    }
  }
</script>

<style scoped>

  .youhuiBox {
    padding: 40px;
    background-color: #fff;
    margin: 10px 0;
  }

  .youhuititle {
    display: flex;
    justify-content: space-between;
    /*align-items: center;*/
  }

  .yhtitleleft {
    display: flex;
    align-items: center;
  }

  .yhtitleleft span {
    font-size: 18px;
    font-weight: bold;
    margin-left: 15px;
  }

  .youhuiicon {
    display: flex;
  }

  .youhuiicon p {
    margin: 0;
    padding: 0;
    color: #d2d2d2;
  }

  .youhuiicon div {
    width: 25px;
    height: 25px;
    background-color: #ffe32a;
    border-radius: 50%;
    color: #fff;
    line-height: 24px;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    margin-left: 10px;
    cursor: pointer;
  }

  .youhuiXQ {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 0;
  }
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0);
  }



  .item {
    position: relative;
    width: 478px;
    height: 117px;
    background: url('../../../static/youhui/red06.png') no-repeat center;
    display: flex;
    justify-content: space-between;
    margin: 10px;
    /*opacity: 0.5;*/
  }

  .yhmoney {
    width: 150px;
    height: 100%;
    font-size: 60px;
    font-weight: 400;
    color: #fff;
    line-height: 117px;
    text-align: center;
  }

  .yhtiaojian {
    width: 300px;
    height: 100%;
    line-height: 117px;
    text-align: center;
    color: #fff;
    font-width: 400;
    font-size: 18px;
  }

  .tjyouhui {
    display: flex;
    justify-content: flex-end;
  }

  .tjyouhui input {
    border: none;
    outline: none;
    border-bottom: 1px solid #b2b2b2;
    width: 300px;
    height: 40px;
    text-indent: 18px;
    font-size: 14px;
    margin-right: 25px;
  }

  .tjyouhui div {
    width: 155px;
    height: 45px;
    border-radius: 22px;
    background-color: #ffe32a;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }

  .userjfinfo,
  .userinfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .userinfo div,
  .userjfinfo div{
    font-size: 22px;
    color: #838383;
  }

  .userinfo div span,
  .userjfinfo div span{
    font-size: 38px;
    color: #e43d2b;
  }

</style>
