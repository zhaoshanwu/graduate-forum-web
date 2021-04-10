<template>
  <div id="board_container" class="board_container">
    <div class="parent_board">
      <span>{{parentBoard.parentBoardName}}</span>
    </div>
    <div class="board">
      <ul>
        <li v-for="board in boardList" :key="board.boardId">
          <div></div>
          <p>{{board.boardName}}</p>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    parentBoard: Object,
  },
  data() {
    return {
      boardList: null
    }
  },
  created: function() {

    const _this = this;

    // 获取该父版块下的所有子版块
    axios.get('board/get/parent/board/id', {
      params: {
        parentBoardId: _this.parentBoard.parentBoardId
      }
    })
    .then(function (respanse) {
      _this.boardList = respanse.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style lang="less" scoped>
  .board_container {
    width: 100%;
    height: 100px;
  }

  .parent_board {
    padding: 10px 0px 10px 10px;
    font-size: 16px;
    font-weight: 700;
  }

  .board ul {
    float: left;
    width: 100%;
    height: 100%;
  }

  .board ul li {
    float: left;
    width: 90px;
    height: 70px;
    font-size: 14px;
  }
</style>