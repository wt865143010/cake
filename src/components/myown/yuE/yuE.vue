<template>
  <div class="news-wrap">
    <div>
      <div class="news-left">
        <div class="circle">
          <div>
            <h3>{{mymoney}}</h3>
            <p>当前余额</p>
          </div>
        </div>
<!--        <button><a href="#">选蛋糕</a></button>-->
        <button>
          <router-link to="home">选蛋糕</router-link>
<!--          <router-link to="/more"  tag="li">选蛋糕</router-link>-->
        </button>

      </div>
      <div class="news-right">
        <h3>余额明细</h3>
        <div class="table">
          <p class="p1"><span class="first">时间</span><span class="mid">明细</span><span class="last">收入/支出</span></p>
          <div v-for="item in bill">
            <p class="p1"><span class="first">{{item.savetime}}</span><span class="mid">{{item.detailed}}</span><span class="last">{{item.in_out}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "yuE",
    data(){
      return {
        mymoney:[],
        bill:[]
      }
    },
    created() {
      this.$axios.get('/api/getM.do')
        .then(resp=>{
          // console.log(resp.data);
          this.mymoney=resp.data[0].money;
        })
      this.$axios.get('/api/getbill.do')
      .then(resp=>{
        this.bill=resp.data;
      })
    }
  }
</script>

<style scoped>
  .news-wrap {
    width: 100%;
    height: 520px;
    text-align: center;
    padding-top: 120px;
    background: #f8f8f8;
  }

  .news-wrap > div {
    width: 1450px;
    margin: 0 auto;
    /*outline: 1px solid red;*/
  }

  .circle {
    width: 254px;
    height: 254px;
    padding: 1px;
    background: #f8f8f8 url(../../../../static/image/circle.png) no-repeat center;
    text-align: center;
    margin-bottom: 38px;
  }

  .circle > div {
    margin-top: 100px;
  }

  .circle > div > h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  .news-left {
    width: 254px;
    height: 336px;
    float: left;
    padding: 1px;
    text-align: center;
    /*outline: 1px solid red;*/
  }

  .news-left > button {
    width: 154px;
    height: 44px;
    border: none;
    cursor: pointer;
    background-color: #f9d510;
    border-radius: 44px;
  }

  .news-right {
    float: left;
    text-align: left;
    margin-left: 188px;
    /*outline: 1px solid red;*/
  }

  .news-right h3 {
    font-size: 20px;
    margin-bottom: 42px;
  }

  .table {
    width: 780px;
    height: 400px;
    overflow-y: auto;
  }

  .table .p1 {
    height: 42px;
    line-height: 42px;
    background: #fff;
    margin-bottom: 6px;
  }

  .table .first {
    width: 180px;
  }
  .table .mid {
    width: 420px;
    margin-left: 20px;
    margin-right: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .table span {
    display: inline-block;
    font-size: 14px;
    color: #575757;
    text-align: center;
  }

  .table span {
    display: inline-block;
    font-size: 14px;
    color: #575757;
    text-align: center;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    outline: 0;
  }
</style>
