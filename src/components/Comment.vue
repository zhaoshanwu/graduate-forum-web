<template>
  <div id="comment_container" class="comment_container">
    <div v-if="tiny" class="message">
      {{comment.content}}
    </div>
    <div v-else class="comment">
      <div class="user_message">
        <userlittle :user="initiateUser"></userlittle>
      </div>
      <div class="comment_message">
        <div class="date">
          <div>发表于 {{comment.commentDate}}</div>
          <div class="identiy right" v-if="commentIndex == 0" style="background-color: #ff4c4c">{{identiy.sofa}}</div>
          <div class="identiy right" v-else-if="commentIndex == 1" style="background-color: #fc9b33">{{identiy.stool}}</div>
          <div class="identiy right" v-else-if="commentIndex == 2" style="background-color: #6999ee">{{identiy.floor}}</div>
          <div class="identiy right" v-else>{{commentIndex}}#</div>
        </div>
        <div class="comment_content">
          {{comment.content}}
        </div>
        <div class="revert">
          <revert v-for="revert in revertList" :revert="revert" :key="revert.revertId"></revert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import userlittle from '../components/UserLittle'
  import revert from '../components/Revert'

  export default {
    components: {
      userlittle,
      revert
    },
    props: {
      comment: Object,
      tiny: undefined,
      index: undefined,
      currentPage: undefined,
      pageSize: undefined
    },
    data() {
      return {
        initiateUser: Object,
        identiy: {
          sofa: '沙发',
          stool: '板凳',
          floor: '地板',
        },
        revertList: Object
      }
    },
    computed: {
      commentIndex: function() {
        return this.pageSize * (this.currentPage - 1) + this.index;
      }
    },
    created: function() {
      const _this = this;

      // 格式化时间戳
      _this.comment.commentDate = moment(_this.comment.commentDate).format('YYYY-MM-DD HH:mm:ss');

      // 初始化评论用户
      axios.get('user/get/by/id', {
        params: {
          userId: _this.comment.userId
        }
      })
      .then(function (respanse) {
        _this.initiateUser = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })

      // 初始化回复
      axios.get('revert/get/by/comment/id', {
        params: {
          commentId: _this.comment.commentId,
          status: '正常',
          start: 0,
          count: 2
        }
      })
      .then(function (respanse) {
        _this.revertList = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    methods: {
      
    }
  }
</script>

<style lang="less" scoped>
  .comment {
    width: 100%;
    border: #edeef7 solid 1px;
    background-color: #8ac4d0;
    display: inline-block;
  }

  .message {
    width: 100%;
    height: 30px;
  }

  .user_message {
    float: left;
    width: 21%;
    height: 300px;
  }

  .comment_message {
    float: left;
    width: 72%;
    min-height: 300px;
    padding: 0px 20px 0px 20px;
    border-left: #edeef7 solid 1px;
  }

  .right {
    float: right;
  }

  .date {
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    border-bottom: #edeef7 solid 1px;
    padding: 10px 0px 10px 0px;
  }

  .identiy {
    width: 40px;
    height: 22px;
    font-size: 13px;
    line-height: 22px;
    text-align: center;
    color: #fff;
    background-color: #57baf9;
  }

  .comment_content {
    width: 100%;
    min-height: 230px;
    margin-top: 10px;
    font-size: 14px;
  }
</style>