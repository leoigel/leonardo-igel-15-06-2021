<template>
  <div :class="colorBackground?'green app':'purple app'">
    <ErrorMessage />
    <Header @toggled="colorBackground = $event"/>
   <router-view />
  </div>
</template>

<script>


import ErrorMessage from "@/components/ErrorMessage.vue";
export default {
  name: 'App',
  components: {
    ErrorMessage
  },
  data() {
    return {
      colorBackground:false,
      error:false,
    }
  },
  watch: {
    // error() {
    //   console.log(this.error)
    //   if(this.error) {
    //     this.$router.go(0);
    //     // window.location.reload();
    //   }
    // }
  }
}
</script>

<style>
.app {
  min-height:100vh;
}
.green {
  background:#EBFAEB;
}
.purple {
  background:#E8D5E8;
}

</style>
