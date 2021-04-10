<template>
  <div id="admin_login_container" class="admin_login_container">
    <div class="num_message">
      <div>
        <span>总帖数</span>
        <span>{{num.postNum}}</span>
      </div>
      <div>
        <span>总用户数</span>
        <span>{{num.userNum}}</span>
      </div>
      <div>
        <span>总访问量</span>
        <span>{{num.visitNum}}</span>
      </div>
      <div>
        <span>版块数</span>
        <span>{{num.boardNum}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      num: {
        postNum: 100,
        userNum: 25,
        visitNum: 1903,
        boardNum: 14
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .admin_login_container {
    width: 100%;
    height: 100%;
    background-color: #edeef7;
  }

  .num_message {
    width: 100%;
    height: 200px;
    margin-top:18px;
  }

  .num_message div{
    float: left;
    width: 17%;
    height: 140px;
    margin: 10px 2% 10px 2%;
    padding: 20px 2% 20px 2%;
    background-color: #fff;
  }

  .num_message div :nth-child(1) {
    display: inline-block;
    font-size: 16px;
    color: #cdd0cb;
  }

  .num_message div :nth-child(2) {
    display: block;
    margin-top: 7px;
    font-size: 30px;
  }
</style>