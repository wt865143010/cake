<template>
  <div class="news-wrap">
    <div>
      <div class="news-left">
        <div class="circle">
          <div>
            <h3>{{allpoint}}</h3>
            <p>当前积分</p>
          </div>
        </div>
        <button>
          <router-link :to="{path:'/enterscene',query:{cj_id:0,kw_id:0}}">选蛋糕</router-link>

        </button>

      </div>
      <div class="news-right">
        <h3>积分明细</h3>
        <div class="table">
          <p class="p1">
            <span class="first">时间</span><span class="mid">明细</span>
            <span class="last">收入/支出</span>
          </p>
          <p class="p1" v-for="item in point_detailed">
            <span class="first">{{item.point_time}}</span>
            <span class="mid">{{item.point}}</span>
            <span class="last" v-if="item.type==0">支出</span>
            <span class="last" v-if="item.type==1">收入</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "yuE",
    data(){
      return{
        allpoint:"0",//总积分
        point_detailed:[]//积分明细
      }
    },
    created() {
      this.$axios.get('/api/getpoint.do').then(response=>{//获取总积分

        this.allpoint= response.data[0].allpoint.toFixed(2)
      })
      this.$axios.get('/api/getpoint_detailed.do').then(response=>{
        this.point_detailed=response.data
        console.log( this.point_detailed)

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
    width: 200px;
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
