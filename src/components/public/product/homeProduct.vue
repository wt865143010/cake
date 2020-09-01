<template>
  <div class="productShow">
    <homeProductbox v-for="item in homeProduct"
                  :src="item.imgsrc"
                  :productCtitle="item.name"
                  :productEtitle="item.english_name"
                    :productPrice="item.price"
                    :productid="item.id" @appAddcar="appAddcar(item.id)"></homeProductbox>
  </div>
</template>

<script>
  import homeProductbox from "./homeProductbox";
    export default {
        name: "homeProduct",
      data(){
        return {
          homeProduct:[]
        }
      },
      props:['num1','num2'],
      components:{
        homeProductbox:homeProductbox
      },
      created() {
        this.$axios.get('/api/getHomeProduct.do?num1='+this.$props.num1+'&&num2='+this.$props.num2)
          .then(resp=>{
            // console.log(resp)
            // console.log(resp.data);
            this.homeProduct=resp.data;
            // console.log(this.homeProduct[2].imgsrc)
            // console.log(this.homeProduct[2].price)
            // console.log(this.homeProduct[2].ctitle)
            // console.log(this.homeProduct[2].etitle)
          })
      },
      methods:{
        appAddcar(productId){
            this.$emit('appAddcar',[productId])
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

  }
</style>
