<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
   <div class="loading">
      <span>Loading</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["isLoading"]
};
</script>

<style>
.loader {
  background-color: #f3efe8;
  bottom: 0;
  color: white;
  display: block;
  font-size: 32px;
  left: 0;
  overflow: hidden;
  padding-top: 10vh;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
}

.fadeout {
  animation: fadeout 2s forwards;
}

.loading {
  font-family: "Arial Black", "Arial Bold", Gadget, sans-serif;
  text-transform:uppercase;
  
  width:150px;
  text-align:center;
  line-height:50px;
  
  position:absolute;
  left:0;right:0;top:50%;
  margin:auto;
  transform:translateY(-50%);
}

.loading span {
  position:relative;
  z-index:999;
  color:#fff;
  font-size: 20px;
}
.loading:before {
  content:'';
  background:#61bdb6;
  width:128px;
  height:36px;
  display:block;
  position:absolute;
  top:0;left:0;right:0;bottom:0;
  margin:auto;
  
  animation:2s loadingBefore infinite ease-in-out;
}

@keyframes loadingBefore {
  0%   {transform:translateX(-14px);}
  50%  {transform:translateX(14px);}
  100% {transform:translateX(-14px);}
}


.loading:after {
  content:'';
  background:#ff3600;
  width:14px;
  height:60px;
  display:block;
  position:absolute;
  top:0;left:0;right:0;bottom:0;
  margin:auto;
  opacity:.5;
  
  animation:2s loadingAfter infinite ease-in-out;
}

@keyframes loadingAfter {
  0%   {transform:translateX(-50px);}
  50%  {transform:translateX(50px);}
  100% {transform:translateX(-50px);}
}
@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>