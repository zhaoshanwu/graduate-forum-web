<template>
  <div id="user_little_container" class="user_little_container">
    <div class="head_portrait">

    </div>
    <div class="user_message">
      {{user.userName}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: undefined
  }
}
</script>

<style lang="less" scoped>
  .user_little_container {
    width: 100%;
    height: 70px;
    margin-top: 30px;
  }

  .head_portrait {
    width: 80px;
    height: 80px;
    margin: 20px auto;
    background-color: pink;
  }

  .user_message {
    text-align: center;
  }
</style>