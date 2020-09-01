<template>
  <div id="app">
    <bg1 @closeAll="closeAll" v-show="bgShow"></bg1>
    <mynav @closeBg="closeBg" @openBg="openBg" @productOpenBg="productOpenBg" @moreOpenBg="moreOpenBg" ref="child2Container" @openMycart="openMycart"></mynav>
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>
  </div>

</template>

<script>
  import bg1 from "./components/public/bg/bg1";
  import mynav from './components/public/header/mynav'
  import Footer from "./components/public/footer/Footer";

export default {
  name: 'App',
  data(){
    return {
      bgShow:false,
      allShow:1
    }
  },
  components:{
    bg1:bg1,
    mynav,
    Footer,
  },
  methods:{
    closeAll(){
      this.bgShow=false;
      this.$refs.child2Container.closeAllBox();
    },
    // closeCart(){
    //   this.bgShow=false;
    // },
    openBg(){
      this.bgShow=true
    },
    productOpenBg(){
      this.bgShow=true
    },
    moreOpenBg(){
      this.bgShow=true
    },
    openMycart(){
      this.bgShow=true
    },
    closeBg(){
      this.bgShow=false;
    }
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  background-color: #f2f2f2;
}
body{
  position: relative;
  top: 0;
  /*width: 100%;*/
  height: 100%;
}
body,html{
  /*height: 100%;*/
  padding: 0;
  margin: 0;
}
  .bg1{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(13, 13, 13, 0.74);
    z-index: 10;
    /*display: none;*/
  }
</style>

