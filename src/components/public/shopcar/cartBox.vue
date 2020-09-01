<template>
  <addmycar @closeCart="closeCart"
            :productctitle="myProduct.ctitle"
            :productetitle="myProduct.etitle"
            :productprice="myProduct.price"
            :productsrc="myProduct.imgsrc"></addmycar>
</template>

<script>
  import addmycar from "./addmycar";
    export default {
        name: "cartBox",
      data(){
         return {
           myProduct:[]
         }
      },
      components:{
        addmycar:addmycar
      },
      props:['productid'],
      methods:{
        closeCart(){
          this.$emit('closeCart')
        }
      },
      created() {
          // this.$axios.get('getCartProduct.do')
        console.log(this.$props)
      }
    }
</script>

<style scoped>

</style>
