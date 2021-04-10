<template>
  <div id="nav_container" class="nav_container">
    <el-row>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="grid-content bg-purple">
          <img src="../assets/image/logo.png" alt="" class="logo">
        </div>
      </el-col>
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
        <div class="grid-content bg-purple-light ">
          <ul>
            <li><router-link :to="{path:'/front_issuePost'}">首页</router-link></li>
            <li><a href="">版块一览</a></li>
            <li><a href="">用户一览</a></li>
            <li><a href="">关于我们</a></li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="9" :sm="9" :md="9" :lg="11" :xl="9">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="4" v-if="user">
        <div class="grid-content bg-purple-light">
          <div >

          </div>
          <i class="el-icon-user"></i>
          <span class="user_name"><router-link :to="{path:'/front_user'}">{{user.userName}}</router-link></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        user: undefined
      }
    },
    created: function() {
      const _this = this;
      const userId = window.sessionStorage.getItem('userId');

      axios.get('user/get/by/id', {
        params: {
          'userId': userId
        }
      })
      .then(function (respanse) {
        _this.user = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
</script>

<style lang="less" scoped>
  .nav_container {
    line-height: 60px;
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    min-height: 50px;
  }

  .logo {
    width: 60px;
    height: 60px;
    margin: 0px;
  }

  .nav_container ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: center;
    line-height: 50px;
  }

  .nav_container ul li {
    width: 25%;
    float: left;
  }

  /* 个人中心 */
  .user_name {
    line-height: 50px;
    color: #93329e;
  }
</style>