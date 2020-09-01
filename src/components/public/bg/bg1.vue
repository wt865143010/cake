<template>
  <div class="bg1" @click="closeAll"></div>
</template>

<script>
    export default {
        name: "bg1",
      methods:{
        closeAll(){
          this.$emit('closeAll')
          // EventBus.$emit()
        }
      }
    }
</script>

<style scoped>

</style>
