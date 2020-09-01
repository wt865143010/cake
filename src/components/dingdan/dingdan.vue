<template>
    <div>
      <myaddress ref="myaddress" @getmsg="getmsg"></myaddress>
      <productD :mymsg="this.mymsg" @getAddress="getAddress"></productD>
    </div>
</template>

<script>
  import myaddress from '../payment/myaddress'
  import productD from '../payment/productD'

    export default {
        name: "dingdan",
      data(){
        return{
          mymsg:[]
        }
      },

      components:{
        myaddress:myaddress,
        productD:productD,
      },
      methods:{
          getmsg(msg){
            this.mymsg[0]=msg[0][0].a_name
            this.mymsg[1]=msg[0][0].tel
            this.mymsg[2]=msg[0][0].address
            this.mymsg[3]=msg[1]
            this.mymsg[4]=msg[2]
            // this.mymsg=msg;
            console.log(this.mymsg)
          } ,
        getAddress(){
          this.$refs.myaddress.getAddress()
        }
      }
    }
</script>

<style scoped>

</style>
