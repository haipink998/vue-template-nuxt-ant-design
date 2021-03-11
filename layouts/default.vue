<template>
  <div>
    <isLoading  :isLoading="isLoading"/>
  <a-layout v-if="!isLoading" class="container" id="components-layout-demo-responsive">
    <Menu />
    <a-layout>
      <Header />
      <Nuxt />
    </a-layout>
  </a-layout>
  </div>
</template>

<script>
import isLoading from '../components/isloading.vue';
// $(window).on("load",function(){
//      $(".loader-wrapper").fadeOut("slow");
// });
export default {
  components: { isLoading },
  data() {
    return {isLoading: true}
  },
  mounted() {
    setTimeout(() => {this.isLoading = false}, 500)
  }
  
  
};
</script>

<style>
.container {
  min-height: 100%;
}
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
