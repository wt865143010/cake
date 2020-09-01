<template>
  <div class="perInfo">
    <div v-for="item in user">
      <h3>个人资料</h3>
      <div class="box">
        <div class="photoBox">
          <div class="borderWidth">
            <img src="static/image/dog.jpg" alt="">
            <p>仅支持JPG、PNG、JPEG、BMP格式，文件小于2M</p>
          </div>
          <div class="borderRadius">
            <img src="static/image/dog.jpg" alt="">
          </div>
          <p class="yuLan">圆形头像预览</p>
        </div>
        <div class="infoBox">
          <div class="name">
            <span class="dot" style="display: none;">*</span>
            <span class="span-txt fl">昵称</span>
            <input class="username" type="text" v-model="item.Nickname" maxlength="20">
          </div>

          <div class="sex">
            <span class="span-txt fl">性别</span>
            <span class="fl">女</span>
            <input type="radio" name="1" cheaked>
            <span class="ml fl">男</span>
            <input type="radio" name="1">
          </div>

          <div class="birthday">
            <span class="dot" style="display: none;">*</span>
            <div class="block">
              <span class="demonstration fl">生日</span>
              <el-date-picker id="bg"
                v-model="value2=item.birthday"
                align="right"
                type="date"
                placeholder="请选择你的生日"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>

          <div class="phone">
            <span class="dot" style="display: none;">*</span>
            <span class="span-txt fl">手机</span>
            <input class="tell" type="text" v-model="item.tell" maxlength="11">
          </div>

          <div class="mail">
            <span class="span-txt fl">邮箱</span>
            <input class="mailnum" type="text" v-model="item.mailbox" maxlength="35">
          </div>

          <div class="like">
            <span class="span-txt fl">偏爱</span>
            <div class="type">
              <p>
                <span>拿破仑</span>
                <input type="checkbox" class="kind type-1 ">
                <span>鲜奶</span>
                <input type="checkbox" class="kind type-2 ">
                <span>慕斯</span>
                <input type="checkbox" class="kind type-3 ">
                <span>芝士</span>
                <input type="checkbox" class="kind type-4 ">
              </p>
              <p>
                <span>巧克力</span>
                <input type="checkbox" class="kind type-5 ">
                <span>咖啡</span>
                <input type="checkbox" class="kind type-6 ">
                <span>坚果</span>
                <input type="checkbox" class="kind type-7 ">
                <span>水果</span>
                <input type="checkbox" class="kind type-8 ">
              </p>
            </div>
          </div>

        </div>
        <div class="save" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import datepicker from "./datepicker";

  export default {
    // name: perInfo,
    components: {
      // datepicker: datepicker
    },
    data() {
      return {
        user: [],
        username: "",
        sex: "",
        // birthday: "",
        tell: "",
        mail: "",
        /*++++++++++++++++++生日+++++++++++++++++++++++++*/
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: ''

        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
      }
    },
    created() {
      this.$axios.get("/api/getUser.do?aa=" + 1 + "&&cc=" + 2).then(resp => {
        console.log(resp.data);
        this.user = resp.data
      })
    },
    methods: {
      save: function () {
        console.log(this.value2)
        // if(this.value2==){
        //   }
        this.username = $(".username").val();
        // this.sex = $(".sex").val();/*=============男/女==========*/
        // this.birthday = $("#birth-date").val();
        this.birthday = this.value2.toLocaleDateString()
        console.log(this.birthday)


        this.tell = $(".tell").val();
        this.mail = $(".mailnum").val();

        console.log($(".username").val());
        // console.log($(".sex").val());
        // console.log($("#birth-date").val());
        // console.log($(datepicker))

        console.log($(".tell").val());
        console.log($(".mailnum").val());

        this.$axios.get("/api/save.do?" +
          "username=" + this.username +
          "&&birthday=" + this.birthday +
          "&&tell=" + this.tell +
          "&&mail=" + this.mail
        ).then(resp => {
          this.$router.push({path:'/home'})
        })
      }
    }
  }
</script>

<style scoped>
  .perInfo {
    width: 1200px;
    height: 100%;
    position: relative;
    margin: 0 auto;
  }

  h3 {
    width: 1200px;
    height: 100px;
    line-height: 100px;
    background-color: rgba(153, 153, 153, 0.1);
    margin-bottom: 85px;
    font-size: 22px;
    font-weight: 400;
    color: #929292;
    text-align: center;
  }

  .box {
    display: flex;
  }

  .photoBox {
    width: 600px;
    height: 668px;
    text-align: center;
    border-right: 1px solid lightgrey;
  }


  .borderRadius {
    width: 210px;
    height: 210px;
    position: absolute;
    left: 16%;
    border-radius: 500px;
    overflow: hidden;
  }

  .borderWidth > img {
    width: 250px;
    height: 250px;
  }

  .borderRadius > img {
    width: 210px;
    height: 210px;
  }

  .yuLan {
    position: absolute;
    top: 700px;
    left: 21%;
  }

  .infoBox {
    width: 420px;
    height: 700px;
    text-align: left;
    padding-left: 150px;
  }

  p {
    font-size: 16px;
    color: #bbb;
  }

  /*======================*/
  .name, .sex, .phone, .mail, .birthday {
    margin-bottom: 80px;
  }

  .fl {
    opacity: 0.5;
  }

  .span-txt {
    margin-right: 20px;
  }

  input {
    outline: none;
    border: none;
    opacity: 0.5;
    border-bottom: 1px solid #bbb;
    background-color: #f2f2f2;
  }

  .type {
    position: absolute;
    top: 678px;
    right: 140px;
  }

  .save {
    width: 150px;
    height: 50px;
    border-radius: 50px;
    background-color: gold;
    text-align: center;
    line-height: 50px;
    margin-top: 100px;
    position: absolute;
    top: 760px;
    left: 530px;
  }

</style>
