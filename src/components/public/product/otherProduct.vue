<template>
  <div class="productShow">
    <otherProductBox v-for="item in otherProduct"
                     :key="item.id"
                     :src="item.imgsrc"
                     :productCtitle="item.name"
                     :productEtitle="item.english_name"
                     :productPrice="item.price"
                     :productid="item.id"
                     @appAddcar="appAddcar(item.id)">
      <template v-slot:aa>
        <span id="state">{{item.state}}</span>
      </template>
    </otherProductBox>


  </div>
</template>

<script>
  import otherProductBox from "./otherProductBox";
    export default {
        name: "otherProduct",
      data(){
          return {
         /* otherProduct:[]*/
        }
      },
      props:['otherProduct'],
      components:{
        otherProductBox:otherProductBox
      },
      methods:{
        appAddcar(productId){
          console.log(productId)
          console.log("我被点击了 是在otherProduct")
          this.$emit('appAddcar',[productId]);
        }
      }
    }
</script>

<style scoped>
  .productShow{
    width: 1500px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    /*align-content: space-between;*/
    background-color: #f8f8f8;
  }
  #state{
    color: black;
    background-color: yellow;
    margin-left: 20px;
    display: inline-block;
    padding: 0 10px;

  }
</style>
