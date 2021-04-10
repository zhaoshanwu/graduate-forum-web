<template>
  <div id="front_post_container" class="front_post_container">
    <el-container>
      <el-header>
        <navigation></navigation>
      </el-header>
      <el-main>
        <div class="main">
          <div class="post_message">
            <div class="breadcrumb">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home' }">{{parentBoardName}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home' }">{{boardName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="post_data">
                <i class="el-icon-view"></i><span>{{post.click}}</span>
                <i class="el-icon-chat-dot-square"></i><span>{{post.comment}}</span>
              </div>
          </div>
          <div class="post_content" v-if="initiateUser">
            <div class="initiate_user">
              <userlittle :user="initiateUser"></userlittle>
            </div>
            <div class="initiate_post">
              <div class="title">
                {{post.title}}
              </div>
              <div class="date">
                <div class="identiy">
                  {{identiy.postMaster}}
                </div>
                <div>发表于 {{post.publishDate}}</div>
              </div>
              <div>
                {{post.content}}
              </div>
              <div>
                赞：{{post.praise}} 踩：{{post.disagree}}
              </div>
            </div>
          </div>
          <div class="post_comment">
            <comment v-for="(comment,index) in commentList" :comment="comment" :index="index" :currentPage="pagination.currentPage"
                    :pageSize="pagination.pageSize" :tiny="false" :key="comment.commentId"></comment>
            <el-pagination
              background
              @current-change="currentChange"
              layout="prev, pager, next"
              :current-page="pagination.currentPage"
              :total="pagination.total">
            </el-pagination>
          </div>
          <div class="publish_comment">
            <div class="user">
              <userlittle :user="user"></userlittle>
            </div>
            <div class="publish_content">
              <div class="warn">
                管理员提醒：请不要在网上传播淫秽色情、六合彩赌博、诈骗、病毒攻击、买卖账号、诋毁他人名誉等违法信息。
              </div>
              <div class="input">
                <el-input
                  type="textarea"
                  :rows="16"
                  placeholder=""
                  resize="none"
                  v-model="commentContent">
                </el-input>
              </div>
              <div class="submit">
                <el-button type="primary" :plain="true" @click="submitComment()" round>回复</el-button>
              </div>
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
  import moment from 'moment'
  import navigation from '../../components/Navigation'
  import bottom from '../../components/Bottom.vue'
  import comment from '../../components/Comment'
  import userlittle from '../../components/UserLittle'

  export default {
    components: {
      navigation,
      bottom,
      comment,
      userlittle
    },
    data() {
      return {
        post: Object,
        user: Object,
        boardName: undefined,
        identiy: {
          postMaster: '楼主'
        },
        parentBoardName: undefined,
        initiateUser: Object,
        commentList: undefined,
        pagination: {
          pageSize: 2,
          total: 100,
          currentPage: 1
        },
        commentContent: ''
      }
    },
    created: function() {
      const _this = this;

      _this.post = JSON.parse(_this.$route.query.post);
      const postId = _this.post.postId;
      
      // 初始化登录用户
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

      // 增加该用户的访问记录


      // 格式化时间戳
      _this.post.publishDate = moment(_this.post.publishDate).format('YYYY-MM-DD HH:mm:ss');


      // 初始化面包屑中的父版块名和版块名
      axios.get('/parent/board/get/name/by/post/id', {
        params: {
          postId: postId
        }
      })
      .then(function (respanse) {
        _this.boardName = respanse.data.boardName;
        _this.parentBoardName = respanse.data.parentBoardName;
      })
      .catch(function (error) {
        console.log(error);
      });

      // 初始化发帖用户
      axios.get('user/get/by/id', {
        params: {
          userId: _this.post.initiateId
        }
      })
      .then(function (respanse) {
        _this.initiateUser = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      // 初始化评论页码
      axios.get('comment/get/num/post/id', {
        params: {
          postId: _this.post.postId,
          status: '正常'
        }
      })
      .then(function (respanse) {
        _this.pagination.total = respanse.data / _this.pagination.pageSize * 10;
      })
      .catch(function (error) {
        console.log(error);
      })

      // 初始化评论集合
      axios.get('comment/get/by/post/id', {
        params: {
          postId: _this.post.postId,
          status: '正常',
          start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
          count: _this.pagination.pageSize
        }
      })
      .then(function (respanse) {
        _this.commentList = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    methods: {
      currentChange(val) {
        const _this = this;

        _this.pagination.currentPage = val;
        
        axios.get('comment/get/by/post/id', {
          params: {
            postId: _this.post.postId,
            status: '正常',
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.commentList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      submitComment() {
        const _this = this;

        if (_this.textarea == "") {
          _this.$message({
            message: '内容不能为空，请输入评论内容',
            type: 'warning'
          });
        } else {
          axios.get('comment/insert/comment', {
            params: {
              postId: _this.post.postId,
              userId: _this.user.userId,
              content: _this.commentContent
            }
          })
          .then(function (respanse) {
            console.log(respanse);
            if (respanse.data == true) {
              _this.$message({
                message: '评论成功',
                type: 'success'
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/Post/Post.css';

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
  }
</style>