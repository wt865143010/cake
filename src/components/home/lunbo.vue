<template>
      <div>
  <div class="swiper-container">
    <swiper ref="mySwiper" :options="swiperOptions" :auto-update="true"
            :auto-destroy="true"
            :delete-instance-on-destroy="true"
            :cleanup-styles-on-destroy="true"
            @click-slide="handleClickSlide">
      <div v-for="item in lunboarr">
        <swiper-slide><div class="swiper-wrapper">
          <img :src="'/api/images/swiper/'+item" alt="">
        </div></swiper-slide>
      </div>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</div>
</template>

<script>
  // import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  // import 'swiper/css/swiper.css'
  // import 'swiper/css/swiper.css'

  export default {
    name:'mylaber',
    data () {
      return {
        swiperOptions: {
          autoplay: true,
          loop:true,
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            autoplay:true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

        },
        lunboarr:['lunBo1.jpg','lunBo3.png','lunBo2.jpg']
      }

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)

    },
    components: {
      Swiper,
      SwiperSlide
    },
    methods:{
      handleSwiperReadied(swiper){
        console.log(swiper)
      }
    }

  }

</script>

<style scoped>
  #lunbo{
    width: 100%;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-container img{
    width: 100%;
  }
</style>
