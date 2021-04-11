<template>
  <div id="front_issuepost_container" class="front_issuepost_container">
    <el-container>
      <el-header>
        <navigation></navigation> 
      </el-header>
      <el-main>
        <div class="main">
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>发表新帖</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="bd">
            <div class="bt">
              <div class="board">
                <el-select v-model="value" placeholder="请选择子版块">
                  <el-option
                    v-for="board in boards"
                    :key="board.label"
                    :label="board.value"
                    :value="board.label">
                  </el-option>
                </el-select>
              </div>
              <div class="post_title">
                <el-input v-model="title" placeholder="请输入帖子标题，限30字以内"></el-input>
              </div>
            </div>
            <div class="post_content">
              <el-input
                  type="textarea"
                  :rows="23"
                  placeholder="请输入内容"
                  resize="none"
                  v-model="postContent">
                </el-input>
            </div>
            <div class="submit">
              <el-button type="primary" :plain="true" @click="submitAddPost()" round>发布</el-button>
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
import navigation from '../../components/Navigation'
import bottom from '../../components/Bottom'

export default {
  components: {
    navigation,
    bottom
  },
  data() {
    return {
      boards: [],
      userId: '',
      value: '',
      title: '',
      postContent: ''
    }
  },
  created: function() {
    const _this = this;

    _this.userId = sessionStorage.getItem('userId');

    axios.get('board/get/board/id/name')
    .then(function (respanse) {
      let boards = [];
      
      for (let board in respanse.data) {
        boards.push(
          {
            value: respanse.data[board],
            label: board
          }
        )
      }

      console.log(boards);
      _this.boards = boards;
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  methods: {
    submitAddPost() {
      const _this = this;

      axios.get('post/post/post', {
        params: {
          title: _this.title,
          boardId: _this.value,
          InitiateId: _this.userId,
          content: _this.postContent
        }
      })
      .then(function (respanse) {
        console.log(respanse);
        if (respanse.data == true) {
          _this.$message({
            message: '申请成功，请等待审核',
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
</script>

<style lang="less" scoped>
  @import '../../assets/css/front/IssuePost.css';

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>