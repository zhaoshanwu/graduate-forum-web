<template>
  <div id="front_user_container" class="front_user_container">
    <el-container>
      <el-header>
        <navigation></navigation>
      </el-header>
      <el-main>
        <div class="main">
          <div class="personage">

          </div>
          <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="我的头像">

            </el-tab-pane>
            <el-tab-pane label="我的信息">
              <div class="message">
                <p>昵称：{{user.userName}}</p>
                <p>账号：{{user.userNumber}}</p>
                <p>年龄：{{message.age}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的帖子">
              <postFrame v-for="post in myPost" :post="post" :tiny="true" v-on:clickPost="clickPost($event)" :key="post.postId"></postFrame>
            </el-tab-pane>
            <el-tab-pane label="我的评论">
              <comment v-for="comment in myComment" :comment="comment" :tiny="true" :key="comment.commentId"></comment>
            </el-tab-pane>
            <el-tab-pane label="我的回复">

            </el-tab-pane>
            <el-tab-pane label="我的收藏">
              <postFrame v-for="post in myEnshrinePost" :post="post" :tiny="true" v-on:clickPost="clickPost($event)" :key="post.postId"></postFrame>
            </el-tab-pane>
            <el-tab-pane label="我的关注">
              
            </el-tab-pane>
            <el-tab-pane label="我的版块">

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
      <el-footer>
        <bottom></bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import navigation from '../../components/Navigation'
  import postFrame from '../../components/PostFrame'
  import comment from '../../components/Comment'
  import bottom from '../../components/Bottom'

  export default {
    components: {
      navigation,
      postFrame,
      comment,
      bottom
    },
    data() {
      return {
        user: Object,
        message: Object,
        tabPosition: 'left',
        myPost: Object,
        myComment: Object,
        myRevert: Object,
        myEnshrinePost: Object,
        myAttentionBoard: Object,
        myAttentionUser: Object,
        myFansUser: Object
      }
    },
    created: function() {
      const _this = this;

      // 初始化用户账户
      const userId = sessionStorage.getItem('userId');
      axios.get('user/get/by/id', {
        params: {
          userId: userId
        }
      })
      .then(function (respanse) {
        _this.user = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })

      // 初始化用户信息
      axios.get('message/get/id', {
        params: {
          userId: userId
        }
      })
      .then(function (respanse) {
        _this.message = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })

      // 初始化 我的帖子
      axios.get('post/get/by/initiate/id', {
        params: {
          userId: userId,
          status: '正常',
          start: 0,
          count: 2
        }
      })
      .then(function (respanse) {
        _this.myPost = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })

      // 初始化 我的评论
      axios.get('comment/get/by/user/id', {
        params: {
          userId: userId,
          status: '正常',
          start: 0,
          count: 2
        }
      })
      .then(function (respanse) {
        _this.myComment = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    methods: {
      clickPost(postMessage) {
        let post = JSON.stringify(postMessage);
        this.$router.push({
          name:'post',
          query: {
            'post': post
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/User/User.css';

  .el-header, .el-footer {
    padding: 0px 40px 0px 40px;
    background-color: #B3C0D1;
    color: #333;
  }

  .el-main {
    width: 100%;
    padding: 0px;
    margin: 0 auto;
    background-color: #E9EEF3;
  }

  .main {
    height: 800px;
  }
</style>