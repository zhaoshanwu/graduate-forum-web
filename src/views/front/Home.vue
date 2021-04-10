<template>
  <div id="front_home_container" class="front_home_container">
    <el-container>
      <el-header>
        <navigation></navigation>
      </el-header>
        <el-main>
          <div class="main">
            <div class="forum_message">
              <img src="../../assets/image/logo.png" alt="logo" class="logo">
              <div>诗词论坛</div>
              <span>在这里有</span><span>{{userNum}}</span><span>位志同道合的小伙伴</span>
              <p>{{forumDescribe}}</p>
              <span>今日：{{todayNum}}</span>
              <span>昨日：{{yesterdayNum}}</span>
              <span>全部：{{postNum}}</span>
            </div>
            <div class="board">
              <board v-for="parentBoard in parentBoardList" :parentBoard="parentBoard" :key="parentBoard.parentBoardId"></board>
            </div>
            <div class="content">
              <div class="post">
                <el-tabs type="border-card">
                  <el-tab-pane label="首页 ">
                    <div class="top">
                      <postFrame v-for="post in postTopList" :post="post" :tiny="true" v-on:clickPost="clickPost($event)" :key="post.postId"></postFrame>
                    </div>
                    <div class="post_list">
                      <postFrame v-for="post in postNormalList" :post="post" :tiny="false" v-on:clickPost="clickPost($event)" :key="post.postId"></postFrame>
                      <el-pagination
                        background
                        @current-change="normalCurrentChange"
                        layout="prev, pager, next"
                        :current-page="normalPagination.currentPage"
                        :total="normalPagination.total">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="精华区">
                    <postFrame v-for="post in postEliteList" :post="post" :tiny="false" v-on:clickPost="clickPost($event)" :key="post.postId"></postFrame>
                      <el-pagination
                        background
                        @current-change="eliteCurrentChange"
                        layout="prev, pager, next"
                        :current-page="elitePagination.currentPage"
                        :total="elitePagination.total">
                      </el-pagination>
                  </el-tab-pane>
                  <el-tab-pane label="成员一览">

                  </el-tab-pane>
                </el-tabs>
              </div>
              <div class="recommend">
                <router-link :to="{name: 'front_issuePost'}">发帖</router-link>
              </div>
            </div>
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
import front_issuePost from '../front/IssuePost'
import navigation from '../../components/Navigation'
import board from '../../components/Board'
import postFrame from '../../components/PostFrame'
import bottom from '../../components/Bottom'

export default {
  components: {
    front_issuePost,
    navigation,
    board,
    postFrame,
    bottom
  },
  data() {
      return {
        forumDescribe: '欢迎来到诗词论坛，这里是诗词的海洋，在这里可以',
        todayNum: 0,
        yesterdayNum: 0,
        postNum: 0,
        userNum: 0,
        normalPagination: {
          pageSize: 2,
          total: 100,
          currentPage: 1
        },
        elitePagination: {
          pageSize: 2,
          total: 100,
          currentPage: 1
        },
        parentBoardList: null,
        postNormalList: null,
        postTopList: null,
        postEliteList: null
      }
  },
  created: function() {

    const _this = this;

    // 初始化论坛发帖信息
    axios.get('post/get/num').then(function (respanse) {
      _this.todayNum = respanse.data.todayNum;
      _this.yesterdayNum = respanse.data.yesterdayNum;
      _this.postNum = respanse.data.postNum;
      _this.userNum = respanse.data.userNum;
    })
    .catch(function (error) {
      console.log(error);
    });

    // 初始化父版块
    axios.get('parent/board/get/all')
    .then(function (respanse) {
      _this.parentBoardList = respanse.data;
    })
    .catch(function (error) {
      console.log(error);
    })

    // 初始化置顶帖
    axios.get('post/get/all/label', {
      params: {
        label: '置顶',
        status: '正常',
        start: 0,
        count: 10
      }
    })
    .then(function (respanse) {
      _this.postTopList = respanse.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    // 初始化正常帖页码
    axios.get('post/get/count', {
      params: {
        status: '正常',
        label: '置顶',
        labelYN: false
      }
    })
    .then(function (respanse) {
      _this.normalPagination.total = respanse.data / _this.normalPagination.pageSize * 10;
    })
    .catch(function (error) {
      console.log(error);
    });

    // 初始化正常帖
    axios.get('post/get/all', {
      params: {
        status: '正常',
        start: (_this.normalPagination.currentPage - 1) * _this.normalPagination.pageSize,
        count: _this.normalPagination.pageSize
      }
    })
    .then(function (respanse) {
      _this.postNormalList = respanse.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    // 初始化精华帖页码
    axios.get('post/get/count', {
      params: {
        status: '正常',
        label: '精华',
        labelYN: true
      }
    })
    .then(function (respanse) {
      _this.elitePagination.total = respanse.data / _this.elitePagination.pageSize * 10;
    })
    .catch(function (error) {
      console.log(error);
    });

    // 初始化精华区帖子
    axios.get('post/get/all/label', {
      params: {
        label: '精华',
        status: '正常',
        start: (_this.elitePagination.currentPage - 1) * _this.elitePagination.pageSize,
        count: _this.elitePagination.pageSize
      }
    })
    .then(function (respanse) {
      _this.postEliteList = respanse.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    normalCurrentChange(val) {
      const _this = this;

      _this.normalPagination.currentPage = val;
      
      axios.get('post/get/all', {
        params: {
          status: '正常',
          start: (_this.normalPagination.currentPage - 1) * _this.normalPagination.pageSize,
          count: _this.normalPagination.pageSize
        }
      })
      .then(function (respanse) {
        _this.postNormalList = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    eliteCurrentChange(val) {
      const _this = this;
      _this.elitePagination.currentPage = val;
      
      axios.get('post/get/all', {
        params: {
          status: '正常',
          start: (_this.elitePagination.currentPage - 1) * _this.elitePagination.pageSize,
          count: _this.elitePagination.pageSize
        }
      })
      .then(function (respanse) {
        _this.postEliteList = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
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
  @import '../../assets/css/Home/Home.css';

  .el-header, .el-footer {
    padding: 0px 40px 0px 40px;
    background-color: #B3C0D1;
    color: #333;
  }

  .el-main {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    background-color: #E9EEF3;
    color: #333;
  }
</style>