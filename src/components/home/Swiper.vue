<template>
  <div class="swipperBox">
    <el-carousel :interval="5000" arrow="always" :height="banH+'px'">
      <el-carousel-item v-for="img in banImgList" :key="img.id">
        <router-link to="#">
          <img :src="'/api/images/swiper/'+img.image" alt="" class="picImg">
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    name: "Swiper",
    data() {
      return {
        banH: 300,
        banImgList: [
          {id: 0, image: 'lunBo1.jpg'},
          {id: 1, image: 'lunBo2.png'},
          {id: 2, image: 'lunBo3.png'},
          {id: 3, image: 'lunBo4.jpg'}
        ],
      }
    },
    methods: {
      setbanH() {
        this.banH = 768
      }
    },
    mounted() {
      this.setbanH();
      window.addEventListener('resize', () => {
        this.setbanH()
      }, false)
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .swipperBox {
    width: 1920px;
    margin: 0 auto;
    text-align: center;
  }

  .images {
    /*width: 100%;*/
    height: inherit;
  }


</style>
