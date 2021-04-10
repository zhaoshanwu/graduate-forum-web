<template>
  <div id="revert_container" class="revert_container">
    {{revert.content}}
  </div>
</template>

<script>
export default {
  props: {
    revert: Object
  }
}
</script>

<style lang="less" scoped>
  .revert_container {
    width: 100%;
    height: 40px;
  }
</style>