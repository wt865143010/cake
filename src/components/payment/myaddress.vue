<template>
  <div class="myAaddress">
    <div class="mydd">
      <h2>订单确认</h2>
      <p>我的购物车&nbsp&nbsp —&nbsp&nbsp 填写订单信息 &nbsp&nbsp—&nbsp&nbsp 完成订单</p>
    </div>
    <h4>配送信息</h4>
    <div class="myaddress">
      <div class="myAll">
        <div class="checkaddress">
          <div class="add1">

              <div v-if="defAddress.length>0">
                <div v-for="item in defAddress">
                  <strong>{{item.a_name}}</strong>
                  <p>{{item.tel}}</p>
                  <p>{{item.address}}</p>
                </div>
              </div>
              <div v-else>
                <div>请输入地址</div>
              </div>


          </div>
          <div class="showaddress">
          </div>
          <button class="addAddress" @click="openBox">选择地址</button>
        </div>
        <div class="sendtime">
          <div class="block">
            <span class="demonstration">配送时间</span>
            <el-date-picker
              class="addtime"
              v-model="value1"
              type="date"
              placeholder="请选择配送日期">
            </el-date-picker>
          </div>
          <el-time-select
            class="mydata"
            v-model="value"
            :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
            placeholder="请选择配送时间">
          </el-time-select>
          <div class="mys-1">配送时间10:00-19:00;截单时间14:00;9:00至14:00下单,最早14:00配送;14:00至21:30下单,最早次日10:00配送;
            21:30至次日9:00下单,最早次日14:00配送;</div>
        </div>
      </div>
      <div class="manageAddress" v-show="manageShow">
        <div v-for="item in allAddress">
          <div class="addressBox">
            <input type="radio" name="mycheck" @click="mycheck(item.id)">
            <div>{{item.a_name}},{{item.tel}}</div>   <span class="def" v-if="item.a_status==1">默认地址</span>
            <div>{{item.address}}</div>
            <div class="marginL30">
              <span @click="changedef(item.id)">默认地址</span> <span>|</span> <span @click="delAddress(item.id)">删除</span>
              <span @click="changeAddress(item.id,item.a_name,item.address,item.tel,item.a_status)">修改</span>
            </div>
          </div>
        </div>
<!--        <h4 class="newh">填写收货人信息</h4>-->
<!--        <input type="text" placeholder="收货人" id="name">   <br>-->
<!--        <input type="text" placeholder="联系方式" id="tel">  <br>-->
<!--        <input type="text" placeholder="收货详细地址" id="address">   <br>-->
        <input type="button" value="新增收货地址" class="addNewAddress" @click="openNew">
      </div>
    </div>
    <div class="newAddress" v-show="newAddressShow">
      <input type="text" placeholder="收货人" v-model="consignee"> <br>
      <input type="text" placeholder="联系方式" v-model="tel"> <br>
      <input type="text" placeholder="详细地址" v-model="address">
      <p @click="defaultAddress" class="changeclolr">设置为默认地址</p>
      <button @click="saveAddress" >保存并使用</button>
    </div>
    <bg1 @closeAll="closeAll" v-show="bgShow"></bg1>
  </div>

</template>

<script>
  import bg1 from "../public/bg/bg1";
    export default {
        name: "myaddress",
      data() {
        return {
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
          },
          value1: '',   //日期
          value: ''  ,   //时间
          msg:[],
          morenAddress:'请输入地址',
          manageShow:false,
          bgShow:false,
          newAddressShow:false,
          myAddress:[],
          consignee:'',//收货人
          tel:'',//联系方式
          address:'',//地址
          addressStatus:0,
          num:1,
          defAddress:[],
          allAddress:[],
          addressid:''
        };
      },
      // beforeCreate() {
      //   this.$axios.get('/api/getDefAddress.do')
      //     .then(resp=>{
      //       this.defAddress=resp.data;
      //     })
      // },
      created() {
        this.$axios.get('/api/getDefAddress.do')
        .then(resp=>{
          this.defAddress=resp.data;
        })
      },
      methods:{
        openBox(){
          // console.log(1111)
          this.$axios.get('/api/getAllAddress.do')
          .then(resp=>{

              this.allAddress=resp.data;
              this.manageShow=true
              this.bgShow=true

          })

        },
        closeAll(){
          this.manageShow=false
          this.bgShow=false
          this.newAddressShow=false;
        },
        openNew(){
          this.manageShow=false
          // this.bgShow=true
          this.newAddressShow=true;
          if (this.num%2==0){
            $('.changeclolr').css('color','gold');
            this.addressStatus=1;
          }else {
            $('.changeclolr').css('color','black');
            this.addressStatus=0;
          }
        },
        saveAddress(){

            this.$axios.post('/api/saveaddress.do',{id:this.addressid,name:this.consignee,tel:this.tel,address:this.address,addressStatus:this.addressStatus})
              .then(resp=>{
                this.$axios.get('/api/getDefAddress.do')
                  .then(resp=>{
                    this.defAddress=resp.data;
                    this.consignee=''//收货人
                    this.tel=''//联系方式
                    this.address=''//地址
                    this.addressStatus=0
                    this.num=1
                    this.addressid=''
                    this.closeAll()
                  })
              })

        },
        defaultAddress(){
          this.num+=1;
          // console.log(this.num)
          if (this.num%2==0){
            $('.changeclolr').css('color','gold');
            this.addressStatus=1;
          }else {
            $('.changeclolr').css('color','black');
            this.addressStatus=0;
          }
          // console.log(this.addressStatus)
        },
        changedef(addressId){
          this.$axios.get('/api/changedef.do?id='+addressId)
          .then(resp=>{
            this.$axios.get('/api/getDefAddress.do')
              .then(resp=>{
                this.defAddress=resp.data;
                console.log(this.defAddress)
                this.closeAll()
              })
          })
        },
        delAddress(addressid){
          this.$axios.post('/api/delAddress.do',{id:addressid})
          .then(resp=>{
            this.$axios.get('/api/getDefAddress.do')
              .then(resp=>{
                this.defAddress=resp.data;
                console.log(this.defAddress)
                this.closeAll()
              })
          })
        },
        changeAddress(addressid,a_name,address,tel,a_status){
          this.consignee=a_name;
          this.tel=tel;
          this.address=address
          this.openNew();
          this.addressid=addressid;
        },
        mycheck(id){
          this.$axios.post('/api/getCheckAddress.do',{id:id})
          .then(resp=>{
              this.defAddress=resp.data
          })
        },
        getAddress(){
          this.$emit('getmsg',[this.defAddress,this.value1,this.value])
        }

      },
      components:{
        bg1
      }
    }
</script>

<style scoped>
  .newh{
    text-align: center;
    margin-left: -550px;
    height: 20px;
    font-size: 20px;
    font-weight: normal;
    margin-top: 20px;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .myAaddress{
    margin-top: 70px;
  }
  .mydd{
    height: 98px;
    width: 1400px;
    margin: 0 auto;
  }
  .mydd>h2{
    display: inline-block;
    font-size: 27px;
    font-weight: normal;
  }
  .mydd>p{
    display: inline-block;
    float: right;
  }

  .myaddress{
    width: 1400px;
    height:340px;
    margin: 0 auto;
    padding-top: 32px;
    padding-bottom: 30px;
    box-sizing: border-box;
    margin-bottom: 26px;
    background-color: white;
  }
  h4{
    width: 1400px;
    font-size: 20px;
    display: block;
    height: 66px;
    /*margin: 0;*/
    padding: 0;
    margin: 0 auto;
  }
  .add1{
    margin-left: 40px;
  }
  .add1>p{
    display: block;
    margin-top: 34px;
    font-size: 20px;
    margin-right: 50px;
  }
  .checkaddress{
    display: flex;
    width: 1400px;
    height: 150px;
  }
  .addtime{
    margin-left: 36px;
    width: 274px;
  }
  .showaddress{
    width: 200px;
    height: 150px;
  }
  .addAddress{
    width: 152px;
    height: 44px;
    font-size: 16px;
    border: none;
    background-color: #ffd53a;
    border-radius: 50px;
    line-height: 44px;
    text-align: center;
    margin-left: 800px;
    margin-top: 34px;
  }
  .demonstration{
    display: inline-block;
    margin-left: 26px;
    font-size: 14px;
    color: silver;
  }
  .sendtime{
    display: flex;
    width: 1400px;
    height: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-top: 1px silver solid;
    box-sizing: border-box;
    padding-top: 40px;
  }
  .sendtime>span{
    width: 800px;
    /*margin-left: 100px;*/
  }
  /*.block{*/
  /*  width: 400px;*/
  /*}*/
  .mydata{
    width: 300px;
    height: 38px;
    background-color: #F8F8F8;
    margin-left: 10px;
  }
  .mys-1{
    font-size: 14px;
    display:inline-block;
    width: 600px;
    margin-left: 20px;
    color: silver;
  }
  .manageAddress{
    width: 600px;
    height: 600px;
    position: fixed;
    top:50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -300px;
    background-color: #F7F7F7;
    z-index: 20;
  }
  .addNewAddress{
    border: 1px solid #0D0D0D;
    width: 130px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    border-radius: 15px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    margin-left: -65px;
  }
  .newAddress{
    width: 500px;
    height: 500px;
    background-color: #F7F7F7;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    z-index: 20;
    text-align: center;
  }
  .newAddress input{
    width: 400px;
    height: 30px;
    margin-top: 50px;
    /*margin-left: 50px;*/
    border-radius: 5px;
    border: none;
  }
  .newAddress button{
    width: 150px;
    height: 44px;
    border: none;
    background-color: #ffe32a;
    border-radius: 44px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    margin-left: -75px;
  }
  .newAddress p{
    margin-top: 100px;
  }
  .marginL30{
    margin-left: 30px;
  }
  .addressBox{
    width: 300px;
    height: 80px;
    margin-left: 150px;
    margin-top: 30px;
    background-color: white;
    position: relative;
  }
  .def{
    display: inline-block;
    background-color: #ffe32a;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
