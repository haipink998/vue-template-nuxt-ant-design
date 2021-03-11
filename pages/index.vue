<template>
  <a-layout-content class="container" :style="{ margin: '24px 16px 0', overflow: 'initial', minHeight: '100vh' }">
    <div class="content">
      content
      bacacasc
      ascasc
      ascasc
    </div>
  </a-layout-content>
</template>
<script>
export default {
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
};
</script>

<style>
  .container{
    min-height: 100vh;
  }

</style>
