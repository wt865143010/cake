<template>
    <div>
      <div id="box">
        <div class="my">
            <span class="iconfont icon-gerenzhongxin"></span>
            <span>{{tell}}</span>
        </div>
        <div class="riqi">
          <span>{{week}}</span>
          <span>{{data}}</span>
        </div>
        <ul>
          <router-link to="/perInfo" tag="li" ><div @click="closeAll">个人资料</div></router-link>
          <!--<li>我的订单</li>-->
          <router-link to="/MY_order" tag="li" ><div @click="closeAll">我的订单</div></router-link>
          <router-link to="/vip"><li @click="closeAll">会员等级</li></router-link>
          <router-link to="/yuE"><li @click="closeAll">余额</li></router-link>
          <router-link to="/coupon"><li @click="closeAll">优惠券</li></router-link>
          <router-link to="/hongB"><li @click="closeAll">现金卡</li></router-link>
          <router-link to="/hongB"><li @click="closeAll">红包</li></router-link>
          <router-link to="/point"><li @click="closeAll">积分</li></router-link>
        </ul>
        <div>
          <div @click="logout" class="myhover">退出登录</div>
          <div class="myhover" @click="logout">切换账号</div>

        </div>
      </div>
    </div>
</template>

<script>


    export default {
        name: "MY",
      data(){
          let data=new Date()
          let year=data.getFullYear()
        let month=data.getMonth()+1;
          let day=data.getDate();
          let week=data.getDay()
        if(week==1){
          week="今天是星期一"
        }else if(week==2){
          week="今天是星期二"
        }else if(week==3){
          week="今天是星期三"
        }else if(week==4){
          week="今天是星期四"
        }else if(week==5){
          week="今天是星期五"
        }else if(week==6){
          week="今天是星期六"
        }else {
          week="今天是星期天"
        }
          let riqi=year+"."+month+"."+day
          return {
            tell:0,
            data:riqi,
            week:week
          }
      },
      props:['username'],
      methods:{
        closeAll(){
          console.log(11111)
          this.$emit('closeAllBox')
        },
        logout(){
          this.$axios.get('/api/mylogout.do')
          .then(resp=>{
            this.$emit('closeAllBox')
          })
        } ,
        getUser(username){
          this.tell=username;
        }
      }
    }
</script>

<style scoped>
  .myhover:hover{
    cursor: pointer;
  }
.my{
  width: 80%;
  height: 60px;
  line-height: 80px;
  border-bottom: 1px solid #8a8a8a;
  margin: 0 auto;

}
.my .iconfont{
  text-align: left;
}
.my,.riqi
{

  display: flex;
  justify-content: space-between;
}
.riqi{
  width: 80%;
  margin: 10px auto;
  font-size: 12px;
 }
  #box{
    background-color: white;
    width: 400px;
    height: 500px;
    border: 1px solid #c1c1c1;
    position: fixed;
    right: 0;
    z-index: 11;
  }
  ul{
    list-style: none;

    width: 80%;
    margin: 30px auto;
  }
#box a{
  text-decoration: none;
}
  li{
    margin-top: 12px;
    font-weight: bold;
    color: #7a7a7a;
  }
  li:hover{
    cursor: pointer;
  }
#box>div:last-of-type{
  width: 100%;
  border: 1px solid black;
  height: 60px;
  margin-top:70px;
}
#box>div:last-of-type>div{
  width: 50%;
  height: 100%;
  float: left;
  text-align: center;
  line-height:60px;
}
#box>div:last-of-type>div:first-of-type{
  background-color: #0D0D0D;
  color: white;

}
#box>div:last-of-type>div:last-of-type{
  background-color: #dcdc00;
  color: #505050;
}
</style>
